class ReviewsController < ApplicationController
  skip_before_action :authenticate_request, only: :create

  def create
    book = Book.find(params[:book_id])
    review = book.reviews.build(review_params)

    if review.save
      render json: review, status: :created
    else
      render json: { errors: review.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :author_name, :comment)
  end
end