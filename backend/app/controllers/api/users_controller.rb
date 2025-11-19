class Api::UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]

  def profile
    if @current_user
      render json: {
        user: {
          id: @current_user.id,
          email: @current_user.email,
          first_name: @current_user.first_name,
          last_name: @current_user.last_name
        }
      }
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def create
    user = User.new(user_params)

    if user.save
      payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
      token = JWT.encode(payload, Rails.application.credentials.secret_key_base)

      cookies.signed[:access_token] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: Rails.env.production? ? :none : :lax
      }

      render json: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        }
      }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    users = User.select(:id, :email, :first_name, :last_name, :created_at, :updated_at)
    render json: users
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end