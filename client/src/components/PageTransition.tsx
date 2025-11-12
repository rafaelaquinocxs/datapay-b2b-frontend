import React, { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
  duration?: number; // em milissegundos
}

export default function PageTransition({ children, duration = 300 }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade in após montar o componente
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity ${duration === 300 ? "duration-300" : duration === 500 ? "duration-500" : "duration-300"} ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
      {children}
    </div>
  );
}

