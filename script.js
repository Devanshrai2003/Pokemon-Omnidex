const goButton = document.querySelector("#go-button")
const enterButton = document.querySelector("#enter-button");
const typeInput = document.querySelector("#pokemon-type");
const specificNameInput = document.querySelector("#pokemon-name")
const numberInput = document.querySelector("#number-selector");
const listContainer = document.querySelector(".list"); 
const detailsContainer = document.querySelector(".details");



function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1))

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


async function getSpecificPokemon() {
        const specificPokemon = specificNameInput.value.toLowerCase();
        try{
        const specificPokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${specificPokemon}`)
        displayPokemonDetails(specificPokemonData.data)
        } catch (error) {
            console.log("Error fetching specific Pokemon")
            alert("Pokemon not found. Please check the name and try again.");
        }
}


async function getPokemonByType(pokemonType, pokemonNumber){
    try{
        const pokemonData = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType.toLowerCase()}`)
        const pokemonList = pokemonData.data.pokemon
        const shuffledList = shuffle(pokemonList);
        const chosenPokemon = shuffledList.slice(0, pokemonNumber);

        listContainer.innerHTML = "";

        for(let i = 0; i < chosenPokemon.length; i++){
            const pokemonUnit = chosenPokemon[i].pokemon
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
        console.log("Error", error)
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

    const infoBoxLeft = document.createElement("div")
    infoBoxLeft.classList.add("detail-box")
    infoBoxLeft.classList.add("info-box")

    const imageBox = document.createElement("div")
    imageBox.classList.add("detail-box")

    const infoBoxRight = document.createElement("div")
    infoBoxRight.classList.add("detail-box")
    infoBoxRight.classList.add("info-box")

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

    const type = document.createElement("div");
    type.classList.add("detail-text")
    type.innerHTML = "Type: " + pokemon.types.map((type) => type.type.name).join(", ");

    const hp = document.createElement("div");
    hp.classList.add("detail-text")
    hp.innerHTML = `Hp: ${pokemon.stats[0].base_stat}`;

    const atk = document.createElement("div");
    atk.classList.add("detail-text")
    atk.innerHTML = `Atk: ${pokemon.stats[1].base_stat}`;

    const def = document.createElement("div");
    def.classList.add("detail-text")
    def.innerHTML = `Def: ${pokemon.stats[2].base_stat}`;

    const spAtk = document.createElement("div");
    spAtk.classList.add("detail-text")
    spAtk.innerHTML = `Sp.Atk: ${pokemon.stats[3].base_stat}`;

    const spDef = document.createElement("div");
    spDef.classList.add("detail-text")
    spDef.innerHTML = `Sp.Def: ${pokemon.stats[4].base_stat}`;

    const spd = document.createElement("div");
    spd.classList.add("detail-text")
    spd.innerHTML = `Spd: ${pokemon.stats[5].base_stat}`;

    infoBoxLeft.appendChild(name);
    infoBoxLeft.appendChild(height);
    infoBoxLeft.appendChild(weight);
    infoBoxLeft.appendChild(abilities);

    infoBoxRight.appendChild(type);
    infoBoxRight.appendChild(hp);
    infoBoxRight.appendChild(atk);
    infoBoxRight.appendChild(def);
    infoBoxRight.appendChild(spAtk);
    infoBoxRight.appendChild(spDef);
    infoBoxRight.appendChild(spd);

    imageBox.appendChild(image);

    detailScreen.appendChild(infoBoxLeft);
    detailScreen.appendChild(imageBox);
    detailScreen.appendChild(infoBoxRight);


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



enterButton.addEventListener("click" ,() => getSpecificPokemon())

specificNameInput.addEventListener("keydown", async function(event){
    if(event.key == "Enter"){
       await getSpecificPokemon()
    }
})