const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const MAIN = document.querySelector("main");
// const jsonify = response => response.json();

document.addEventListener("DOMContentLoaded", () => {
  function getTrainerDataFromAPI(url) {
    return fetch(url)
      .then(res => res.json())
      .then(json => json.forEach(trainer => buildTrainerCard(trainer)));
  }

  getTrainerDataFromAPI(TRAINERS_URL);
  // debugger;
  // trainerJSON.forEach(trainer => buildTrainerCard(trainer));

  function buildTrainerCard(trainer) {
    let card = document.createElement("div");
    card.className = "card";

    let trainerName = document.createElement("p");
    trainerName.innerText = trainer.name;

    let addPokemonButton = document.createElement("button");
    addPokemonButton.innerText = "Add Pokemon";
    addPokemonButton.addEventListener("click", () => {
      addPokemon(trainer.id, ul);
    }); // Write addPokemon method

    let ul = document.createElement("ul");
    trainer.pokemons.forEach(pokemon => {
      ul.append(buildPokemonListEl(pokemon));
    });

    card.append(trainerName, addPokemonButton, ul);
    MAIN.append(card);
  }

  function buildPokemonListEl(pokemon) {
    const li = document.createElement("li");
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;

    const btn = document.createElement("button");
    btn.innerText = "release";
    btn.className = "release";
    btn.addEventListener("click", () => {
      deletePokemon(pokemon, li);
    });

    li.append(btn);
    return li;
  } // ends buildPokemonList

  function addPokemon(trainer_id, ul) {
    obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        trainer_id: trainer_id
      })
    };

    fetch(POKEMONS_URL, obj)
      .then(res => res.json())
      .then(json => buildPokemonListEl(json))
      .then(listEl => ul.append(listEl)); // <li>...
  }

  function deletePokemon(pokemon, li) {
    let url = POKEMONS_URL + `/${pokemon.id}`;
    delPokemon = {
      method: "DELETE"
    };
    fetch(url, delPokemon).then(li.remove());
  }
}); // ends our DOMContentLoaded
