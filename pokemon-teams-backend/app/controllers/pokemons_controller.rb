class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        # options = {
        #     include: [:trainer]
        # }
        # render json: PokemonSerializer.new(pokemons, options)
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def create
        nickname = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: nickname, species: species, trainer_id: params["pokemon"]["trainer_id"])
        render json: pokemon, except: [:created_at, :updated_at]
    end

    def destroy
        pokemon = Pokemon.find(params["id"])
        pokemon.destroy
    end

end
