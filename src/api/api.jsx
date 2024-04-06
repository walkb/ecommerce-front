// api.jsx handles basic functions for outbound api calls


// function handleResponse(response)
// REQUIRES: response is a response from an API call
// EFFECTS: returns json of response, else throws error if response returns negative
export function handleResponse(response) {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
}
