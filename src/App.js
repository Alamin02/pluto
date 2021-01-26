import React from "react";
import 'antd/dist/antd.css';

import "./App.css";

import Slider from "./components/Slider";
import Navbar from "./components/navbar/Navbar";
import Feature from "./components/featured-products/feature";
import ProductList from "./components/product/ProductList";
import Footer from './components/footer/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <Slider />
      <Feature />
      <ProductList />
      <Footer />
    </div>
  );
}

export default App;
