class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_request, only: [ :create, :google_login ]

  def create
    Rails.logger.info "LOGIN PARAMS: #{params.inspect}"

    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
      token = JWT.encode(payload, Rails.application.credentials.secret_key_base)

      cookies.signed[:access_token] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: Rails.env.production? ? :none : :lax
      }

      render json: { user: { id: user.id, email: user.email } }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    cookies.delete(
    :access_token,
    secure: Rails.env.production?,
    same_site: Rails.env.production? ? :none : :lax
    )
    head :no_content
  end

  def google_login
    id_token = params[:credential]

    return render json: { error: "No credential provided" }, status: :bad_request if id_token.blank?

    payload = GoogleAuthService.verify(id_token)

    unless payload
      return render json: { error: "Invalid Google ID token" }, status: :unauthorized
    end

    user = User.find_or_initialize_by(email: payload[:email])

    if user.new_record?
      user.first_name = payload[:first_name]
      user.last_name  = payload[:last_name]

      random_password = SecureRandom.hex(16)
      user.password = random_password
      user.password_confirmation = random_password
    end

    return render json: { error: user.errors.full_messages }, status: :unprocessable_entity unless user.save

    token = JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i }, Rails.application.credentials.secret_key_base)

    cookies.signed[:access_token] = {
      value: token,
      httponly: true,
      secure: Rails.env.production?,
      same_site: Rails.env.production? ? :none : :lax
    }

    render json: { user: user_json(user) }, status: :ok
  end

  private
  def user_json(user)
    {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    }
  end
end
