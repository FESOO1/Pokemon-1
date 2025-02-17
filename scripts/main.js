const inputItself = document.querySelector('.input-itself');
const inputButton = document.querySelector('.input-button');
const outputContainer = document.querySelector('.output');
const displayedPokemons = ['pikachu','charizard','mewtwo','rayquaza','lucario','greninja','arceus','garchomp','eevee','gengar'];
const notFoundMessage = document.querySelector('.not-found-message');

// DISPLAY POKEMONS

function displayPokemons() {
    for (let i = 0; i < displayedPokemons.length; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${displayedPokemons[i]}`)
        .then(response => {

            if (!response.ok) {
                throw new Error(response.status);
            };

            return response.json();
        })
        .then(pokemonData => {
            const pokemonName = pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1);

            outputContainer.innerHTML += `
                <a title="${pokemonName}" href="./pages/pokemon-detailed-data.html" class="output-itself" data-pokemon-id="${pokemonData.id}">
                    <div class="output-itself-image">
                        <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonName}" class="output-itself-image-itself">
                    </div>
                    <div class="output-itself-info">
                        <h2 class="output-itself-info-name">${pokemonName}</h2>
                        <div class="output-itself-info-cries">
                            <h3 class="output-itself-info-cries-text">Latest cry:</h3>
                            <button class="output-itself-info-cries-button" type="button">
                                <svg class="output-itself-info-cries-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                </svg>
                                <audio class="output-itself-info-cries-button-audio" src="${pokemonData.cries.latest}" style="display: none;"></audio>
                            </button>
                        </div>
                        <h3 class="output-itself-info-text">Height: <span class="output-itself-info-text-inner">${pokemonData.height}</span></h3>
                        <h3 class="output-itself-info-text">Weight: <span class="output-itself-info-text-inner">${pokemonData.weight}</span></h3>
                    </div>
                </a>
            `;

            // CRIES BUTTON
            const outputItself = document.querySelectorAll('.output-itself');
            const outputCriesButton = document.querySelectorAll('.output-itself-info-cries-button');
            const outputCriesButtonAudio = document.querySelectorAll('.output-itself-info-cries-button-audio');

            for (let i = 0; i < outputCriesButton.length; i++) {
                outputCriesButtonAudio[i].volume = 0.2;

                // REMOVING THE HREF ATTRIBUTE WHEN HOVERED
                outputCriesButton[i].addEventListener('mouseenter', () => {
                    outputItself[i].removeAttribute('href');
                });
                outputCriesButton[i].addEventListener('mouseleave', () => {
                    outputItself[i].setAttribute('href', `./pages/pokemon-detailed-data.html`);
                });

                // PLAYING THE AUDIO
                outputCriesButton[i].addEventListener('click', () => {
                    outputCriesButtonAudio[i].play();
                });

                // SAVING THE ID OF A POKEMON THAT IS CLICKED
                outputItself[i].addEventListener('click', () => {
                    const pokemonId = outputItself[i].getAttribute('data-pokemon-id');

                    localStorage.setItem('pokemonIdLS', pokemonId);
                });
            };
        })
        .catch(error => {
            console.log(error);
        });
    };
};

// SEARCH FOR A POKEMON

function searchForAPokemon(e) {
    e.preventDefault();

    if (inputItself.value.length > 0) {
        inputItself.style.border = '1px solid rgba(255,255,255,0.05)';

        // FETCHING THE DATA
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputItself.value}`)
        .then(response => {
            if (!response.ok) {
                console.log(response.status);

                if (response.status === 404) {
                    outputContainer.innerHTML = '';
                    notFoundMessage.textContent = 'Pokémon not found. Please try again!';
                };
            } else {
                notFoundMessage.textContent = '';
            };

            return response.json();
        })
        .then(pokemonData => {
            const pokemonName = pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1);

            outputContainer.innerHTML = `
                <a title="${pokemonName}" href="./pages/pokemon-detailed-data.html" class="output-itself" data-pokemon-id="${pokemonData.id}">
                    <div class="output-itself-image">
                        <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonName}" class="output-itself-image-itself">
                    </div>
                    <div class="output-itself-info">
                        <h2 class="output-itself-info-name">${pokemonName}</h2>
                        <div class="output-itself-info-cries">
                            <h3 class="output-itself-info-cries-text">Latest cry:</h3>
                            <button class="output-itself-info-cries-button" type="button">
                                <svg class="output-itself-info-cries-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                </svg>
                                <audio class="output-itself-info-cries-button-audio" src="${pokemonData.cries.latest}" style="display: none;"></audio>
                            </button>
                        </div>
                        <h3 class="output-itself-info-text">Height: <span class="output-itself-info-text-inner">${pokemonData.height}</span></h3>
                        <h3 class="output-itself-info-text">Weight: <span class="output-itself-info-text-inner">${pokemonData.weight}</span></h3>
                    </div>
                </a>
            `;
        })
        .catch(error => {
            console.log(error);
        });
    } else {
        inputItself.style.border = '1px solid red';
    };
};

// INPUT 

inputItself.addEventListener('input', () => {
    if (inputItself.value.length === 0) {
        notFoundMessage.textContent = '';
        outputContainer.innerHTML = '';

        displayPokemons();
    };
});

// INITIALIZING
inputButton.addEventListener('click', searchForAPokemon);
window.addEventListener('DOMContentLoaded', displayPokemons);