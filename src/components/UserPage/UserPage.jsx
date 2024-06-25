import React from "react";
import { useSelector } from "react-redux";

function UserPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
    </div>
  );
}

export default UserPage;
