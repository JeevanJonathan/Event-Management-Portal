import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import Vendor from "./components/vendor/Vendor";
import About from "./components/About";
import Contact from "./components/Contact";
import Booking from "./components/booking/Booking";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CheckOut from "./components/checkout/CheckOut";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<Vendor />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}
