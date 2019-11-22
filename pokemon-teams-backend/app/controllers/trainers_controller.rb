class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        # options = {
        #     include: [:pokemons]
        # }
        # render json: TrainerSerializer.new(trainers, options)
        render json: trainers, :include => {
            :pokemons => {:except => [:created_at, :updated_at]}
        }, :except => [:created_at, :updated_at]
    end

end
