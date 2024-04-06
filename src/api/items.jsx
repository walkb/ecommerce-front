import { handleResponse } from "./api";

// items.jsx handles outbound API calls related to fetching item details


// function getItems(category)
// REQUIRES: category is a valid string
// EFFECTS: makes API call to database and retrieves all items in the database by returning a Promise
// **NOTE: We are calling all items in the database because there are only 100 items in the database.
//         This could theoretically become a concern if we had too much data in the database
//         but could be alleviated by only requesting the data (i.e. title, price) we need at the time.
export async function getItems(category) {
    if (typeof(category) == "undefined") {
        return;
    }
    if (category == "browse") {
        return new Promise((resolve, reject) => {
            fetch("https://dummyjson.com/products/?limit=0")
            .then(handleResponse)
            .then(data => resolve(data))
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/products/category/${category}/?limit=0`)
        .then(handleResponse)
        .then(data => resolve(data))
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}


// function searchItems(query)
// REQUIRES: query is a valid string
// EFFECTS: makes an API call using {query} as a search query and returns a Promise containing data
export async function searchItems(query) {
    if (typeof(query) == "undefined") {
        return;
    }
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/products/search/?q=${query}&limit=0`)
        .then(handleResponse)
        .then(data => resolve(data))
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}


export async function getItemById(id) {
    if (typeof(id) == "undefined") {
        return;
    }
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/products/${id}`)
        .then(handleResponse)
        .then(data => resolve(data))
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}
