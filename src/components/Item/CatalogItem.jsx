import { getDisplayName } from "../../routes/catalog"
import "src/css/catalog.css"
import placeholder from "src/assets/placeholder.png"

export default function CatalogItem({ item }) {
    const category = getDisplayName(item.category)
    return (
        <div className="item">
            <img className="itemImageSmall" src={placeholder}></img>
            <div className="itemInfo">
                <p className="itemName">{item.title}</p>
                <p className="itemCategory">{category}</p>
                <p className="itemPrice">${item.price}</p>
            </div>
        </div>
    )
}