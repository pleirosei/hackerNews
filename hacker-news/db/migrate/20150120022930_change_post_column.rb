class ChangePostColumn < ActiveRecord::Migration
  def change
  	change_column_default :posts, :upvotes, 0
  end
end
