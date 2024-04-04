// items.jsx

function handleResponse(response) {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
}

export async function getItems(category) {
    if (typeof(category) == "undefined") {
        return;
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
