class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons, include: [:trainer]
  end

  def create
    trainer_id = params[:trainer_id] # or :trainer_id?
    @trainer = Trainer.find(trainer_id)
    if @trainer.pokemons.size < 6
      new_pokemon = catch_pokemon
    else
      flash[:errors] = "Trainer already has 6 or more pokemon"
    end
    render json: new_pokemon
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end

  private

  def catch_pokemon
    nickname = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: nickname, species: species, trainer_id: @trainer.id)
  end
end
