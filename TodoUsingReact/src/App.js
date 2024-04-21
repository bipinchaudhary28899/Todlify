import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Components/Home/home";
import LoginForm from "./Components/userlogin";
import SignupForm from "./Components/usersign";
import { useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setname] = useState();

  // Function to handle user login
  const handleSigin = async (requestBody) => {
    // Perform login logic here
    //setIsLoggedIn(true);
    const temp = {
      name: requestBody.name,
      email: requestBody.email,
      password: requestBody.password,
    };
    const result = await fetch("http://localhost:3001/signup", {
      method: "POST", // Specify the HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Specify the content type
        // username: "test@gmail.com", // Your custom header (e.g., Authorization)
        // password: "12345",
        // Add more headers if needed
      },
      body: JSON.stringify(temp),
    });
    const result_json = await result.json();
    console.log(result_json);
    setIsSignUp(false); // Reset isSignUp state after successful login
  };
  const handleLogin = async (email, password) => {
    // Perform login logic here
    // console.log("login", email, password);
    const result = await fetch("http://localhost:3001/signin", {
      method: "POST", // Specify the HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Specify the content type
        username: email, // Your custom header (e.g., Authorization)
        password: password,
        // Add more headers if needed
      },
    });
    const result_json = await result.json();
    if (result.status === 404) {
      alert(result_json.msg);
      return;
    }
    // console.log(result_json);
    setname(result_json.name);
    localStorage.setItem("token", result_json.token);
    setIsLoggedIn(true);
    //setIsSignUp(false); // Reset isSignUp state after successful login
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // Function to handle sign-up link click
  const handleSignupClick = () => {
    setIsSignUp(true);
  };
  return (
    <div className="container">
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
