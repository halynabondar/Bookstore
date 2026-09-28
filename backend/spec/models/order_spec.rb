require "rails_helper"

RSpec.describe Order, type: :model do
  describe "associations" do
    it "belongs to a user" do
      association = described_class.reflect_on_association(:user)

      expect(association.macro).to eq(:belongs_to)
    end

    it "has many order items with dependent destroy" do
      association = described_class.reflect_on_association(:order_items)

      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end

    it "has many books through order items" do
      association = described_class.reflect_on_association(:books)

      expect(association.macro).to eq(:has_many)
      expect(association.options[:through]).to eq(:order_items)
    end
  end

  describe "validations" do
    let(:order) { described_class.new }

    it "requires total price" do
      order.valid?

      expect(order.errors[:total_price]).to be_present
    end

    it "does not allow a negative total price" do
      order.total_price = -1
      order.valid?

      expect(order.errors[:total_price]).to be_present
    end

    it "requires status" do
      order.status = nil
      order.valid?

      expect(order.errors[:status]).to be_present
    end

    it "requires shipping information" do
      order.valid?

      expect(order.errors[:first_name]).to be_present
      expect(order.errors[:last_name]).to be_present
      expect(order.errors[:email]).to be_present
      expect(order.errors[:address]).to be_present
      expect(order.errors[:city]).to be_present
      expect(order.errors[:postal_code]).to be_present
      expect(order.errors[:country]).to be_present
    end
  end
end
