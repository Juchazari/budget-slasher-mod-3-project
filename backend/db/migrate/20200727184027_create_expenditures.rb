class CreateExpenditures < ActiveRecord::Migration[6.0]
  def change
    create_table :expenditures do |t|
      t.string :name
      t.float :price
      t.date :deadline
      t.references :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
