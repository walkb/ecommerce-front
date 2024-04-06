import { handleResponse } from "./api";

// cart.jsx handles functions that deal with user cart

// function getCartId()
// EFFECTS: returns 0 if cartId doesn't exist, otherwise returns cartId
// **NOTE: If the cart API was functional, we could always check to ensure the cart hadn't expired, etc.
//         however for now, we'll just assume that carts do not expire.
function getCartId() {
    if (localStorage.getItem("cartId") == null) {
        return 0;
    }
    return localStorage.getItem("cartId");
}

export function delCart() {
    localStorage.removeItem("cartId");
    localStorage.removeItem("cart");
}

function setCartId(cartId) {
    localStorage.setItem("cartId", cartId);
}

export function getCartFromStorage() {
    if (getCartId() != 0) {
        return JSON.parse(localStorage.getItem("cart"))
    }
    return {totalProducts : 0}
}

function storeCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// We actually don't want to store what the API gives us, since it's not modifying data.
// Set quantity of item to itemQuantity and update cart
function updateCartHelper(item_in, itemQuantity) {
    let cart = getCartFromStorage();
    let item = cart.products.find((item) => {return item.id == item_in.id})
    if (item) {
        let difference = itemQuantity - item.quantity
        cart.totalQuantity += itemQuantity - item.quantity;
        item.quantity = itemQuantity;
        // adding or removing item
        cart.total += difference * item.price;
        cart.discountedTotal += difference * (item_in.price - (item_in.price * item_in.discountPercentage / 100).toFixed(2));
    }
    else {
        item_in.quantity = itemQuantity;
        cart.products.push(item_in);
        cart.totalProducts += 1;
        cart.totalQuantity += itemQuantity;
        cart.total += item_in.price * itemQuantity;
        cart.discountedTotal += item_in.price - (item_in.price * item_in.discountPercentage / 100).toFixed(2)
    }
    console.log(cart);
    storeCart(cart);
}

// function newCart()
// REQUIRES: user has no valid cart in session, itemId is valid item id
// EFFECTS: simulates a POST request to API and returns true upon setting cart data, storing the ID in session
// **NOTE:  As we are not using login services (or modifying real data), userId is 
//          always going to be 1.
async function newCart(itemId, quantity) {
    // console.log(itemId, quantity)
    return new Promise((resolve, reject) => {
        fetch("https://dummyjson.com/carts/add", {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: 1,
                products: [
                    {
                    id: itemId,
                    quantity: quantity
                    }
                ]
            })
        })
        .then(handleResponse)
        .then(data => {
            console.log(data);
            storeCart(data);
            setCartId(1);
            resolve(true);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        })
    })
}

// function updateCart(id, quantity)
// REQUIRES: id is a valid item id, quantity >= 0
// EFFECTS: edits product in existing cart and simulates POST request
//          returning data response
export async function updateCart(item, quantity_in) {
    // sanitize input, just in case.
    let quantity = quantity_in;
    let itemId = item.id;
    if (quantity_in < 0) {
        quantity = 0;
    }
    item.quantity = quantity;
    // If user doesn't have a cart
    if (getCartId() == 0) {
        return newCart(item.id, quantity);
    }
    var cartId = getCartId();
    // User has a cart, so let's make an API call to merge
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/carts/${cartId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                merge: true,
                products: [{
                    id: {itemId},
                    quantity: {quantity}
                }]
            })
        })
        .then(handleResponse)
        .then(data => {
            // storeCart(data);
            updateCartHelper(item, quantity)
            resolve(true);
        })
        .catch(error => {
            console.log(error);
            reject(false);
        })
    })
}