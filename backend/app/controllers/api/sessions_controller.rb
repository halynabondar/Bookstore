class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]

  def create
    Rails.logger.info "LOGIN PARAMS: #{params.inspect}"

    user = User.find_by(email: params[:email])

    if user.valid_password?(params[:password])
      payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
      token = JWT.encode(payload, Rails.application.credentials.secret_key_base)

      cookies.signed[:access_token] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: Rails.env.production? ? :none : :lax
      }

      render json: { user: {id: user.id, email: user.email } }, status: :ok
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
end