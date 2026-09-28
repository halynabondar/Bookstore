class CreateReviews < ActiveRecord::Migration[8.1]
  def change
    create_table :reviews do |t|
      t.references :book, null: false, foreign_key: true
      t.integer :rating, null: false
      t.string :author_name, null: false
      t.text :comment, null: false

      t.timestamps
    end
  end
end
