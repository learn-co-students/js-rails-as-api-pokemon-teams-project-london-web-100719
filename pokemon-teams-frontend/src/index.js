const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {

    loadTrainers();

})

function loadTrainers() {

    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(res => {

        res.forEach( element => {

            createCard(element)

        });

    });

};

function createCard(obj) {

    const cardContainer = document.querySelector('main')

    let div = document.createElement('div');
    div.classList.add('card');
    div.dataset.id = obj.id

    let p = document.createElement('p')
    p.textContent = obj.name

    let addPokemonButton = document.createElement('button');
    addPokemonButton.dataset.trainerId = obj.id
    addPokemonButton.textContent = 'Add Pokemon'
    addPokemonButton.style.outline = 'none';

    let ul = document.createElement('ul');

    for (element of obj.pokemons) {
        // console.log(element)
        const li = document.createElement('li');
        // debugger;
        li.textContent = `${element.nickname} (${element.species}) `;

        const releaseButton = document.createElement('button');
        releaseButton.textContent = 'Release';
        releaseButton.className = 'release';
        releaseButton.dataset.PokemonId = element.id;
        releaseButton.style.outline = 'none';

        li.appendChild(releaseButton);
        ul.appendChild(li);

    }

    div.appendChild(p);
    div.appendChild(addPokemonButton);
    div.appendChild(ul);
    cardContainer.appendChild(div);

}