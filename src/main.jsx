import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import ClientDetails from "./pages/ClientDetails/ClientDetails";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="client/:name" element={<ClientDetails />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
