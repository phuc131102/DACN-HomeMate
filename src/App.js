import React from "react";

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes/Routes";
import TopBar from "./components/TopBar/TopBar";

function App() {
  return (
    <Router>
      <TopBar />
      <AppRoutes />
    </Router>
  );
}

export default App;
