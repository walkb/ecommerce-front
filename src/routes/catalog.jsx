import {
    Link, useLoaderData
} from "react-router-dom";
import { useState } from "react";
import { categories } from "src/assets/data"
import { getItems } from "../api/items";
import CatalogItem from "../components/Item/CatalogItem";
import "src/css/catalog.css";

// sortBy(list, func) takes a list and sorts by key in ascending order, reverse = true for descending
// input should be the entire response body returned by API call, not the array of products
function sortByKey(list, key, reverse) {
    // console.log(list.products)
    list.products = list.products.sort((a, b) => {
        var x = a[key];
        var y = b[key];
        if (reverse === true) {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0))
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })
    return list;
}



function isCategory(input) {
    return categories.some((category) => category.name == input.toLowerCase())
}

export function getDisplayName(input) {
    const category = categories.find(category => category.name == input.toLowerCase());
    return category ? category.displayName : null
}

export async function loader({ params }) {
    console.log(params)
    if (isCategory(params.category)) {
        const category = params.category.toLowerCase();
        var items = await getItems(category);
        const name = getDisplayName(category);
        if (params.rule) {
            items = sortByKey(params.rule);
        }
        // console.log(items)
        return {name: name, items: items};
    }
    return {name: params.category, items: {total: 0}};
}

export default function Catalog() {
    const { name, items, search } = useLoaderData();
    return (
        <div className="catalog">
            <div className="catalogInfo">
                <div>
                    {search ? (
                        <h1 className="categoryTitle">Search for "{name}"</h1>
                    ) : (
                        <h1 className="categoryTitle">{name}</h1>
                    )}
                    {items ? (
                        <p className="totalItems">({items.total})</p>
                    ) : <p>(0)</p>}
                </div>

            </div>
            {items.total != 0 ? (
                <div className="items">
                    {items.products.map((item) => {return (
                        <>
                            <CatalogItem item={item}></CatalogItem>
                        </>
                    )
                    })}
                </div>
            ) : (
                <>
                    {search ? (
                        <p className="noneMessage">No items found for "{name}"</p>
                    ): (
                        <p className="noneMessage">No items found for {name}</p>
                    )}
                </>
            )}
        </div>

    )
}