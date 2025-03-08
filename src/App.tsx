import { Fragment } from "react/jsx-runtime";
import LoginPage from "./auth/loginforn";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
