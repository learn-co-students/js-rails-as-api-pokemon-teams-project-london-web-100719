// import {TRAINERS_URL, POKEMONS_URL} from './API'

const ENDPOINT = "http://localhost:3000"
const TRAINERS_URL = `${ENDPOINT}/trainers`
const POKEMONS_URL = `${ENDPOINT}/pokemons`

const cardContainer = document.querySelector('main');

const loadTrainers = () => {

    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(res => res.forEach(createTrainerCard))

};

const createTrainerCard = (card) => {

	const div = document.createElement('div');
	const p = document.createElement('p');
	const addPokemonButton = document.createElement('button');
	const ul = document.createElement('ul');

	div.classList.add('card');

	div.dataset.id = card.id;
	addPokemonButton.dataset.trainerId = card.id

	addPokemonButton.textContent = 'Add Pokemon';
	p.textContent = card.name;

	addPokemonButton.addEventListener('click', () =>  addPokemon(card, ul));

	addPokemonButton.style.outline = 'none';

	for (element of card.pokemons) {

		createPokemonLI(element, ul);

	}

	div.append(p, addPokemonButton, ul);
	cardContainer.append(div);

};

const createPokemonLI = (element, ul) => {

	const li = document.createElement('li');
	const releaseButton = document.createElement('button');

	releaseButton.className = 'release';
	releaseButton.dataset.pokemonId = element.id;

	li.textContent = `${element.nickname} (${element.species}) `;
	releaseButton.textContent = 'Release';

	releaseButton.addEventListener('click', () => releasePokemon(element, li));

	li.appendChild(releaseButton);
	ul.appendChild(li);

	releaseButton.style.outline = 'none';

}

const addPokemon = (trainer, ul) => {

	pokemonObj = {

		method: "POST",
		headers: {

			"Content-Type": "application/json"

		},
		body: JSON.stringify({trainer_id: trainer.id})

	};
	
	fetch(POKEMONS_URL, pokemonObj)
	.then(res => res.json())
	.then(res => createPokemonLI(res, ul))
	.catch(error => console.log(error))

};

const releasePokemon = (pokemon, li) => {

	pokemonObj = {

		method: "DELETE"

	};
	
	fetch(`${POKEMONS_URL}/${pokemon.id}`, pokemonObj)
	.then(li.remove())
	.catch(error => console.log(error))

};

loadTrainers();