class TrainerSerializer

    def initialize(trainerObject)
        @trainers = trainerObject
    end 

    def to_serialized_json
        @trainers.to_json(
            :include => {
                :pokemons => {
                    :only => [
                        :id,
                        :species, 
                        :nickname
                    ]
                }
            },
            :except => [
                :created_at, 
                :updated_at
            ]
        )
    end 

end 