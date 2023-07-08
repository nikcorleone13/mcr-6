import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:resId" element={<Restaurant />} />
      </Routes>
    </>
  );
}

export default App;
