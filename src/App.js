import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Coins from "./components/Coins";
import Header from "./components/Header";
import Home from "./components/Home";
import Exchanges from "./components/Exchanges";
import CoinDetails from "./components/CoinDetails";
import ErrorComponent from "./components/ErrorComponent";
import "./app.css";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/coins" element={<Coins />}/>
        <Route path="/exchanges" element={<Exchanges />}/>
        <Route path="/coin/:id" element={<CoinDetails />}/>
        <Route path="*" element={<ErrorComponent />}/>
      </Routes>
      <Footer/>
    </Router>   
  );
}
export default App;
