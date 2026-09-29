require "rails_helper"

RSpec.describe "Orders", type: :request do
  describe "GET /orders" do
    context "when user is not authenticated" do
      it "returns unauthorized" do
        get "/orders"

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when user is authenticated" do
      let!(:user) do
        User.create!(
          email: "test@example.com",
          password: "password123"
        )
      end

      let!(:order) do
        user.orders.create!(
          total_price: 150,
          status: "pending",
          first_name: "Test",
          last_name: "User",
          email: "test@example.com",
          address: "Test Street 1",
          city: "Copenhagen",
          postal_code: "1000",
          country: "Denmark"
        )
      end

      before do
        allow_any_instance_of(ApplicationController)
          .to receive(:authenticate_request) do |controller|
          controller.instance_variable_set(:@current_user, user)
        end
      end

      it "returns user's orders" do
        get "/orders"

        expect(response).to have_http_status(:ok)

        body = JSON.parse(response.body)

        expect(body.length).to eq(1)
        expect(body.first["id"]).to eq(order.id)
        expect(body.first["status"]).to eq("pending")
      end

      it "returns only the current user's orders" do
        other_user = User.create!(
          email: "other@example.com",
          password: "password123"
        )

        other_user.orders.create!(
          total_price: 200,
          status: "pending",
          first_name: "Other",
          last_name: "User",
          email: "other@example.com",
          address: "Other Street 1",
          city: "Copenhagen",
          postal_code: "2000",
          country: "Denmark"
        )

        get "/orders"

        body = JSON.parse(response.body)

        expect(response).to have_http_status(:ok)
        expect(body.length).to eq(1)
        expect(body.first["id"]).to eq(order.id)
      end
    end
  end
  describe "POST /orders" do
    let!(:user) do
      User.create!(
        email: "buyer@example.com",
        password: "password123"
      )
    end

    it "does not create an order when quantity is zero" do
      expect do
        post "/orders", params: {
          shipping: {
            first_name: "Test",
            last_name: "Buyer",
            email: "buyer@example.com",
            address: "Test Street 1",
            city: "Copenhagen",
            postal_code: "1000",
            country: "Denmark"
          },
          items: [
            {
              book_id: book.id,
              quantity: 0
            }
          ]
        }
      end.not_to change(Order, :count)

      expect(response).to have_http_status(:unprocessable_entity)

      body = JSON.parse(response.body)

      expect(body["error"]).to eq("Quantity must be greater than 0")
    end

    it "does not create an order when book does not exist" do
      expect do
        post "/orders", params: {
          shipping: {
            first_name: "Test",
            last_name: "Buyer",
            email: "buyer@example.com",
            address: "Test Street 1",
            city: "Copenhagen",
            postal_code: "1000",
            country: "Denmark"
          },
          items: [
            {
              book_id: 999_999,
              quantity: 1
            }
          ]
        }
      end.not_to change(Order, :count)

      expect(response).to have_http_status(:unprocessable_entity)

      body = JSON.parse(response.body)

      expect(body["error"]).to be_present
    end

    let!(:book) do
      Book.create!(
        title: "Test Book",
        author: "Test Author",
        price: 100
      )
    end

    before do
      allow_any_instance_of(ApplicationController)
        .to receive(:authenticate_request) do |controller|
        controller.instance_variable_set(:@current_user, user)
      end
    end

    it "creates an order with order items and calculates the total price" do
      expect do
        post "/orders", params: {
          shipping: {
            first_name: "Test",
            last_name: "Buyer",
            email: "buyer@example.com",
            address: "Test Street 1",
            city: "Copenhagen",
            postal_code: "1000",
            country: "Denmark"
          },
          items: [
            {
              book_id: book.id,
              quantity: 2
            }
          ]
        }
      end.to change(Order, :count).by(1)
                                  .and change(OrderItem, :count).by(1)

      expect(response).to have_http_status(:created)

      order = Order.last
      order_item = order.order_items.first

      expect(order.user).to eq(user)
      expect(order.total_price).to eq(200)
      expect(order.status).to eq("pending")

      expect(order_item.book).to eq(book)
      expect(order_item.quantity).to eq(2)
      expect(order_item.price).to eq(100)
    end
  end
end
