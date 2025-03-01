import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import ClientDetails from "./pages/ClientDetails/ClientDetails";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/rm-portfolio/">
      <Header />
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="/client/:name" element={<ClientDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
