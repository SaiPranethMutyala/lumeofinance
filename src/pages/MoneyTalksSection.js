import React, { useEffect, useRef, useState } from 'react';

const MoneyTalksSection = ({ active, isTransitioning, transitionType, transitionProgress = 0 }) => {
  // Only show background when active or during transitions
  const shouldShowBackground = active || (isTransitioning && (transitionType === 'expand-background' || transitionType === 'shrink-background'));
  
  // Calculate frame dimensions based on transition progress
  const framePadding = transitionProgress ? 40 - (40 * transitionProgress) : 40; // Start with 40px padding, reduce to 0
  const borderRadius = transitionProgress ? 36 - (36 * transitionProgress) : 36; // Start with 36px radius, reduce to 0
  const scale = transitionProgress ? 1 + (0.5 * transitionProgress) : 1; // Scale from 1 to 1.5
  
  // Animation for cleo talks
  const [contentVisible, setContentVisible] = useState(false);
  const [wasVisible, setWasVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if ('IntersectionObserver' in window) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setContentVisible(true);
            setWasVisible(true);
          } else {
            setContentVisible(false);
          }
        },
        { threshold: 0.7 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    } else {
      setContentVisible(true);
      setWasVisible(true);
    }
  }, []);

  let contentClass = 'money-talks-content';
  if (contentVisible) contentClass += ' money-talks-content-animate-in';
  else if (wasVisible) contentClass += ' money-talks-content-animate-out';

  return (
    <div className="money-talks-section homepage-section" ref={sectionRef} style={{
      scrollSnapAlign: 'start',
      minHeight: '100vh',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      boxSizing: 'border-box',
    }}>
      {/* Frame container that shrinks during transition */}
      <div
        className="money-talks-frame"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: `calc(100% - ${framePadding * 2}px)`,
          height: `calc(100vh - ${framePadding * 2}px)`,
          maxWidth: '1800px',
          maxHeight: '1200px',
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden',
          boxShadow: transitionProgress 
            ? `0 ${4 - (4 * transitionProgress)}px ${32 - (32 * transitionProgress)}px rgba(0,0,0,${0.07 - (0.07 * transitionProgress)})`
            : '0 4px 32px rgba(0,0,0,0.07)',
          transition: transitionProgress ? 'none' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: shouldShowBackground ? 1 : -1,
          background: 'linear-gradient(135deg, #ffb347 0%, #ffcc80 100%)', // orange fallback background
          opacity: shouldShowBackground ? 1 : 0,
          visibility: shouldShowBackground ? 'visible' : 'hidden'
        }}
      >
        {/* Background image that fills the frame */}
        <div
          className="money-talks-background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: "url('/images/Moneytalksback.PNG')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: `${borderRadius}px`,
            opacity: contentVisible ? 1 : 0,
            transformOrigin: 'bottom right',
            transform: contentVisible ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(40px)',
            transition: 'opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
        
        {/* Content overlay */}
        <div 
          className={contentClass}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: contentVisible ? 'translateY(-50%)' : 'translateY(40px)',
            padding: '0 80px',
            zIndex: 2,
            width: '100%',
            boxSizing: 'border-box',
            opacity: contentVisible ? 1 : 0,
            transition: 'opacity 0.45s 0.08s cubic-bezier(0.4,0,0.2,1), transform 0.45s 0.08s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'left',
            marginLeft: '-40px',
          }}>
            <h2>Budgets got <h2>
              </h2>Cancelled.</h2>
            <h2>Lumeo replaced it</h2>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes boxyExpand {
          0% {
            opacity: 0;
            transform: scale(0.08, 0.3);
          }
          70% {
            opacity: 1;
            transform: scale(1.08, 0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default MoneyTalksSection;