import React, { useEffect, useState, useRef, useMemo } from 'react';

const HeroSection = ({ animatedText = [], active = true, shouldDockPhone = false }) => {
  const [showContent, setShowContent] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [textGlow, setTextGlow] = useState(false);
  const sectionRef = useRef();
  const heroContentRef = useRef();
  const phonesRef = useRef();

  // Create static particle data to prevent recalculation on mouse movement
  const particleData = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      width: Math.random() * 8 + 4,
      height: Math.random() * 8 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.6 + 0.2,
      translateY: -Math.random() * 30 - 10,
      transitionDelay: Math.random() * 0.5,
      transitionDuration: 1 + Math.random() * 0.5,
      animationDuration: 3 + Math.random() * 2,
      animationDelay: Math.random() * 2,
    }));
  }, []);

  // Default animated text if none provided
  const defaultAnimatedText = [
    <span className="intro-text">Welcome to your financial future</span>,
    <h1>Take control of your <span className="highlight-text">money</span></h1>,
    <h1>with <span className="highlight-text">intelligent</span> insights</h1>,
    <h1>and <span className="highlight-text">smart</span> automation</h1>
  ];

  const textContent = animatedText.length > 0 ? animatedText : defaultAnimatedText;

  // Mouse tracking for interactive effects
  useEffect(() => {
    let animationFrameId;
    
    const handleMouseMove = (e) => {
      if (!active || !sectionRef.current) return;
      
      // Use requestAnimationFrame for smoother performance
      animationFrameId = requestAnimationFrame(() => {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
        
        // Add glow effect when mouse is near text (simplified)
        if (heroContentRef.current) {
          const textRect = heroContentRef.current.getBoundingClientRect();
          const textDistance = Math.sqrt(
            Math.pow(e.clientX - (textRect.left + textRect.width / 2), 2) +
            Math.pow(e.clientY - (textRect.top + textRect.height / 2), 2)
          );
          setTextGlow(textDistance < 200);
        }
      });
    };

    if (active) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [active]);

  // Particle system
  useEffect(() => {
    if (!active) return;

    // Clear existing particles when section becomes inactive
    if (!active) {
      setParticles([]);
    }
  }, [active]);

  // Ensure content is visible when section becomes active
  useEffect(() => {
    if (active) {
      // Force a small delay to ensure DOM is ready
      const visibilityTimer = setTimeout(() => {
        if (heroContentRef.current) {
          heroContentRef.current.style.visibility = 'visible';
          heroContentRef.current.style.opacity = '1';
        }
      }, 100);
      
      return () => clearTimeout(visibilityTimer);
    }
  }, [active]);

  // Start animations when section becomes active
  useEffect(() => {
    if (active) {
      // Reset states first, then start animations
      setShowContent(false);
      setShowPhone(false);
      setCurrentLine(0);
      
      // Small delay to ensure reset is applied, then start animations
      const resetTimer = setTimeout(() => {
        setShowContent(true);
        
        const lineTimer = setTimeout(() => setCurrentLine(1), 200);
        const lineTimer2 = setTimeout(() => setCurrentLine(2), 400);
        const lineTimer3 = setTimeout(() => setCurrentLine(3), 600);
        const lineTimer4 = setTimeout(() => setCurrentLine(4), 800);
        const phoneTimer = setTimeout(() => setShowPhone(true), 1000);

        return () => {
          [lineTimer, lineTimer2, lineTimer3, lineTimer4, phoneTimer].forEach(clearTimeout);
        };
      }, 30);

      return () => {
        clearTimeout(resetTimer);
      };
    } else {
      setShowContent(false);
      setShowPhone(false);
      setCurrentLine(0);
    }
  }, [active]);

  // Use shouldDockPhone prop to control phone docking
  const phonesDockedRight = shouldDockPhone;

  const backgroundStyle = {
    background: active ? `
      radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
        rgba(253, 158, 0, 0.15) 0%, 
        rgba(249, 115, 22, 0.08) 30%,
        rgba(255, 244, 224, 0.95) 70%, 
        transparent 100%)
    ` : 'transparent',
    transition: 'background 0.4s ease',
  };

  return (
    <section
      ref={sectionRef}
      className="hero-section homepage-section"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        background: 'transparent',
        padding: 0,
        margin: 0,
        overflow: 'hidden',
      }}
    >
      {/* Floating Particles */}
      {particleData.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${active ? 'animate' : ''}`}
          style={{
            position: 'absolute',
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            background: '#f97316',
            borderRadius: '50%',
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: active ? particle.opacity : 0,
            transform: active ? `translateY(${particle.translateY}px) scale(1)` : 'translateY(50px) scale(0)',
            transition: `all ${particle.transitionDuration}s cubic-bezier(0.23, 1, 0.32, 1) ${particle.transitionDelay}s`,
            animation: active ? `float ${particle.animationDuration}s ease-in-out infinite ${particle.animationDelay}s` : 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* Left: Text */}
      <div
        ref={heroContentRef}
        className={`hero-content ${showContent ? 'hero-content-animate' : ''} ${textGlow ? 'text-glow' : ''}`}
        style={{
          flex: 1,
          maxWidth: '700px',
          paddingLeft: '6vw',
          paddingRight: '2vw',
          paddingTop: '48px',
          paddingBottom: '80px',
          textAlign: 'left',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: 'auto',
        }}
      >
        {textContent.map((line, index) => (
          <div
            key={index}
            className={`hero-line hero-line-${index + 1} ${currentLine >= index + 1 ? 'hero-line-visible' : ''}`}
            style={{
              opacity: currentLine >= index + 1 ? 1 : 0,
              transform: currentLine >= index + 1 ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1 + 0.1}s`,
              marginBottom: index === textContent.length - 1 ? 0 : 8,
              filter: textGlow ? 'drop-shadow(0 0 20px rgba(253, 158, 0, 0.3))' : 'none',
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Right: Phone + Glow */}
      <div
        ref={phonesRef}
        style={{
          flex: '0 0 480px',
          maxWidth: '480px',
          minWidth: '340px',
          height: 'auto',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: phonesDockedRight ? 'flex-end' : 'center',
          position: 'relative',
          marginRight: 'calc(208px + 4vw)',
          transition: 'justify-content 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          background: 'none',
          boxShadow: 'none',
          border: 'none',
          paddingTop: '48px',
        }}
      >
        {/* Centered Glow, animates as phone moves */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: phonesDockedRight ? 'translate(-50%, -50%) scale(0.5)' : 'translate(-50%, -50%) scale(1)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, #fd9e00 0%, #f97316 60%, transparent 100%)',
          filter: 'blur(48px)',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: phonesDockedRight ? 0 : 1,
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          animation: 'randomGlowFloat 7s ease-in-out infinite',
        }} />
        {/* Phone image, no border, no box-shadow, no background */}
        <img
          src="/images/stats!.png"
          alt="Stats"
          style={{
            width: '100%',
            maxWidth: '340px',
            maxHeight: '90vh',
            height: 'auto',
            display: 'block',
            margin: phonesDockedRight ? '0 0 0 auto' : '0 auto',
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            background: 'none',
            position: 'relative',
            zIndex: 2,
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: phonesDockedRight ? 'translateX(30vw)' : 'translateX(0)',
            objectFit: 'contain',
          }}
        />
      </div>

      <style>{`
        .hero-section {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          position: relative;
          overflow: hidden;
          padding: 0 10%;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .hero-particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          animation: heroParticleFloat 4s ease-in-out infinite;
        }

        .hero-content {
          flex-basis: 48%;
          z-index: 3;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          height: 100%;
          padding-left: 2vw;
          opacity: ${showContent ? 1 : 0};
          transform: translateX(${showContent ? 0 : -50}px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .text-glow {
          filter: drop-shadow(0 0 20px rgba(253, 158, 0, 0.3));
          transition: filter 0.3s ease;
        }

        .hero-content::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(circle, rgba(253, 158, 0, 0.1) 0%, transparent 70%);
          opacity: ${textGlow ? 1 : 0};
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }

        .hero-line {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 8px;
        }

        .hero-line-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-line-1 { transition-delay: 0.1s; }
        .hero-line-2 { transition-delay: 0.2s; }
        .hero-line-3 { transition-delay: 0.3s; }
        .hero-line-4 { transition-delay: 0.4s; margin-bottom: 0; }

        .intro-text {
          font-size: 1.5rem;
          font-weight: 400;
          color: #6d3b2c;
          margin-bottom: 18px;
          letter-spacing: 0.01em;
          position: relative;
          margin-top: 170px;
          margin-left: 104px;
        }

        .intro-text::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: ${currentLine >= 1 ? '100%' : '0%'};
          height: 2px;
          background: linear-gradient(90deg, #f97316, #fbbf24);
          transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s;
        }

        .hero-content h1 {
          font-size:3.2rem;
          line-height: 1;
          font-weight: 800;
          color: #4a2a1c;
          margin: 0;
          letter-spacing: -0.01em;
          position: relative;
          overflow: hidden;
          margin-left: 104px;
        }

        .highlight-text {
          background: linear-gradient(135deg, #fd9e00, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
          animation: highlightPulse 3s ease-in-out infinite;
        }

        .hero-content h1::before {
          /* shimmer highlight removed */
        }

        @keyframes heroParticleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }

        @keyframes highlightPulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }

        @keyframes randomGlowFloat {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            filter: blur(48px);
            opacity: 1;
          }
          15% {
            transform: translate(-48%, -52%) scale(1.04) rotate(-2deg);
            filter: blur(52px);
            opacity: 0.95;
          }
          30% {
            transform: translate(-52%, -48%) scale(0.97) rotate(1deg);
            filter: blur(44px);
            opacity: 1;
          }
          50% {
            transform: translate(-51%, -49%) scale(1.07) rotate(-1deg);
            filter: blur(56px);
            opacity: 0.92;
          }
          70% {
            transform: translate(-49%, -51%) scale(0.93) rotate(2deg);
            filter: blur(50px);
            opacity: 1;
          }
          85% {
            transform: translate(-53%, -47%) scale(1.03) rotate(-2deg);
            filter: blur(46px);
            opacity: 0.97;
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            filter: blur(48px);
            opacity: 1;
          }
        }

        @media (max-width: 900px) {
          .hero-section {
            flex-direction: column;
            height: auto;
            min-height: 100vh;
            padding: 40px 5%;
          }

          .hero-content {
            padding-left: 0;
            align-items: center;
            text-align: center;
            flex-basis: auto;
            margin-bottom: 32px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;