import React, { useState, useEffect, Suspense, lazy  } from 'react';
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
import VancouverTax from './pages/VancouverTax';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CheckListPage from './pages/2024CheckListPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Remove artificial delay
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <ScrollToTopOnMount />
      <Navbar />
      <Suspense fallback={<Loading />}> {/* Fallback while loading */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vancouver-tax-services" element={<VancouverTax />} />
          <Route path="/services/tax-planning" element={<TaxPlanning />} />
          <Route path="/services/tax-prep" element={<TaxPrep />} />
          <Route path="/services/cfo-services" element={<CFOServices />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/2024-checklist" element={<CheckListPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App; 