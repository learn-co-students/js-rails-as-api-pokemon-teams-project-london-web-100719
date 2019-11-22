const BASE_URL = "http://localhost:3001"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


let mainClass = document.querySelector('main')

// DOM Stuff

document.addEventListener('DOMContentLoaded', () => {

    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainers => {
            trainers.forEach(trainer  => {
                //console.log(trainer)
                createCard(trainer)
            })
        })

    function createCard(trainer) {
   
        let newDiv = document.createElement('div')
        newDiv.className = 'card'
        newDiv.setAttribute('data-id', `${trainer.id}`)

        let newP = document.createElement('p')
        newP.innerHTML = trainer.name
        
        let newButton = document.createElement('button')
        newButton.setAttribute('data-trainer-id', `${trainer.id}`)
        newButton.innerHTML = 'Add Pokemon'
        newButton.disabled = false;

        let newUl = document.createElement('ul')

        //loop for each pokemon and create li and delete button
        trainer.pokemons.forEach(pokemon => {
            let newLi = document.createElement('li')
            newLi.innerHTML = pokemon.nickname
            let liButton = document.createElement('button')
            liButton.className = 'release'
            liButton.setAttribute("data-pokemon-id", `${pokemon.id}`)
            liButton.innerHTML = 'Release'
            newLi.appendChild(liButton)
            newUl.appendChild(newLi)

            liButton.addEventListener('click', () => {
                let target = newLi
                target.remove()
                if (trainer.pokemons.lenth < 6){
                    newButton.disabled = false;
                }
                fetch(`${POKEMONS_URL}/destroy/${pokemon.id}`)
            })

        })


        newDiv.append(newP, newButton, newUl)
        mainClass.appendChild(newDiv)


        newButton.addEventListener('click', () => {
            if (trainer.pokemons.length >= 5) {
                newButton.disabled = true;
            }

            else if (trainer.pokemons.length < 6){
                //set variable that goes to generator for faker data
                fetch(`${POKEMONS_URL}/create/${trainer.id}`)
                    .then(res => res.json())
                    .then(pokemon => {
                        let newLi = document.createElement('li')
                        newLi.innerHTML = pokemon.nickname
                        let liButton = document.createElement('button')
                        liButton.className = 'release'
                        liButton.setAttribute("data-pokemon-id", `${pokemon.id}`)
                        liButton.innerHTML = 'Release'
                        newLi.appendChild(liButton)
                        newUl.appendChild(newLi)

                        liButton.addEventListener('click', () => {
                            let target = newLi
                            target.remove()
                        })
                    })
            }
        })


    }


})

