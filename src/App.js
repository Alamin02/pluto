import "antd/dist/antd.css";
import "./App.css";

import Slider from "./components/Slider.js";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Slider />;
    </div>
  );
}

export default App;
