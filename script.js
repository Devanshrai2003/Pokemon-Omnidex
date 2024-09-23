const goButton = document.querySelector("#go-button")
const enterButton = document.querySelector("#enter-button");
const typeInput = document.querySelector("#pokemon-type");
const specificNameInput = document.querySelector("#pokemon-name")
const numberInput = document.querySelector("#number-selector");
const listContainer = document.querySelector(".list"); 
const detailsContainer = document.querySelector(".details");

async function getPokemonByType(pokemonType, pokemonNumber){
    try{
        const pokemonData = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType.toLowerCase()}`)
        const pokemonList = pokemonData.data.pokemon.slice(0, pokemonNumber)
        console.log(pokemonList)

        listContainer.innerHTML = "";

        for(let i = 0; i < pokemonList.length; i++){
            const pokemonUnit = pokemonList[i].pokemon
            const details = await getPokemonDetails(pokemonUnit.url);

            const card = document.createElement("div");
            const pokemonName = document.createElement("div")
            const pokemonImage = document.createElement("div")
            
            pokemonImage.classList.add("pokemon-card-image")
            pokemonImage.style.backgroundImage = `url(${details.sprites.front_default})`
            
            pokemonName.classList.add("pokemon-card-text")
            pokemonName.innerHTML = `<h3>${details.name}</h3>`
            
            card.classList.add("pokemon-card")
            
            card.appendChild(pokemonName);
            card.appendChild(pokemonImage)

            card.addEventListener("click", () => {
                displayPokemonDetails(details);
            });

            listContainer.appendChild(card)

        }
    }catch(error){
        console.log("Error")
    }

async function getPokemonDetails(pokemonUrl) {
    try{
        const response = await axios.get(pokemonUrl)
    return response.data
    }catch(error){
        console.log("error fetching details from API")
    }
}

}

function displayPokemonDetails(pokemon) {
    detailsContainer.innerHTML = "";

    const detailScreen = document.createElement("div")
    detailScreen.classList.add("detail-screen")

    const infoBox = document.createElement("div")
    infoBox.classList.add("detail-box")
    infoBox.classList.add("info-box")

    const imageBox = document.createElement("div")
    imageBox.classList.add("detail-box")

    const name = document.createElement("div");
    name.classList.add("detail-text")
    name.innerHTML = `Name: ${pokemon.name}`;

    const image = document.createElement("img");
    image.classList.add("detail-image")
    image.src = pokemon.sprites.front_default;

    const height = document.createElement("div");
    height.classList.add("detail-text")
    height.innerHTML = `Height: ${pokemon.height}`;

    const weight = document.createElement("div");
    weight.classList.add("detail-text")
    weight.innerHTML = `Weight: ${pokemon.weight}`;

    const abilities = document.createElement("div");
    abilities.classList.add("detail-text")
    abilities.innerHTML = "Abilities: " + pokemon.abilities.map((ability) => ability.ability.name).join(", ");

    infoBox.appendChild(name);
    infoBox.appendChild(height);
    infoBox.appendChild(weight);
    infoBox.appendChild(abilities);

    imageBox.appendChild(image);

    detailScreen.appendChild(infoBox);
    detailScreen.appendChild(imageBox);

    detailsContainer.appendChild(detailScreen);

}


goButton.addEventListener("click", function(){
    const pokemonType = typeInput.value;
    const pokemonNumber = parseInt(numberInput.value);

    if(pokemonType && pokemonNumber > 0 && pokemonNumber <= 6){
        getPokemonByType(pokemonType, pokemonNumber)
    }else{
        alert("Please select pokemon type and a number between 1 & 6")
    }

})

enterButton.addEventListener("click" , async function(){
    const specificPokemon = specificNameInput.value.toLowerCase();
    try{
    const specificPokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${specificPokemon}`)
    displayPokemonDetails(specificPokemonData.data)
    } catch (error) {
        console.log("Error fetching specific Pokémon")
        alert("Pokémon not found. Please check the name and try again.");
    }
})