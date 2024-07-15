import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Components/Home/home";
import LoginForm from "./Components/userlogin";
import SignupForm from "./Components/usersign";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setname] = useState("");

  // Function to handle user sign-up
  const handleSigin = async (requestBody) => {
    const temp = {
      name: requestBody.name,
      email: requestBody.email,
      password: requestBody.password,
    };
    const result = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    });
    const result_json = await result.json();
    console.log(result_json);
    setIsSignUp(false); // Reset isSignUp state after successful sign-up
  };

  // Function to handle user login
  const handleLogin = async (email, password) => {
    const result = await fetch("http://localhost:3001/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: email,
        password: password,
      },
    });
    const result_json = await result.json();
    if (result.status === 404) {
      alert(result_json.msg);
      return;
    }
    setname(result_json.name);
    localStorage.setItem("token", result_json.token);
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // Function to handle sign-up link click
  const handleSignupClick = () => {
    setIsSignUp(true);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent border-bottom border-3 border-white text-white">
        <a className="navbar-brand text-bold text-light" href="#">TODLIFY</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            {isLoggedIn && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Welcome, {name}
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {/* Conditional rendering based on login state */}
      {isLoggedIn ? (
        <Home name={name} onLogout={handleLogout} />
      ) : (
        <div>
          {/* Conditional rendering based on isSignUp state */}
          {isSignUp ? (
            <SignupForm onSignup={handleSigin} />
          ) : (
            <LoginForm
              onLogin={handleLogin}
              onSignupClick={handleSignupClick}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
