class AddFilterFieldsToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :book_format, :string
    add_column :books, :publisher, :string
    add_column :books, :publication_year, :integer
  end
end
