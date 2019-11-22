

document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    const trainerContainer = document.querySelector('#trainer-container');

    loadTrainers()

    function loadTrainers() {
        fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainersData => {
            trainersData.forEach((trainer) => {
                team = generateTeamObject(trainer);
                renderTrainerCard(team);
            })
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
        cardEl.classList.add("card", "trainer-card");
        cardEl.setAttribute('data-id', team.id);
        
        const nameEl = document.createElement("p");
        nameEl.textContent = team.name;

        const addButtonEl = document.createElement("button");
        addButtonEl.setAttribute('data-trainer-id', team.id);
        addButtonEl.textContent = "Add Pokemon";
        addButtonEl.addEventListener('click', (event) => {handleAddPokemon(team.id)});

        const pokemonListEl = document.createElement("ul");

        team.pokemons.forEach((pokemon) => {
            listEl = renderPokemonListEl(pokemon, pokemonListEl)
            pokemonListEl.append(listEl);
        })

        cardEl.append(nameEl, addButtonEl, pokemonListEl);
        trainerContainer.append(cardEl);

    }

    function renderPokemonListEl (pokemon) {
        
        const listEl = document.createElement("li");
        listEl.textContent = `${pokemon.nickname} (${pokemon.species})`

        const delButton = document.createElement("button");
        delButton.textContent = "Release";
        delButton.classList.add("release");
        delButton.setAttribute('data-pokemon-id', pokemon.id);
        delButton.addEventListener('click', (event) => {handleDeletePokemon(pokemon.id)});


        listEl.append(delButton);

        return listEl;
    }

    function handleAddPokemon(id) {
        const button = event.target
        const cardEl = button.parentNode;
        const pokemonListEl = cardEl.querySelector("ul");

        configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "trainer_id" : id
            })
        }

        fetch(`${POKEMONS_URL}`, configObj)
        .then(res => res.json())
        .then(pokemon_data => {
            listEl = renderPokemonListEl(pokemon_data);
            pokemonListEl.append(listEl);
        }); 
    }

    function handleDeletePokemon(pokemon_id) {
        const pokemonListEl = event.target.parentNode
        
        fetch(`${POKEMONS_URL}/${pokemon_id}`, {method: "DELETE" })
        .then(pokemonListEl.remove())
    }
})
