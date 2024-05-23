import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import "./App.css";
import AppRoutes from "./routes/Routes";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/toTop/toTop";
import BackToTopButton from "./components/Button/BackToTopButton/BackToTopButton";
import { JobProvider } from "./components/TopBar/JobContext";

function App() {
  useEffect(() => {
    document.title = "Home Mate App";
  }, []);

  return (
    <div className="app-wrapper">
      <Router>
        <JobProvider>
          <BackToTopButton />
          <ScrollToTop />
          <ConditionalTopBar />
          <AppRoutes />
          <ConditionalFooter />
        </JobProvider>
      </Router>
    </div>
  );
}

function ConditionalTopBar() {
  const location = useLocation();
  const hideTopBarPaths = ["/resetpwdstep2"];
  const shouldHideTopBar = hideTopBarPaths.includes(location.pathname);

  return shouldHideTopBar ? null : <TopBar />;
}

function ConditionalFooter() {
  const location = useLocation();
  const hideFooterPaths = ["/resetpwdstep2"];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return shouldHideFooter ? null : <Footer />;
}

export default App;
