require "rails_helper"

RSpec.describe OrderItem, type: :model do
  describe "associations" do
    it "belongs to an order" do
      association = described_class.reflect_on_association(:order)

      expect(association.macro).to eq(:belongs_to)
    end

    it "belongs to a book" do
      association = described_class.reflect_on_association(:book)

      expect(association.macro).to eq(:belongs_to)
    end
  end

  describe "validations" do
    let(:order_item) { described_class.new }

    it "requires quantity" do
      order_item.valid?

      expect(order_item.errors[:quantity]).to be_present
    end

    it "does not allow zero quantity" do
      order_item.quantity = 0
      order_item.valid?

      expect(order_item.errors[:quantity]).to be_present
    end

    it "does not allow a negative quantity" do
      order_item.quantity = -1
      order_item.valid?

      expect(order_item.errors[:quantity]).to be_present
    end

    it "does not allow a non-integer quantity" do
      order_item.quantity = 1.5
      order_item.valid?

      expect(order_item.errors[:quantity]).to be_present
    end

    it "requires price" do
      order_item.valid?

      expect(order_item.errors[:price]).to be_present
    end

    it "does not allow a negative price" do
      order_item.price = -1
      order_item.valid?

      expect(order_item.errors[:price]).to be_present
    end
  end
end
