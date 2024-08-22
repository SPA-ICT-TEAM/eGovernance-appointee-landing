import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Details } from "./Component/HomePage/AppointeeDetails";
import AppointeeHomePage from "./Component/HomePage/HomePage";
import { AppointeeLandingNav } from "./Component/HomePage/NavBar";
import { UserProvider } from "./Component/UserContext"; 
import "./index.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <AppointeeLandingNav />
        <Routes>
          <Route path="/" element={<AppointeeHomePage />} />
          <Route path="/appointee/:name" element={<Details />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
