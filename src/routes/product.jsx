import { getDisplayName } from "src/routes/catalog"
import "src/css/product.css"
import { Link, useLoaderData } from "react-router-dom"
import ItemImage from "src/components/Item/ItemImage"
import ItemInfo from "src/components/Item/ItemInfo"
import { getItemById } from "../api/items"
import { useState } from "react"
import { updateCart } from "../api/cart"

// -------------------- LOADER ----------------------------------------------------------------------]
export async function loader({ params }) {
    // const url = new URL(request.url);
    const id = params.productId;
    var item = await getItemById(id);
    return item;
}

// ---------------- ROUTE -------------------------------------------------------------------------]

export default function ProductPage() {
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const item = useLoaderData();
    const category = getDisplayName(item.category);

    function handleQuantity(q) {
        if (q < 0 || q > item.stock) {
            return;
        }
        else setQuantity(q);
    }
    
    function handleCart() {
        updateCart(item, quantity).then((response) =>
            {
                if (response) {
                    setAdded(true);
                }
            }
        )
    }

    return (
        <div className="product">
            <Link to={`/products/${item.id}`}>
                <ItemImage stock={item.stock}></ItemImage>
            </Link>
                <div>
                    <ItemInfo isProductPage={true} item={item} category={category}></ItemInfo>
                    {/* <ItemControls></ItemControls> */}
                {added == false ? (
                    <>
                        <div className="quantityControls">
                            <button className="quantityButton" onClick={() => {handleQuantity(quantity - 1)}}>-</button>
                            <p className="quantity">{quantity}</p>
                            <button className="quantityButton" onClick={() => {handleQuantity(quantity + 1)}}>+</button>
                        </div>
                        <button className="addButton" onClick={() => {handleCart()}}>Add to cart</button>
                    </>
                    ) : (
                        <div>
                            <p style={{marginTop: "20px"}}>Successfully added to your cart!</p>
                        </div>
                    )}
                    
                </div>
        </div>
    )
}