// ========================================
// CART
// ========================================

let cart = [];


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addToCart(product) {

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    // Open cart automatically
    openCart();
}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    // Calculate total quantity
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    // Update navbar count
    cartCount.textContent = totalQuantity;


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty 🛒
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    // Display cart products
    cartItems.innerHTML = cart.map(item => {

        return `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                >

                <div class="cart-item-info">

                    <h4>${item.title}</h4>

                    <p>
                        ₹${item.price}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="decreaseQuantity(${item.id})">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${item.id})">
                            +
                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");


    // Calculate total price
    const totalPrice = cart.reduce(
        (total, item) =>
            total + (Number(item.price) * item.quantity),
        0
    );


    cartTotal.textContent =
        `₹${totalPrice.toFixed(2)}`;
}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(id) {

    const product = cart.find(
        item => item.id === id
    );

    if (product) {

        product.quantity++;

        updateCart();
    }
}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(id) {

    const product = cart.find(
        item => item.id === id
    );

    if (!product) return;


    product.quantity--;


    // Remove product when quantity becomes 0
    if (product.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );
    }


    updateCart();
}


// ========================================
// OPEN CART
// ========================================

function openCart() {

    document
        .getElementById("cart-sidebar")
        .classList.add("active");

    document
        .getElementById("cart-overlay")
        .classList.add("active");
}


// ========================================
// CLOSE CART
// ========================================

function closeCart() {

    document
        .getElementById("cart-sidebar")
        .classList.remove("active");

    document
        .getElementById("cart-overlay")
        .classList.remove("active");
}