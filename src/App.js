import React, { useEffect } from "react";

import "./App.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import AppRoutes from "./routes/Routes";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/toTop/toTop";
import BackToTopButton from "./components/Button/BackToTopButton/BackToTopButton";

function App() {
  useEffect(() => {
    document.title = "Home Mate App";
  }, []);

  return (
    <div className="app-wrapper">
      <Router>
        <BackToTopButton />
        <ScrollToTop />
        <ConditionalTopBar />
        <AppRoutes />
        <ConditionalFooter />
      </Router>
    </div>
  );
}

function ConditionalTopBar() {
  const location = useLocation();
  const hideTopBarPaths = ["/", "/signup"];
  const shouldHideTopBar = hideTopBarPaths.includes(location.pathname);

  return shouldHideTopBar ? null : <TopBar />;
}

function ConditionalFooter() {
  const location = useLocation();
  const hideFooterPaths = ["/", "/signup"];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return shouldHideFooter ? null : <Footer />;
}

export default App;
