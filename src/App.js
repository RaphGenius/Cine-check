import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coup-de-coeur" element={<Favorite />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;