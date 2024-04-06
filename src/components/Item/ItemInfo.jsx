import { Link } from "react-router-dom"

export default function ItemInfo({item, isProductPage, category}) {
    // initialize rating to 0
    var stars = [0, 0, 0, 0, 0];
    if (typeof(item) == "undefined") {
        return (
            <p>Loading...</p>
        )
    } else {
        for (let i = 0; i < Math.floor(item.rating); i++) {
            stars[i] = 1;
        }
    }
    return (
        <div className="itemInfo">
            {(item.stock <= 5 && item.stock > 0) && (
                <p className="stock default-font" style={{color: "orange"}}>Only {item.stock} left!</p>
            )}
            {(item.stock == 0) && (
                <p className="stock default-font" style={{color: "orange"}}>Sold out</p>
            )}
            {!isProductPage ? (
                <Link style={{display: "flex", justifyContent: "left", textAlign: "left"}} to={`/products/${item.id}`}>
                    <p className="itemName">{item.title}</p>
                </Link>
            ) : (
                <p className="itemName">{item.title}</p>
            )}
                <p className="itemCategory">{category}</p>
                {/* Check for discount or out of stock or low stock */}
                {/* For demonstration purposes, all discounts below 10 will be ignored */}
                { item.discountPercentage >= 10.00 ? (
                    <>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <p className="itemPrice">${(item.price - item.price * (item.discountPercentage / 100)).toFixed(2)}</p>
                            <p className="itemPrice old" 
                            style={{marginLeft: "8px", textDecoration: "line-through", color: "gray"}}>
                                ${item.price}</p>
                        </div>
                        <p className="discount" style={{color: "red"}}>
                            {item.discountPercentage}% Off
                        </p>
                    </>
                ) :
                <p className="itemPrice">${(item.price).toFixed(2)}</p>
            }
            {isProductPage && (
                <>
                    <div className="stars">
                        {stars.map((star, index) => {
                            return (star == 0 ? <p key={index}>&#9734;</p> : <p key={index}>&#9733;</p>)
                        })}
                        <p className="rating">({item.rating})</p>
                    </div>
                    <>
                        <p className="descriptionHeader">Description</p>
                        <p className="description">{item.description}</p>
                    </>
                </>
            )}
            </div>
    )
}