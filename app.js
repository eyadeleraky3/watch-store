class Product {
    constructor(id, name, price, quantity,image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image = image;

    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}

const shoppingCart = new ShoppingCart();

const products = [
    new Product(1, 'Rolex Watch', 5, 10,'R.jpeg'),
    new Product(2, 'Olp Watch', 2, 20,'OIP.jpeg'),
    new Product(3, 'Huawei Sport', 2.5, 15,'huawei.jpg'),
];

function renderProducts() {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="100">
        <p>${product.name}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <input type="number" min="0" value="" id="quantity-${product.id}">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productItem);
    });
}


function removeFromCart(productId) {
    shoppingCart.removeItem(productId);
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    cartItems.innerHTML = '';
    shoppingCart.items.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.id);

        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = `Total: $${shoppingCart.getTotalPrice().toFixed(2)}`;
}

function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value, 10);
    quantityInput.value = '0';

    if (quantity <= 0) {
        return;
    }




    const product = products.find(p => p.id === productId);
    if (product) {
        const item = new Product(product.id, product.name, product.price, quantity);
        shoppingCart.addItem(item);
        renderCart();
    }
}

function checkout() {
    alert('Thank you for shopping with us!\nYour order total is $' + shoppingCart.getTotalPrice().toFixed(2));
    shoppingCart.items = [];
    renderCart();
}

renderProducts();
renderCart();
