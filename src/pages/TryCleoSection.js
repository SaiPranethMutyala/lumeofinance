import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './TryCleoSection.css';

const TryCleoSection = ({ active = true }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!active) {
      setIsVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [active]);

  const handleGetStartedClick = () => {
    if (/iPhone/i.test(navigator.userAgent)) {
      window.location.href = 'https://apps.apple.com/us/app/lumeo-social-finance/id6747216538';
    } else {
      setShowModal(true);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="try-cleo-section homepage-section"
      style={{
        background: 'linear-gradient(135deg, #FFF4E0 0%, #fdfaf6 50%, #FFF4E0 100%)',
        minHeight: '70vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '60px 0',
        boxSizing: 'border-box',
      }}
    >
      {/* Animated Background Accent */}
      <div 
        className={`try-cleo-bg-accent ${active && isVisible ? 'animate' : ''}`}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(circle, #f97316 0%, #FFF4E0 70%)',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          pointerEvents: 'none',
          borderRadius: '50%',
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.5) rotate(-180deg)',
          transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
          ...(active && isVisible && {
            opacity: 0.32,
            transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
          })
        }}
      />

      {/* Main Content */}
      <div 
        className={`try-cleo-content ${active && isVisible ? 'animate' : ''}`}
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: active && isVisible ? 1 : 0,
          transform: active && isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
          transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s',
        }}
      >
        <h1 className={`try-cleo-title${active && isVisible ? ' try-cleo-fadein' : ''}`} style={{
          animationDelay: '0.1s',
          animationDuration: '0.7s',
        }}>
          Try Lumeo now
        </h1>
        <p className={`try-cleo-desc${active && isVisible ? ' try-cleo-fadein' : ''}`} style={{
          animationDelay: '0.3s',
          animationDuration: '0.7s',
        }}>
          Join the revolution of finance with <br />Lumeo— the future of all things money.
        </p>
        <button
          className={`try-cleo-btn${active && isVisible ? ' try-cleo-fadein' : ''}`.replace('try-cleo-btntry-cleo-fadein', 'try-cleo-btn try-cleo-fadein')}
          style={{
            animationDelay: '0.5s',
            animationDuration: '0.7s',
          }}
          onClick={handleGetStartedClick}
        >
          Get Started Now
        </button>
      </div>

      {/* Modal for QR code using React Portal */}
      {showModal && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          pointerEvents: 'auto',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#fff',
            borderRadius: '18px',
            padding: '40px 32px',
            minWidth: '320px',
            minHeight: '320px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{marginBottom: '24px', color: '#F97316', fontWeight: 800, fontSize: '2rem'}}>Scan to download now!</h2>
            <img src="/images/qr.png" alt="Lumeo App QR Code" style={{width: 180, height: 180, borderRadius: '16px', marginBottom: '18px', objectFit: 'cover', background: '#eee'}} />
            <button style={{marginTop: 8, background: '#F97316', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer'}} onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>,
        document.body
      )}

      <style jsx>{`
        @keyframes titleGlow {
          0%, 100% {
            text-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
          }
          50% {
            text-shadow: 
              0 6px 30px rgba(249, 115, 22, 0.5),
              0 0 25px rgba(249, 115, 22, 0.3);
          }
        }

        @keyframes titleFloat {
          0%, 100% { 
            transform: translateY(0) rotateX(0deg);
          }
          50% { 
            transform: translateY(-8px) rotateX(2deg);
          }
        }

        @keyframes subtitlePulse {
          0%, 100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-3px) scale(1.02);
          }
        }

        @keyframes wordReveal {
          0% {
            opacity: 0;
            transform: translateY(30px) rotateX(90deg) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px) rotateX(0deg) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
          }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes buttonPulse {
          0%, 100% { 
            transform: translateY(0) scale(1);
            box-shadow: 
              0 8px 25px rgba(253, 158, 0, 0.18),
              0 4px 15px rgba(252, 186, 54, 0.13),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
          50% { 
            transform: translateY(-2px) scale(1.02);
            box-shadow: 
              0 12px 35px rgba(253, 158, 0, 0.25),
              0 6px 20px rgba(252, 186, 54, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes tryCleoFadeIn {
          0% { opacity: 0; transform: translateY(40px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .try-cleo-fadein {
          animation: tryCleoFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        @media (max-width: 900px) {
          .try-cleo-section {
            padding: 32px 0 32px 0;
          }
          .try-cleo-bg-accent {
            width: 320px;
            height: 220px;
          }
          .try-cleo-content h2 {
            font-size: 2.2rem;
          }
          .try-cleo-content p {
            font-size: 1.1rem;
          }
          .try-cleo-btn {
            font-size: 1rem;
            padding: 12px 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default TryCleoSection;