import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';
import NavbarComponent from "./components/NavbarComponent";
import { Home, Sukses } from "./pages/Index.js";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <NavbarComponent />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>            
          <Route path='/sukses' element={<Sukses />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    )
  }
}
