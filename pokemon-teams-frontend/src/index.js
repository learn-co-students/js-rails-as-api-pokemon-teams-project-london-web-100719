document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    const trainerContainer = document.querySelector('main');

    const jsonify = res => res.json();

    loadTrainers()

    function loadTrainers() {
        fetch(TRAINERS_URL)
        .then(jsonify)
        .then(trainersData => {
            processTrainerData(trainersData)
        })
    }

    function processTrainerData(trainers) {
        trainers.forEach((trainer) => {
            team = generateTeamObject(trainer);
            renderTrainerCard(team);
        })
    }

    function generateTeamObject(trainer) {
        return {
            id: trainer.id,
            name: trainer.name,
            pokemons: trainer.pokemons
        }
    }

    function renderTrainerCard(team) {
        const cardEl = document.createElement("div");
        cardEl.classList.add("card");
        cardEl.setAttribute('data-id', team.id);
        
        const nameEl = document.createElement("p");
        nameEl.textContent = team.name;

        pokemonListEl = renderPokemonList();
        numPokemon = pokemonListEl.childElementCount;

        const addButton = document.createElement("button");
        addButton.setAttribute('data-trainer-id', team.id);
        addButton.addEventListener('click', () => {handleAddPokemon(team.id)});
        showCorrectButton(numPokemon, addButton);

        cardEl.append(nameEl, addButton, pokemonListEl);
        trainerContainer.append(cardEl);
    }

    function renderPokemonList() {
        const pokemonListEl = document.createElement("ul");
        team.pokemons.forEach((pokemon) => {
            addPokemonToList(pokemon, pokemonListEl);
        })
        return pokemonListEl
    }

    function addPokemonToList(pokemon, pokemonListEl) {
        listEl = renderPokemonListEl(pokemon, pokemonListEl)
        pokemonListEl.append(listEl);
    }

    function renderPokemonListEl (pokemon) {
        
        const listEl = document.createElement("li");
        listEl.textContent = `${pokemon.nickname} (${pokemon.species})`

        const delButton = document.createElement("button");
        delButton.setAttribute('data-pokemon-id', pokemon.id);
        delButton.textContent = "Release";
        delButton.classList.add("release");
        delButton.addEventListener('click', () => {handleDeletePokemon(pokemon.id)});

        listEl.append(delButton);

        return listEl;
    }

    function handleAddPokemon(id) {
        const button = event.target
        const pokemonListEl = button.parentNode.querySelector("ul");
        const numPokemon = pokemonListEl.childElementCount + 1;

        configObj = generateConfigObject(id, "POST")

        fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(pokemon => {
            addPokemonToList(pokemon, pokemonListEl);
            showCorrectButton(numPokemon, button);
        }); 
    }

    function showCorrectButton(numPokemon, button) {
        isPartyFull(numPokemon) ? renderFullStyle(button) : renderAddStyle(button);
    }

    function isPartyFull(numPokemon) {
        return numPokemon >= 6
    }

    function renderAddStyle(button) {
        button.textContent = "Add Pokemon";
        button.disabled = false;
        button.style.color = "white";
    }

    function renderFullStyle(button) {
        button.textContent = "Party Full";
        button.disabled = true;
        button.style.color = "red";
    }

    function generateConfigObject(id, method) {
        return configObj = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "trainer_id" : id
            })
        }
    }

    function handleDeletePokemon(pokemon_id) {
        const pokemonListEl = event.target.parentNode
        const numPokemon = pokemonListEl.parentNode.childElementCount - 1;
        const addButton = event.target.parentNode.parentNode.parentNode.querySelector("button")
        removeDataFromAPI(`${POKEMONS_URL}/${pokemon_id}`)
        .then(() => {
            showCorrectButton(numPokemon, addButton);
            removePokemonFromPage(pokemonListEl);
        });
    }

    function removeDataFromAPI(url) {
        return fetch(url, {method: "DELETE"})
    }

    function removePokemonFromPage(pokemon) {
        return pokemon.remove();
    }
})
