class CreatePokemons < ActiveRecord::Migration[6.0]
  def change
    create_table :pokemons do |t|
      t.string :nickname
      t.string :species
      t.integer :trainer_id
    end
  end
end
