const inputItself = document.querySelector('.input-itself');
const inputButton = document.querySelector('.input-button');
const outputContainer = document.querySelector('.output');

// DISPLAY POKEMONS

function displayPokemons() {
    fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
        .then(response => {

            if (!response.ok) {
                throw new Error(response.status);
            };

            return response.json();
        })
        .then(pokemonData => {
            console.log(pokemonData);
        })
        .catch(error => {
            console.log(error);
        });
};

window.addEventListener('DOMContentLoaded', displayPokemons);