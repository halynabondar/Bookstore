class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_request

  private

  def authenticate_request
    token = cookies.signed[:access_token]

    if token.blank?
      return render json: { error: "Unauthorized" }, status: :unauthorized
    end

    begin
      decoded = JWT.decode(token, Rails.application.credentials.secret_key_base).first
      @current_user = User.find(decoded["user_id"])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      return render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
