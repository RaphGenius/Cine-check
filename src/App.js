import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import RandomMovie from "./pages/RandomMovie";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coup-de-coeur" element={<Favorite />} />
          <Route path="*" element={<Home />} />
          <Route path="/film-aleatoire" element={<RandomMovie />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;
