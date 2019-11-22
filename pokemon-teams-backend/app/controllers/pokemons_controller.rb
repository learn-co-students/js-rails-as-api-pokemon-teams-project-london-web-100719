class PokemonsController < ApplicationController
    def create
        new_pokemon = Pokemon.new
        new_pokemon.nickname = Faker::Name.first_name
        new_pokemon.species = Faker::Games::Pokemon.name
        new_pokemon.trainer_id = params[:id]
        new_pokemon.save
        render json: new_pokemon
    end

    def destroy 
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
    end
end
