import { Fragment } from "react/jsx-runtime";
import LoginPage from "./auth/loginforn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./Users/UserDashboard/Dashboard";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
