class BooksController < ApplicationController
  # GET /books
  def index
    books = Book.all.order(:id) # щоб був стабільний порядок
    render json: books
  end

  # GET /books/:id
  def show
    book = Book.find(params[:id])
    render json: book
  end
end