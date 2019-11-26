class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

    def create
        pokemon = Pokemon.create(pokemon_params)
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
