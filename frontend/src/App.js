import React from "react"
import { Routes, Route } from "react-router-dom"
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Editor from "./components/pages/editor";
import Downloader from "./components/pages/downloader";
import Player from "./components/pages/player";
import XD from "./components/pages/XD";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import NotFound from "./components/pages/notFound";
import About from "./components/pages/about";

const theme = createTheme({
  typography: {
    "fontFamily": `"Bahnschrift", "Arial", "sans-serif"`,
    h1: {
      "fontFamily": `"MingLiU"`,
      "fontSize": "calc(10px + 2vmin)"
    },
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='*' element={<NotFound />}></Route>
          <Route path="/" element={<Downloader />}></Route>
          <Route path="/editor" element={<Editor />}></Route>
          <Route path="/player" element={<Player />}></Route>
          <Route path="/XD" element={<XD />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
