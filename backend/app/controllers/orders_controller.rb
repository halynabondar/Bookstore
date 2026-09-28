class OrdersController < ApplicationController
  def index
    orders = @current_user.orders
                          .includes(order_items: :book)
                          .order(created_at: :desc)
  
    render json: orders.as_json(
      include: {
        order_items: {
          include: {
            book: {
              only: %i[id title author cover_image]
            }
          }
        }
      }
    )
  end

  def create
    items = params.require(:items)

    order = nil

    ActiveRecord::Base.transaction do
      order = @current_user.orders.create!(
        shipping_params.merge(
          total_price: 0,
          status: "pending"
        )
      )

      total_price = 0

      items.each do |item|
        book = Book.find(item[:book_id])
        quantity = item[:quantity].to_i

        raise ArgumentError, "Quantity must be greater than 0" if quantity <= 0

        order.order_items.create!(
          book: book,
          quantity: quantity,
          price: book.price
        )

        total_price += book.price * quantity
      end

      order.update!(total_price: total_price)
    end

    render json: order.as_json(
      include: {
        order_items: {
          include: {
            book: {
              only: %i[id title author cover_image]
            }
          }
        }
      }
    ), status: :created
  rescue ActionController::ParameterMissing,
    ActiveRecord::RecordInvalid,
    ActiveRecord::RecordNotFound,
    ArgumentError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def shipping_params
    params.require(:shipping).permit(
      :first_name,
      :last_name,
      :email,
      :address,
      :city,
      :postal_code,
      :country
    )
  end
end
