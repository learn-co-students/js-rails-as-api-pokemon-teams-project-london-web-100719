const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", function() {
  fetchTrainers();
});

const trainerURL = "http://localhost:3000/trainers";
const pokemonURL = "http://localhost:3000/pokemons";

function fetchTrainers() {
  fetch(trainerURL)
    .then(resp => resp.json())
    .then(renderTrainers);
}

function renderTrainers(trainers) {
  trainers.forEach(function(trainer) {
    const main = document.querySelector("main");
    const divCardTrainer = document.createElement("div");
    const pTrainer = document.createElement("p");
    const buttonTrainer = document.createElement("button");
    divCardTrainer.append(pTrainer, buttonTrainer);
    divCardTrainer.className = "card";
    divCardTrainer["data-id"] = trainer.id;
    pTrainer.innerText = trainer.name;
    buttonTrainer["data-trainer-id"] = trainer.id;
    buttonTrainer.innerText = "Add Pokemon";
    buttonTrainer.addEventListener("click", addNewPokemon);
    main.append(divCardTrainer);
    renderPokemons(trainer.pokemons, divCardTrainer);
  });

  function renderPokemons(pokemons, divCardElement) {
    const ulPokemon = document.createElement("ul");
    pokemons.forEach(function(pokemon) {
      createPokemon(pokemon, ulPokemon);
      divCardElement.append(ulPokemon);
    });
  }

  function createPokemon(pokemon, ulElement) {
    const liPokemon = document.createElement("li");
    const buttonPokemon = document.createElement("button");
    buttonPokemon.className = "release";
    buttonPokemon["data-pokemon-id"] = pokemon.id;
    buttonPokemon.style.float = "right";
    buttonPokemon.style.background = "#C62D42";
    buttonPokemon.innerText = "Release";
    buttonPokemon.addEventListener("click", deletePokemon);
    liPokemon.innerText = `${pokemon.nickname} (${pokemon.species}) `;
    liPokemon.appendChild(buttonPokemon);
    ulElement.append(liPokemon);
  }

  function addNewPokemon(event) {
    event.preventDefault();
    let ulPokemon = event.target.nextElementSibling;
    if (ulPokemon.childElementCount < 6) {
      configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ trainer_id: event.target["data-trainer-id"] })
      };

      fetch(pokemonURL, configObj)
        .then(resp => resp.json())
        .then(pokemon => createPokemon(pokemon, ulPokemon));
    }
  }

  function deletePokemon(event) {
    event.preventDefault();
    let configObj = {
      method: "DELETE"
    };
    fetch(`${pokemonURL}/${event.target["data-pokemon-id"]}`, configObj).then(
      console.log
    );
    let liPokemon = event.target.parentElement;
    liPokemon.remove();
  }
}
