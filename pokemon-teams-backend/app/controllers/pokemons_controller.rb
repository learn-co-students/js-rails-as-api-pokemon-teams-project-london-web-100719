
class PokemonsController < ApplicationController
    require 'faker'

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: pokemon_params[:trainer_id])
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end
