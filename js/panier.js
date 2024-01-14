document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    const cartItemsContainer = document.querySelector("#cart-items")
    const totalAmountContainer = document.querySelector("#total-amount")

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''

        cart.forEach(cartItem => {
            const cartItemDiv = document.createElement("div")
            cartItemDiv.classList.add('cart-item')
            cartItemDiv.innerHTML = `
                <img src="${cartItem.image}" alt="${cartItem.name}">
                <p><b>${cartItem.name}</b></p>
                <p><b>Price :</b> ${cartItem.price} €</p>
                <button class="quantity-btn" onclick="removeFromCart(${cartItem.id})">Remove</button>
            `
            cartItemsContainer.appendChild(cartItemDiv)
        })

        const totalPrice = cart.reduce((acc, item) => acc + item.price, 0)

        totalAmountContainer.textContent = `Total: ${totalPrice} €`
    }

    updateCartDisplay()

    window.removeFromCart = function (pokemonId) {
        const index = cart.findIndex(item => item.id === pokemonId)

        if (index !== -1) {
            cart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(cart))
            updateCartDisplay()
        }
    }
})
