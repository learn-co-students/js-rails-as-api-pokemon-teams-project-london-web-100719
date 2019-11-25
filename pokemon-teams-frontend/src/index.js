const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", function() {
    // console.log("hiiii")
    fetch(`${TRAINERS_URL}`)
    .then(resp => resp.json())
    .then(data => data.forEach(trainer => addTeams(trainer)))
})


function addTeams(trainer) {
    let newCard = document.createElement('div')
    newCard.className = "card"
    dataIdAtt = document.createAttribute('data-id', trainer.id)
    newCard.setAttributeNode(dataIdAtt)
    let newCardPara = document.createElement('p')
    newCard.appendChild(newCardPara)
    newCardPara.innerText = trainer.name
    addButton(newCard, trainer)
    let pokemonList = document.createElement('ul')
    addPokemon(newCard, trainer, pokemonList)
    main.appendChild(newCard)
}

function addButton(newCard, trainer) {
    let newButton = document.createElement('button')
    newCard.appendChild(newButton)
    let newButtonAtt = document.createAttribute("data-trainer-id", trainer.id)
    newButton.setAttributeNode(newButtonAtt)
    newButton.innerText = "Add Pokemon"
    newCard.appendChild(newButton)
    newButton.addEventListener("click", function() {
        newPokemon(trainer) 

    })
}

function newPokemon(trainer) {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }, 
          body: JSON.stringify({
            "species": "d",
            "nickname": "a",
            "trainer_id": trainer.id
          })

    }
    fetch(POKEMONS_URL, configObj)
}


function addPokemon(newCard, trainer) {
    newCard.appendChild(pokemonList)
    trainer.pokemons.forEach(pokemon => addToList(pokemon, pokemonList))
}

function addToList(pokemon, pokemonList) {
    let listEl = document.createElement('li')
    listEl.innerText = `${pokemon.nickname} (${pokemon.species})`
    addReleaseButton(listEl, pokemon)
    pokemonList.appendChild(listEl)
}

function addReleaseButton(listEl, pokemon) {
    let releaseButton = document.createElement('button')
    listEl.appendChild(releaseButton)
    releaseButton.className = "release"
    let releaseButtonAtt = document.createAttribute("data-pokemon-id", pokemon.id)
    releaseButton.setAttributeNode(releaseButtonAtt)
    releaseButton.innerText = "Release"
}