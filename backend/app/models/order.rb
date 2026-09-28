class Order < ApplicationRecord
  belongs_to :user

  has_many :order_items, dependent: :destroy
  has_many :books, through: :order_items

  validates :total_price,
            presence: true,
            numericality: { greater_than_or_equal_to: 0 }

  validates :status, presence: true

  validates :first_name,
            :last_name,
            :email,
            :address,
            :city,
            :postal_code,
            :country,
            presence: true
end