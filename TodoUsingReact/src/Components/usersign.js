import React, { useState } from "react";

const SignupForm = ({ onSignup }) => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupErrors, setSignupErrors] = useState({});

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      setSignupErrors({
        name: !signupData.name ? "name is required" : "",
        email: !signupData.email ? "Email is required" : "",
        password: !signupData.password ? "Password is required" : "",
        confirmPassword: !signupData.confirmPassword
          ? "Confirm password is required"
          : "",
      });
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setSignupErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    // Proceed with sign-up
    const requestBody = {
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
    };
    onSignup(requestBody);
  };

  return (
    <div className="card">
      <div className="card-header">Sign Up</div>
      <div className="card-body">
        <form onSubmit={handleSignupSubmit}>
          <div className="mb-3">
            <label htmlFor="signupName" className="form-label">
              Name
            </label>
            <input
              type="name"
              className={`form-control ${signupErrors.name && "is-invalid"}`}
              id="signupName"
              name="name"
              value={signupData.name}
              onChange={handleSignupChange}
            />
            {signupErrors.name && (
              <div className="invalid-feedback">{signupErrors.name}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${signupErrors.email && "is-invalid"}`}
              id="signupEmail"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
            />
            {signupErrors.email && (
              <div className="invalid-feedback">{signupErrors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="signupPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                signupErrors.password && "is-invalid"
              }`}
              id="signupPassword"
              name="password"
              value={signupData.password}
              onChange={handleSignupChange}
            />
            {signupErrors.password && (
              <div className="invalid-feedback">{signupErrors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                signupErrors.confirmPassword && "is-invalid"
              }`}
              id="confirmPassword"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
            />
            {signupErrors.confirmPassword && (
              <div className="invalid-feedback">
                {signupErrors.confirmPassword}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
