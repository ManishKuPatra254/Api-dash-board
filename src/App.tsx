import { Fragment } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
