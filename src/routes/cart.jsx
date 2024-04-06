import { delCart, getCartFromStorage, updateCart } from "../api/cart";
import { useLoaderData } from "react-router-dom";
import ItemImage from "src/components/Item/ItemImage";
import ItemInfo from "src/components/Item/ItemInfo";
import "src/css/Cart.css"
import { useState } from "react";


// -------------------- LOADER ----------------------------------------------------------------------]
export async function loader() {
    return getCartFromStorage();
}

export default function Cart() {
    const [cart, setCart] = useState(getCartFromStorage());
    var num_items = cart.totalProducts != 0 ? cart.totalQuantity : 0

    function handleQuantity(quantity, item) {
        updateCart(item, quantity).then((bool) => {
            if (bool) {
                setCart(getCartFromStorage());
            }
        })
    }

    return (
        <>
        <h3 className="header">My Cart ({num_items})</h3>
        <div className="cartPage">
        {cart.totalProducts > 0 ? (
            <div className="cartItems">
                {cart.products.map((item) => {
                    return (
                        <div className="cartItem">
                            <div className="cartItemInfo">
                                <ItemImage></ItemImage>
                                <ItemInfo item={item}></ItemInfo>
                            </div>
                            <div className="quantityControls">
                                <button className="quantityButton" onClick={() => {handleQuantity(item.quantity - 1, item)}}>-</button>
                                <p className="quantity">{item.quantity}</p>
                                <button className="quantityButton" onClick={() => {handleQuantity(item.quantity + 1, item)}}>+</button>
                            </div>
                        </div>
                    )
                })}
                <button onClick={() => {
                    delCart();
                    setCart(getCartFromStorage());
                }}>Empty Cart</button>
            </div>
        ) : (
            <p>No items in your cart!</p>
            )}
            <div className="checkout">
                <h3>Order Summary</h3>
                <p>Sub Total: ${cart.discountedTotal}</p>
                <p>Shipping: $4.99</p>
                <p>Sales Tax: ?</p>
                <p>Total: ${cart.discountedTotal + 4.99}</p>
                <button className="checkoutButton">Checkout</button>
            </div>
        </div>
        </>
    )
}