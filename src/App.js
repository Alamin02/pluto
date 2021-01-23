
import React from 'react';
import 'antd/dist/antd.css';
import Features from './components/popular-products/Features'

import "antd/dist/antd.css";
import "./App.css";

import Slider from "./components/Slider.js";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div>

      <Features />

      <Navbar />
      <Slider />;

    </div>
  );
}

export default App;
