import { Fragment } from "react/jsx-runtime";
import LoginPage from "./auth/loginforn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./Users/UserDashboard/Dashboard";
import BillingAll from "./Users/Billing/Billing";
import Conversations1 from "./Users/Conversations/Conversations1";
import Documentations from "./Users/Api/Documentation/Documentations";
import NotFound from "./Error/404Page";
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/billing" element={<BillingAll />} />
          <Route path="/conversation/start" element={<Conversations1 />} />
          <Route path="/api/documentation" element={<Documentations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
