import './App.css';
import AppNavbar from './camponents/AppNavbar/AppNavbar.jsx';
import './i18n.jsx';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';

import { sendVisit } from "./Api/api.jsx";

import Home from './camponents/Home/Home.jsx';
import AboutUs from './camponents/About Us/About.jsx';
import Contact from './camponents/Contact/ContactModal.jsx';
import Product from './camponents/Product/Product.jsx';
import Login from "./AdminPenal/login.jsx";
import Dashboard from "./AdminPenal/sidebar.jsx";

function AppWrapper() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const hasVisited = useRef(false); // ✅ Prevent duplicate sendVisit

  useEffect(() => {
    if (!hasVisited.current) {
      sendVisit();
      hasVisited.current = true;
    }
  }, []);

  useLayoutEffect(() => {
    const hiddenRoutes = ['/admin', '/dashboard'];
    setShowNavbar(!hiddenRoutes.includes(location.pathname));
  }, [location]);

  return (
    <div>
      {showNavbar && <AppNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
