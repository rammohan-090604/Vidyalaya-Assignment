import React, { createContext, useState, useEffect } from 'react';

export const WindowWidthContext = createContext();

export const WindowWidthProvider = ({ children }) => {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  const handleResize = () => {
    const width = window.innerWidth;
    setIsSmallerDevice(width < 500);
  };

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};
