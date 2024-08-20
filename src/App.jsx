import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Details } from "./Component/HomePage/AppointeeDetails";
import AppointeeHomePage from "./Component/HomePage/HomePage";
import { AppointeeLandingNav } from "./Component/HomePage/NavBar";
import { advisers } from "./Component/HomePage/Constant";
import "./index.css";
import { useState } from "react";

function App() {
  const [adviser] = useState(advisers);

  return (
    <Router>
      <AppointeeLandingNav />
      <Routes>
        <Route path="/" element={<AppointeeHomePage />} />
        <Route path="/appointee/:name" element={<Details adviser={adviser} />} />
      </Routes>
    </Router>
  );
}

export default App;
