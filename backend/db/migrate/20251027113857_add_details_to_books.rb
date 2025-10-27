class AddDetailsToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :genre, :string
    add_column :books, :icon, :string
    add_column :books, :average_review_score, :float
    add_column :books, :number_of_review, :integer
  end
end
