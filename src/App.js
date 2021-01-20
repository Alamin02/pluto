import "antd/dist/antd.css";
import "./App.css";

import Slider from "./components/Slider.js";
import Navbar from "./components/Navbar";
import Feature from "./components/feature_products/feature";

function App() {
  return (
    <div>
      <Navbar />
      <Slider />
      <Feature />
    </div>
  );
}

export default App;
