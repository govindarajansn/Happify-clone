//used to display the navbar and its components
import React from "react";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  function validateForm(e) {
    var x = document.forms["myForm"]["search_query"].value;
    if (x === "") {
      setErrorMessage(true);
      e.preventDefault();
      return false;
    }
  }
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setErrorMessage(false);
    }, 3000);
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand ms-2" href="/">
            <h2>Music Database</h2>
          </a>
          <ul className="navbar-nav me-auto">
            <li className="nav-item ms-3">
              <div>
                <form
                  action="/searched_artist"
                  name="myForm"
                  method="GET"
                  onSubmit={validateForm}
                >
                  <input
                    type="text"
                    placeholder="Search artist"
                    name="search_query"
                  />
                  <button type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </form>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {errorMessage && (
        <Alert variant="warning" transition="Fade">
          Please enter the artist's name.
        </Alert>
      )}
    </>
  );
};

export default Navbar;
