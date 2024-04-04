import NavBar from "../components/NavBar/NavBar"
import { Outlet, redirect } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  if (search) {
    return redirect(`/search/${search}`)
  }
  return {};
}

export default function Root() {

    return (
      <>
        <NavBar></NavBar>
        <div className="spacer" style={{height: "64px"}}></div>
        <Outlet></Outlet>
      </>
    );
  }


  // import {useState, useEffect} from "react"
  // const [items, setItems] = useState([]);
  // function handleResponse(response) {
  //   if (!response.ok) throw Error(response.statusText);
  //   return response.json();
  // }

  // function handleError(error) {
  //   console.log(error);
  // }

  // function handleData(data) {
  //   let items_in = data.products;
  //   items_in = items_in.map((item) => <p key={item.id}>{item.title} {item.id} {item.category}</p>);
  //   setItems(items_in);
  // }


  // useEffect(() => {
  //   let ignoreStaleRequest = false;
  //   fetch("https://dummyjson.com/products")
  //   .then(handleResponse)
  //   .then((data) => handleData(data))
  //   .catch(handleError);
  //   return () => {
  //     ignoreStaleRequest = true;
  //   }
  // }, [])