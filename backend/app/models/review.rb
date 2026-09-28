class Review < ApplicationRecord
  belongs_to :book

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :author_name, presence: true
  validates :comment, presence: true
end
