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
          width: `calc(100% - ${framePadding * 2}px)`,
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
          key={bgVisible ? 'popin-on' : 'popin-off'}
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
            opacity: 1,
            filter: active ? 'blur(0px)' : 'blur(12px)',
            boxShadow: bgVisible ? '0 12px 48px 0 rgba(0,0,0,0.18)' : 'none',
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
          visibility: shouldShowBackground ? 'visible' : 'hidden',
          animation: active ? 'overlayPopIn 0.7s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
        }}
      >
        <div className="understand-left" style={{
          animation: active ? 'overlayChildPopIn 0.7s 0.25s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
        }}>
          <h1 className="understand-title" style={{
            animation: active ? 'leftTitlePopIn 0.9s 0.28s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
            display: 'block',
            textShadow: active ? '0 4px 24px rgba(0,0,0,0.18), 0 1px 0 #fff' : 'none',
          }}>
            Start your journey to financial freedom
          </h1>
          <p className="understand-desc" style={{
            animation: active ? 'leftDescFadeUp 0.6s 0.38s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
            display: 'block',
          }}>
            Millions of people will rely on Lumeo to reshape how they build wealth — through gamified saving, personalized AI, and the social money game that makes finance feel fun again.
          </p>
          <p className="understand-desc" style={{
            animation: active ? 'leftDescFadeUp 0.6s 0.46s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
            display: 'block',
          }}>
            Track what you earn, flex your savings, and get ahead for good.
          </p>
          <div className="expense-list" style={{
            animation: active ? 'expenseListSlideIn 0.7s 0.56s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
            display: 'block',
          }}>
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
        <div className="understand-right" style={{
          animation: active ? 'overlayChildPopIn 0.7s 0.4s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
        }}>
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
        @keyframes bgFadeIn {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes overlayPopIn {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.96);
          }
          60% {
            opacity: 1;
            transform: translateY(-8px) scale(1.04);
          }
          80% {
            opacity: 1;
            transform: translateY(2px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes overlayChildPopIn {
          0% {
            opacity: 0;
            transform: translateY(32px) scale(0.96);
          }
          60% {
            opacity: 1;
            transform: translateY(-4px) scale(1.03);
          }
          80% {
            opacity: 1;
            transform: translateY(1px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes leftTitlePopIn {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.7) rotate(-8deg);
            text-shadow: none;
            letter-spacing: 0.02em;
          }
          50% {
            opacity: 1;
            transform: translateY(-10px) scale(1.18) rotate(4deg);
            text-shadow: 0 8px 32px rgba(0,0,0,0.22), 0 2px 0 #fff;
            letter-spacing: 0.08em;
          }
          70% {
            opacity: 1;
            transform: translateY(4px) scale(0.96) rotate(-2deg);
            text-shadow: 0 2px 8px rgba(0,0,0,0.12), 0 1px 0 #fff;
            letter-spacing: 0.01em;
          }
          85% {
            opacity: 1;
            transform: translateY(-2px) scale(1.04) rotate(1deg);
            text-shadow: 0 4px 16px rgba(0,0,0,0.16), 0 1px 0 #fff;
            letter-spacing: 0.04em;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
            text-shadow: 0 2px 8px rgba(0,0,0,0.10), 0 1px 0 #fff;
            letter-spacing: 0em;
          }
        }
        @keyframes leftDescFadeUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes expenseListSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-48px) scale(0.96);
          }
          60% {
            opacity: 1;
            transform: translateX(6px) scale(1.04);
          }
          80% {
            opacity: 1;
            transform: translateX(-2px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default UnderstandSection;