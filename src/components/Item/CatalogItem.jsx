import { getDisplayName } from "../../routes/catalog"
import "src/css/catalog.css"
import { Link } from "react-router-dom"
import placeholder from "src/assets/placeholder.png"

export default function CatalogItem({ item }) {
    const category = getDisplayName(item.category)
    return (
        <div className="item">
            <Link to={`/products/${item.id}`}>
                <img className="itemImageSmall" src={placeholder}></img>
            </Link>
            <div className="itemInfo">
            <Link style={{display: "flex", justifyContent: "left", textAlign: "left"}} to={`/products/${item.id}`}>
                <p className="itemName">{item.title}</p>
            </Link>
                <p className="itemCategory">{category}</p>
                <p className="itemPrice">${item.price}</p>
            </div>
        </div>
    )
}