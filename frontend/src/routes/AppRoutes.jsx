import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Categories from "../components/Category/Categories";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import About from "../pages/About/About";
import Footer from "../components/Footer/Footer";
import Register from "../pages/Register/Register";
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import Safety from "../pages/Safety/Safety";
import Userrig from "../pages/Register/Userrig";
import CustomerLogin from "../pages/Login/CustomerLogin";
import WorkerLogin from "../pages/Login/WorkerLogin";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/userrig" element={<Userrig />} />
        <Route path="/customer-login" element={<CustomerLogin />}/>
        <Route path="/worker-login" element={<WorkerLogin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;