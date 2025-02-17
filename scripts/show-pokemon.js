// POKEMON
const playPokemonSound = document.querySelector('#playPokemonSound');
const pokemonImage = document.querySelector('.pokemon-image-itself');
const pokemonName = document.querySelector('.pokemon-info-name');
const pokemonAudio = document.querySelector('.pokemon-info-cries-button-audio');
const pokemonHeight = document.querySelector('.pokemon-info-text-inner-height');
const pokemonWeight = document.querySelector('.pokemon-info-text-inner-weight');

// RETRIEVING THE DATA FROM LOCAL STORE

function retrivingTheDataFromLocalStore() {
    const pokemonId = localStorage.getItem('pokemonIdLS');
    const fetchPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    
    if (pokemonId) {
        fetchPromise
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                };

                return response.json();
            })
            .then(pokemonData => {
                const pokemonNameData = pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1);
                
                // POKEMON IMAGE
                pokemonImage.src = pokemonData.sprites.other['official-artwork'].front_default;
                pokemonImage.alt = pokemonNameData;
                // POKEMON NAME
                pokemonName.textContent = pokemonNameData;
                // POKEMON AUDIO
                pokemonAudio.src = pokemonData.cries.latest;
                // POKEMON HEIGHT
                pokemonHeight.textContent = pokemonData.height;
                // POKEMON WEIGHT
                pokemonWeight.textContent = pokemonData.weight;
            })
            .catch(error => {
                console.log(`The request was denied: ${error}`);
            })
    };
};

retrivingTheDataFromLocalStore();

// PLAY THE SOUND

playPokemonSound.addEventListener('click', () => pokemonAudio.play());