import {
    Link, Form, useLoaderData, useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import { categories } from "src/assets/data"
import { getItems } from "../api/items";
import CatalogItem from "../components/Item/CatalogItem";
import "src/css/catalog.css";

// -------------------- LOADER ----------------------------------------------------------------------]
export async function loader({ params, request }) {
    const url = new URL(request.url);
    const category = params.category.toLowerCase();
    if (isCategory(category)) {
        var items = await getItems(category);
        const name = getDisplayName(category);
        return {name: name, items: sortBy(items, params.rule)};
    }
    else if (category == "browse") {
        var items = await getItems(category);
        const name = "All"
        return {name: name, items: sortBy(items, params.rule)}
    }
    return {name: params.category, items: {total: 0}};
}


// --------- HELPER FUNCS -----------------------------------------------------------------------

// sort(list, func) takes a list and sorts by key in ascending order, reverse = true for descending
// input should not be the entire response body returned by API call, but the array of products
function sortBy(list, sort) {
    let key = "price"
    if (sort != "price-asc" && sort != "price-desc") return list;
    let new_list = list.sort((a, b) => {
        var x = a[key];
        var y = b[key];
        if (sort == "price-desc") {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0))
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })
    return new_list;
}

// isCategory compares to list of categories and returns true if input is found in categories
function isCategory(input) {
    return categories.some((category) => category.name == input.toLowerCase())
}

// getDisplayName gets the proper display name for a category based on input, should be used after isCategory
export function getDisplayName(input) {
    const category = categories.find(category => category.name == input.toLowerCase());
    return category ? category.displayName : null
}


// ------------------- COMPONENT ----------------------------------------------------------------------]
export default function Catalog() {
    const { name, items, search, p } = useLoaderData();
    const [page, setPage] = useState(p ? p : 1);
    const [sort, setSort] = useState("none");
    // option to change items per load, more relevant if we we're working with pages
    const [itemsPerPage, setItemsPerPage] = useState(15);

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
                <Form id="sort-by" onChange={(event) => { 
                        setSort(event.target.value);
                    }}>
                    <select>
                        <option value="default">Sort by</option>
                        <option value="price-asc">Price Low/High</option>
                        <option value="price-desc">Price High/Low</option>
                    </select>
                </Form>
            </div>
            {items.total != 0 ? (
                <div className="items">
                    {(sortBy(items.products, sort)).slice(0, ((page - 1) * itemsPerPage + itemsPerPage)).map((item) => {return (
                        <CatalogItem key={item.id} item={item}></CatalogItem>
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
            <div className="pageNavigation">
                {items.total != 0 &&
                    <p>You have viewed {(page) * itemsPerPage < items.total ? (page * itemsPerPage) : items.total} of {items.total} items</p>
                }
                { (page - 1) * itemsPerPage + itemsPerPage < items.total && (
                    <button onClick={() => {setPage(page + 1)}}>Load more</button>
                )}
            </div>
        </div>

    )
}