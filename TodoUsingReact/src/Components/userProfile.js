import React from "react";

function UserProfile({ userName, onLogout }) {
  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default UserProfile;
