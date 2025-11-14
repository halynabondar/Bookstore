class BooksController < ApplicationController
  skip_before_action :authenticate_request, only: %i[index show check]

  # GET /books
  def index
    books = Book.all.order(:id)
    render json: books
  end

  def check
    count = Book.count
    render json: { books_in_db: count }
  end

  # GET /books/:id
  def show
    book = Book.find(params[:id])
    render json: book
  end
end