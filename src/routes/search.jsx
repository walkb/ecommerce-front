import { getItems, searchItems } from "../api/items";
import { categories } from "../assets/data";
import { getDisplayName } from "./catalog";

function isCategory(input) {
    return categories.some((category) => category.name == input.toLowerCase())
}

export async function loader({ params }) {
    // console.log(params);
    const query = params.query;
    var items, name;
    if (isCategory(query)) {
        items = await getItems(query);
        name = getDisplayName(query);
    }
    else {
        items = await searchItems(query);
        name = query.toLowerCase();
    }
    return {name: name, items: items, search: true};
}