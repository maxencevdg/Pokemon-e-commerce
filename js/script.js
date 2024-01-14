let lastPokemonId = 0

function fetchPokemons() {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${lastPokemonId}&limit=20`)
    .then((response) => response.json())
    .then((data) => {
        const card = document.createElement("div")
        card.classList.add('pokemon-container')
        const pokemonPromises = data.results.map((pokemon) => {
            return fetch(pokemon.url)
            .then((response) => response.json())
        })
        Promise.all(pokemonPromises)
        .then((pokemons) => {
            pokemons.forEach((pokemonData) => {
                const detailsDivProduct = document.createElement("div")
                detailsDivProduct.classList.add('pokemon-card')
                detailsDivProduct.classList.add(pokemonData.types[0].type.name)
                detailsDivProduct.innerHTML = `
                <p class="number">N° ${pokemonData.id}</p>
                <h3>${pokemonData.name}</h3>
                <img src="${pokemonData.sprites.other["home"].front_default}" alt="${pokemonData.name}">`
                card.appendChild(detailsDivProduct)

                detailsDivProduct.addEventListener('click', function() {
                    window.location.href = 'html/page_produit.html?id=' + pokemonData.id
                })
            })
            document.querySelector("#pokemonProducts").appendChild(card)
        })
    })
    .finally(() => {
        lastPokemonId += 20
    })
}

document.addEventListener('DOMContentLoaded', function () {
    fetchPokemons()
    const showMoreButton = document.querySelector("#showMore")
    if (showMoreButton) {
        showMoreButton.addEventListener('click', fetchPokemons)
    } else {
        console.error('Element with id "showmore" not found')
    }
})