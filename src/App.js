import React from "react";
import 'antd/dist/antd.css';

import "./App.css";

import Slider from "./components/Slider";
import Navbar from "./components/navbar/Navbar";
import Feature from "./components/featured-products/FeatureProducts";
import ProductList from "./components/product/ProductList";


function App() {
  return (
    <div>
      <Navbar />
      <Slider />
      <Feature />
      <ProductList />
    </div>
  );
}

export default App;
