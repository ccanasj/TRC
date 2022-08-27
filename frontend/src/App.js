import React from "react"
import { Routes, Route } from "react-router-dom"
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Editor from "./components/pages/editor";
import Info from "./components/pages/info";
import Music from "./components/pages/music";
import XD from "./components/pages/XD";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import NotFound from "./components/pages/notFound";

let theme = createTheme({
  typography: {
    fontFamily: 'Trebuchet MS',
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='*' element={<NotFound />}></Route>
          <Route path="/" element={<Info />}></Route>
          <Route path="/edit" element={<Editor />}></Route>
          <Route path="/music" element={<Music />}></Route>
          <Route path="/XD" element={<XD />}></Route>
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
