class AddShippingDetailsToOrders < ActiveRecord::Migration[8.1]
  def change
    add_column :orders, :first_name, :string, null: false
    add_column :orders, :last_name, :string, null: false
    add_column :orders, :email, :string, null: false
    add_column :orders, :address, :string, null: false
    add_column :orders, :city, :string, null: false
    add_column :orders, :postal_code, :string, null: false
    add_column :orders, :country, :string, null: false
  end
end
