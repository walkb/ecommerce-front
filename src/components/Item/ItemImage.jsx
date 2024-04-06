import placeholder from "src/assets/placeholder.png"

export default function ItemImage({stock}) {
    return (
        <>
            {(stock == 0) ? (
                <img className="itemImage soldOut" src={placeholder}></img>
            ) : (
                <img className="itemImage" src={placeholder}></img>
            )}
        </>
    )
}