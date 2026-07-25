import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibilityAndProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', toggleVisibilityAndProgress);
    return () => window.removeEventListener('scroll', toggleVisibilityAndProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={scrollToTop}
        className="relative group p-3 rounded-full glass-panel border border-slate-700/80 text-slate-200 hover:text-primary transition-all duration-300 shadow-2xl hover:scale-110 flex items-center justify-center bg-dark-bg/80 backdrop-blur-xl"
        title="Scroll to Top"
      >
        <svg className="w-11 h-11 transform -rotate-90 pointer-events-none absolute">
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="text-slate-800"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="text-primary transition-all duration-150"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        <FiArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform text-slate-200 group-hover:text-primary relative z-10" />
      </button>
    </div>
  );
};

export default ScrollToTop;
