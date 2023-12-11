import React, { useState } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Routes from "./routes/Routes";

function App() {
  const [user, setUser] = useState(null);
  function logOut() {
    setUser(null);
    Navigate("/");
  }
  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        {user && (
          <Link to="/job" style={{ padding: 5 }}>
            Job
          </Link>
        )}
        <span> | </span>
        {!user && (
          <Link to="/login" style={{ padding: 5 }}>
            Login
          </Link>
        )}
        {!user && (
          <Link to="/signup" style={{ padding: 5 }}>
            Signup
          </Link>
        )}
        {user && (
          <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
            Logout
          </span>
        )}
      </nav>
      <Routes setUser={setUser} user={user} />
    </Router>
  );
}

export default App;
