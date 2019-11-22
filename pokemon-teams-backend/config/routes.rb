Rails.application.routes.draw do
  resources :pokemons
  resources :trainers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html]
  get 'pokemons/create/:id', to: 'pokemons#create'
  get 'pokemons/destroy/:id', to: 'pokemons#destroy'

end
