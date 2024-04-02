import NavBar from "../components/NavBar/NavBar"
import Carousel from "../components/Carousel/Carousel"
import {useState, useEffect} from "react"
import Showcase from "../components/Showcase";

export default function Root() {
  const [items, setItems] = useState([]);

  function handleResponse(response) {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
  }

  function handleError(error) {
    console.log(error);
  }

  function handleData(data) {
    let items_in = data.products;
    items_in = items_in.map((item) => <p key={item.id}>{item.title} {item.id} {item.category}</p>);
    setItems(items_in);
  }


  useEffect(() => {
    let ignoreStaleRequest = false;
    fetch("https://dummyjson.com/products")
    .then(handleResponse)
    .then((data) => handleData(data))
    .catch(handleError);
    return () => {
      ignoreStaleRequest = true;
    }
  }, [])

    return (
      <>
        <NavBar></NavBar>
        <div className="spacer" style={{height: "64px"}}></div>
        <Carousel delayTime={3000} transitionTime={1000} panels={3}></Carousel>
        <Showcase title={"Featured"}></Showcase>
        {items}
        <button className="dark">Shop now</button>
      </>
    );
  }
  

  // REQUIRES: none
// MODIFIES: none
// EFFECTS: returns list of all items
// Used primarily for developer purposes, as pagination is ideal.
// export async function getAllItems() {
//   fetch('https://dummyjson.com/products')
//   .then(res => res.json())
//   .then(data => {
//       const items = data.map(item => {
//           console.log(item)
//           return item
//       })
//   });
// }