import React, { useState } from "react";

const LoginForm = ({ onLogin, onSignupClick }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!loginData.email || !loginData.password) {
      setLoginErrors({
        email: !loginData.email ? "Email is required" : "",
        password: !loginData.password ? "Password is required" : "",
      });
      return;
    }
    // Proceed with login
    //console.log("Login data:", loginData);
    onLogin(loginData.email, loginData.password);
  };

  return (
    <div className="card">
      <div className="card-header">Login</div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${loginErrors.email && "is-invalid"}`}
              id="loginEmail"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            {loginErrors.email && (
              <div className="invalid-feedback">{loginErrors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${loginErrors.password && "is-invalid"}`}
              id="loginPassword"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
            {loginErrors.password && (
              <div className="invalid-feedback">{loginErrors.password}</div>
            )}
          </div>
          <button
            type="submit"
            onClick={handleLoginSubmit}
            className="btn btn-primary me-2"
          >
            Login
          </button>
          <button
            type="submit"
            onClick={onSignupClick}
            className="btn btn-primary"
          >
            signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
