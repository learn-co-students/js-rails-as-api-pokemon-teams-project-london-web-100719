class PokemonsController < ApplicationController
    def index 
        pokemons = Pokemon.all 
        render json: pokemons
    end 

    # def new 
    #     pokemon = Pokemon.new 
    # end 

    def create 
        pokemon = Pokemon.create(pokemon_params)
    end 

    private 

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end 

end
