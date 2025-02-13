import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import TaxPlanning from './pages/TaxPlanning';
import TaxPrep from './pages/TaxPrep';
import CFOServices from './pages/CFOServices';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <ScrollToTopOnMount />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/tax-planning" element={<TaxPlanning />} />
        <Route path="/services/tax-prep" element={<TaxPrep />} />
        <Route path="/services/cfo-services" element={<CFOServices />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App; 