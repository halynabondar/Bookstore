class Api::UsersController < ApplicationController
  def profile
    render json: { id: @current_user.id, email: @current_user.email }
  end
end