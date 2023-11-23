// Insert your code here
// Récupère le btn et le container
const btn = document.querySelector("#next");
const pokemonContainer = document.querySelector("#pokemonContainer");

// vide le contenu sur la page web
pokemonContainer.innerHTML = "";

// Paremetre les données
const dataPokedex = (data) => {
  const name = data.name[0].toUpperCase() + data.name.slice(1);
  /*const type = `${data.types[0].type.name}/${data.types[1].type.name}`;*/
  const type = data.types[0].type.name;
  console.log(data);
  const html = `<div class="pokemon ${type}">
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="${name}"/>
    </div>
    <div class="info">
        <h3 class="name">${name}</h3>
        <span class="type">Type: <span>${type}</span></span>
    </div>
</div>`;

  // Insere les données
  pokemonContainer.insertAdjacentHTML("beforeend", html);
};

// variable de stockage pour lancer et faire apparaitre 15 pokemon
let start = 1;
let number = 15;
const pokemon = async () => {
  try {
    // boucle le nombre de pokemon
    for (let i = start; i < number; i++) {
      // appel l'API
      const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      // Affiche une erreur si n'a pas fonctionner
      if (!resPokemon.ok) throw new Error("Problem getting pokemon data");
      // Charge l'url dans une variable
      const dataPokemon = await resPokemon.json();
      //console.log(dataPokemon);
      // appel la fonction du html et insere les données de l'API dedans
      dataPokedex(dataPokemon);
    }
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

pokemon();

// Ajout au click du btn
btn.addEventListener("click", () => {
  start += number; // 1 + 15
  number += number; // 15 + 15
  pokemon(); // appel la fonction
});

//"https://pokeapi.co/api/v2/pokemon/{id or name}/"
//"https://pokeapi.co/api/v2/ability/?limit=20&offset=20"
