document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search)
    const pokemonId = urlParams.get('id')

    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
    .then((response) => response.json())
    .then((pokemonData) => {
        const detailsDiv = document.createElement("div")
        detailsDiv.classList.add('pokemon-detail-card', pokemonData.types[0].type.name)
        const price = Math.floor(Math.random() * 1000) + 1
        detailsDiv.innerHTML = `
        <div class="pokemon-header">
            <h1>${pokemonData.name}</h1>
            <p>${pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat} HP</p>
        </div>
        <div class="pokemon-image">
            <img src="${pokemonData.sprites.other["home"].front_default}" alt="${pokemonData.name}">
        </div>
        <div class="box-infos">
        <p>${pokemonData.types.map(typeInfo => typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)).join(' / ')} Pokémon.</p>
            <p><b>Height :</b> ${pokemonData.height}',</p>
            <p><b>Weight :</b> ${pokemonData.weight} lbs.</p>
        </div>
        <div class="pokemon-info">
            <div class="pokemon-text">
                <p><b>Abilities :</b> ${pokemonData.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
                <ul>
                    ${pokemonData.stats.map(statInfo => `<li><b>${statInfo.stat.name} :</b> ${statInfo.base_stat}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="pokemon-footer-card">
            <p>${pokemonData.id}</p>
        </div>`
        document.querySelector("#pokemonDetails").appendChild(detailsDiv)

        const buyDiv = document.createElement("div")
        buyDiv.classList.add('pokemon-buy')
        buyDiv.innerHTML = `
        <div class="pokemon-buy-card">
            <p><b>Price :</b> ${price} €</p>
            <button class="buy-now">Buy now</button>
        </div>`
        buyDiv.querySelector('.buy-now').addEventListener('click', function() {
            addToCart(pokemonData, price)
        })

        document.querySelector("#pokemonDetails").appendChild(detailsDiv)
        document.querySelector("#pokemonDetails").appendChild(buyDiv)
    })
})

// Fonction pour ajouter le Pokémon au panier
function addToCart(pokemonData, price) {
    const cartItem = {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.other["home"].front_default,
        price: price,
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || []

    cart.push(cartItem)

    localStorage.setItem('cart', JSON.stringify(cart))

    alert('Le Pokémon a été ajouté au panier !')
}