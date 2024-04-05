import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40vh"}}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
      <Link to={"/"}>
        <button style={{margin: "24px"}}>Get back to safety.</button>
      </Link>
    </div>
  );
}