import React, { useEffect, useRef, useState } from 'react';
import './UnderstandSection.css';

const UnderstandSection = ({ active, isTransitioning, transitionType, transitionProgress = 0 }) => {
  // Only show background when active or during transitions
  const shouldShowBackground = active || (isTransitioning && (transitionType === 'expand-background' || transitionType === 'shrink-background'));
  const sectionRef = useRef(null);
  const [bgVisible, setBgVisible] = useState(false);
  
  // Calculate frame dimensions based on transition progress (reverse of MoneyTalks)
  const framePadding = transitionProgress ? 40 * transitionProgress : 0; // Start with 0 padding, increase to 40px
  const borderRadius = transitionProgress ? 36 * transitionProgress : 0; // Start with 0 radius, increase to 36px
  const scale = transitionProgress ? 1.5 - (0.5 * transitionProgress) : 1.5; // Scale from 1.5 to 1
  
  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if ('IntersectionObserver' in window) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          setBgVisible(entry.isIntersecting);
        },
        { threshold: 0.5 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    } else {
      setBgVisible(true);
    }
  }, []);

  return (
    <div className={`understand-section ${active ? 'active' : ''}`} ref={sectionRef}>
      {/* Frame container that grows during reverse transition */}
      <div
        className="understand-frame"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: `calc(100vw - ${framePadding * 2}px)`,
          height: `calc(100vh - ${framePadding * 2}px)`,
          maxWidth: '1800px',
          maxHeight: '1200px',
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden',
          boxShadow: transitionProgress 
            ? `0 ${4 * transitionProgress}px ${32 * transitionProgress}px rgba(0,0,0,${0.07 * transitionProgress})`
            : 'none',
          transition: transitionProgress ? 'none' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: shouldShowBackground ? 1 : -1,
          background: 'transparent',
          opacity: shouldShowBackground ? 1 : 0,
          visibility: shouldShowBackground ? 'visible' : 'hidden'
        }}
      >
        {/* Background image that fills the frame */}
        <div
          className="understand-background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: "url('/images/challengepic.PNG')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: `${borderRadius}px`,
            opacity: bgVisible ? 1 : 0,
            animation: bgVisible ? 'genzPopIn 0.55s cubic-bezier(0.4,0,0.2,1) both' : 'none',
          }}
        />
      </div>
      
      {/* Content overlay that adjusts during transition */}
      <div 
        className="understand-overlay"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: transitionProgress 
            ? `${80 - (40 * transitionProgress)}px ${80 - (40 * transitionProgress)}px`
            : '0 80px',
          transform: transitionProgress ? `scale(${1 - (0.1 * transitionProgress)})` : 'scale(1)',
          transition: transitionProgress ? 'none' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          opacity: shouldShowBackground ? 1 : 0,
          visibility: shouldShowBackground ? 'visible' : 'hidden'
        }}
      >
        <div className="understand-left">
          <h1 className="understand-title">
            Start your journey to financial freedom
          </h1>
          <p className="understand-desc">
            Millions of people will rely on Lumeo to reshape how they build wealth — through gamified saving, personalized AI, and the social money game that makes finance feel fun again.
          </p>
          <p className="understand-desc">
            Track what you earn, flex your savings, and get ahead for good.
          </p>
          <div className="expense-list">
            <div className="expense-item">
              <span className="expense-icon">🧾</span>
              <span className="expense-label">Bills</span>
              <span className="expense-amount">$295.65</span>
            </div>
            <div className="expense-item">
              <span className="expense-icon">🛒</span>
              <span className="expense-label">Transport</span>
              <span className="expense-amount">$54.32</span>
            </div>
            <div className="expense-item">
              <span className="expense-icon">🏦</span>
              <span className="expense-label">Bank charges</span>
              <span className="expense-amount">$23.99</span>
            </div>
          </div>
        </div>
        <div className="understand-right">
          <div className="budget-card">
            <h4>Budget</h4>
            <p className="budget-amount">
              $68.<span>70</span>
            </p>
            <p className="budget-limit">Left to spend of $500 limit</p>
            <div className="budget-timeline">
              <span>1 day to go</span>
              <span>$18.32 per day</span>
            </div>
            <div className="budget-progress-bar">
              <div style={{ width: '15%' }}></div>
            </div>
            <div className="budget-summary">
              <div className="summary-item">
                <p>$1,340.00</p>
                <span>Incoming</span>
              </div>
              <div className="summary-item">
                <p>$431.30</p>
                <span>Outgoing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes genzPopIn {
          0% {
            opacity: 0;
            transform: scale(0.7) rotate(-8deg);
          }
          70% {
            opacity: 1;
            transform: scale(1.08) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default UnderstandSection;