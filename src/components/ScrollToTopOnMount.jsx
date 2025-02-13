import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if it's a service page
    if (pathname.includes('/services/')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTopOnMount; 