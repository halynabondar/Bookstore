class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]

  def create
    Rails.logger.info "LOGIN PARAMS: #{params.inspect}"

    email = params[:email] || params.dig(:user, :email)
    password = params[:password] || params.dig(:user, :password)

    user = User.find_by(email: email)

    if user && user.valid_password?(password)
      payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
      token = JWT.encode(payload, Rails.application.credentials.secret_key_base)

      render json: { access_token: token, user: { id: user.id, email: user.email } }, status: :ok
    else
      Rails.logger.info "LOGIN FAILED for email=#{email.inspect}"
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end
end