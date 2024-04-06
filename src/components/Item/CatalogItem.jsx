import { getDisplayName } from "../../routes/catalog"
import "src/css/catalog.css"
import { Link } from "react-router-dom"
import ItemImage from "src/components/Item/ItemImage"
import ItemInfo from "src/components/Item/ItemInfo"

export default function CatalogItem({ item }) {
    const category = getDisplayName(item.category)
    return (
        <div className="item">
            <Link to={`/products/${item.id}`}>
                <ItemImage container={'catalog'} stock={item.stock}></ItemImage>
            </Link>
            <ItemInfo container={'catalog'} isProductPage={false} item={item} category={category}></ItemInfo>
        </div>
    )
}