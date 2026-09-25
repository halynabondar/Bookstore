class RenameIconToCoverImageInBooks < ActiveRecord::Migration[8.0]
  def change
    rename_column :books, :icon, :cover_image
  end
end
