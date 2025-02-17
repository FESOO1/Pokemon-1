// POKEMON
const pokemon = document.querySelector('.pokemon');
const playPokemonSound = document.querySelector('#playPokemonSound');
const pokemonImage = document.querySelector('.pokemon-image-itself');
const pokemonName = document.querySelector('.pokemon-info-name');
const pokemonAudio = document.querySelector('.pokemon-info-cries-button-audio');
const pokemonHeight = document.querySelector('.pokemon-info-text-inner-height');
const pokemonWeight = document.querySelector('.pokemon-info-text-inner-weight');

// POKEMON
let startPosY = 0, startPosX = 0, newPosY = 0, newPosX = 0;

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

// ROTATING THE POKEMON
pokemon.addEventListener('mousedown', e => {
    startPosY = e.clientY;
    startPosX = e.clientX;

    document.addEventListener('mousemove', rotateThePokemonCard);
    document.addEventListener('mouseup', () => {
        pokemon.style.transform = `perspective(600px) rotateY(0deg) rotateX(0deg)`;
        document.removeEventListener('mousemove', rotateThePokemonCard)
    });
});

function rotateThePokemonCard(e) {
    newPosY = startPosY - e.clientY;
    newPosX = startPosX - e.clientX;

    pokemon.style.transform = `perspective(600px) rotateY(${newPosX}deg) rotateX(${newPosY}deg)`;

    // SETTING BOUDARIES
    /* if (newPosX < -50) {
        document.removeEventListener('mousemove', rotateThePokemonCard)
    } else if (newPosX > 50) {
        document.removeEventListener('mousemove', rotateThePokemonCard)
    }; */
};