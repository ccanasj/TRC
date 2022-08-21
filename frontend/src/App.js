import React from "react"
import { Routes, Route } from "react-router-dom"
import './App.css';

import Editor from "./components/pages/editor";
import Info from "./components/pages/info";
import Music from "./components/pages/music";
import XD from "./components/pages/XD";
import NavBar from "./components/navBar";
import NotFound from "./components/pages/notFound";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound />}></Route>
        <Route path="/" element={<Info />}></Route>
        <Route path="/edit" element={<Editor />}></Route>
        <Route path="/music" element={<Music />}></Route>
        <Route path="/XD" element={<XD />}></Route>
      </Routes>
    </div>
  );
}

export default App;
