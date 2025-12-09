import React, { useEffect, useState } from 'react';
const ScrollProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setWidth((scrolled / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-1 bg-blue-600 z-[1000]" style={{ width: `${width}%` }} />;
};
export default ScrollProgress;