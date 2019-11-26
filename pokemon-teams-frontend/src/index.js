// URLs
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// global variables
const main = document.querySelector("main");

// get promise
function getTrainers() {
    return fetch(TRAINERS_URL)
        .then(function(resp) {
            return resp.json();
        })
    }

// render pokemons for a trainer and return unordered list
function renderPokemons(trainer) {
    let ul = document.createElement("ul");

    trainer.pokemons.forEach(function(pokemon) {
        let relBtn = document.createElement("button");
        relBtn.setAttribute("class", "release");
        relBtn.setAttribute("data-pokemon-id", `${pokemon.id}`);
        relBtn.innerText = "Release";
        
        let li = document.createElement("li");
        li.innerText = `${pokemon.nickname} (${pokemon.species})`;
        li.appendChild(relBtn);
        
        relBtn.addEventListener("click", function() {
            releasePokemon(pokemon,li);
        })

        ul.appendChild(li);
    })

    return ul;
}
    
// render a trainer with associated pokemons
function renderTrainer(trainer) {
    let trainerDiv = document.createElement("div");
    trainerDiv.setAttribute("class", "card");
    trainerDiv.setAttribute("data-id", `${trainer.id}`);
    
    let p = document.createElement("p");
    p.innerText = trainer.name;
    
    let addBtn = document.createElement("button");
    addBtn.setAttribute("data-trainer-id", `${trainer.id}`);
    addBtn.innerText = "Add Pokemon";

    trainerDiv.append(p, addBtn, renderPokemons(trainer));

    addBtn.addEventListener("click", function() {
        let ul = trainerDiv.querySelector("ul")
        if (ul.childElementCount < 6) {
            addPokemon(trainer);
        } else {
            alert("A trainer is only allowed to have up to a maximum of 6 Pokemons!");
        }
    })

    main.append(trainerDiv);
}

// get trainers data and render each
getTrainers().then(function(trainerJson) {
    trainerJson.forEach(function(trainer){
        renderTrainer(trainer);
    })
})

// release pokemon
function releasePokemon(pokemon, li) {
    event.preventDefault();

    let configObj = {
        method: "DELETE"
    }

    fetch(`${POKEMONS_URL}/${pokemon.id}`, configObj)
        .then(function() {
            li.remove();
        })
}

// add pokemon
function addPokemon(trainer) {
    event.preventDefault();

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "nickname": "Ed",
            "species": "Bulbasaur",
            "trainer_id": trainer.id
        })
    }

    fetch(POKEMONS_URL, configObj)
        .then(function() {
            location.reload();
        })
}
