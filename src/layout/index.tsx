import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Qusetions from "../pages/questions";
import Home from "../pages/home";
import Result from "../pages/result";
import React from "react";

function layout() {
  return (
    <Router>
      {/* <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/questions">Qusetions</Link>
          <Link to="/result">Result</Link>
        </nav>
      </div> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/questions" element={<Qusetions />}></Route>
        <Route path="/result" element={<Result />}></Route>
      </Routes>
    </Router>
  );
}

export default layout;
