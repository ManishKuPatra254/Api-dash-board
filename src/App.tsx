import { Fragment } from "react/jsx-runtime";
import LoginPage from "./auth/loginforn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./Users/UserDashboard/Dashboard";
import BillingAll from "./Users/Billing/Billing";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/billing" element={<BillingAll />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
