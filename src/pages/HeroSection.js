import React, { useEffect, useState, useRef, useMemo } from 'react';

const HeroSection = ({ active = true, shouldDockPhone = false }) => {
  const [showContent, setShowContent] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [textGlow, setTextGlow] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const sectionRef = useRef();
  const heroContentRef = useRef();
  const phonesRef = useRef();

  // Moved from Homepage.js
  const textLines = [
    { text: "Introducing Lumeo", type: 'p', className: 'intro-text' },
    { text: "The world's first", type: 'h1' },
    { text: "AI social finance", type: 'h1' },
    { text: "sidekick", type: 'h1' },
  ];

  const simpleText = textLines.map((line, lineIndex) => {
    if (line.type === 'p') {
      return <p key={lineIndex} className={line.className}>{line.text}</p>;
    }
    return <h1 key={lineIndex}>{line.text}</h1>;
  });

  // Enhanced particle system with more particles for desktop
  const particleData = useMemo(() => {
    const particleCount = windowWidth > 768 ? 20 : 12;
    return [...Array(particleCount)].map((_, i) => ({
      id: i,
      width: Math.random() * 10 + 3,
      height: Math.random() * 10 + 3,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.2,
      translateY: -Math.random() * 40 - 15,
      transitionDelay: Math.random() * 1,
      transitionDuration: 1.5 + Math.random() * 1,
      animationDuration: 4 + Math.random() * 3,
      animationDelay: Math.random() * 3,
      pulseDelay: Math.random() * 2,
    }));
  }, [windowWidth]);

  // Use our own text lines for animation
  const textContent = simpleText;

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced mouse tracking for interactive effects
  useEffect(() => {
    let animationFrameId;
    
    const handleMouseMove = (e) => {
      if (!active || !sectionRef.current) return;
      
      animationFrameId = requestAnimationFrame(() => {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
        
        // Enhanced glow effect with distance calculation
        if (heroContentRef.current) {
          const textRect = heroContentRef.current.getBoundingClientRect();
          const textDistance = Math.sqrt(
            Math.pow(e.clientX - (textRect.left + textRect.width / 2), 2) +
            Math.pow(e.clientY - (textRect.top + textRect.height / 2), 2)
          );
          setTextGlow(textDistance < 300);
        }
      });
    };

    if (active && windowWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [active, windowWidth]);

  // Particle system
  useEffect(() => {
    if (!active) {
      setParticles([]);
    }
  }, [active]);

  // Ensure content is visible when section becomes active
  useEffect(() => {
    if (active) {
      const visibilityTimer = setTimeout(() => {
        if (heroContentRef.current) {
          heroContentRef.current.style.visibility = 'visible';
          heroContentRef.current.style.opacity = '1';
        }
      }, 100);
      
      return () => clearTimeout(visibilityTimer);
    }
  }, [active]);

  // Enhanced staggered animations
  useEffect(() => {
    if (active || isVisible) {
      setShowContent(false);
      setShowPhone(false);
      setCurrentLine(0);
      
      const resetTimer = setTimeout(() => {
        setShowContent(true);
        
        const lineTimer = setTimeout(() => setCurrentLine(1), 300);
        const lineTimer2 = setTimeout(() => setCurrentLine(2), 500);
        const lineTimer3 = setTimeout(() => setCurrentLine(3), 700);
        const lineTimer4 = setTimeout(() => setCurrentLine(4), 900);
        const phoneTimer = setTimeout(() => setShowPhone(true), 1200);

        return () => {
          [lineTimer, lineTimer2, lineTimer3, lineTimer4, phoneTimer].forEach(clearTimeout);
        };
      }, 50);

      return () => {
        clearTimeout(resetTimer);
      };
    } else {
      setShowContent(false);
      setShowPhone(false);
      setCurrentLine(0);
    }
  }, [active, isVisible]);

  const phonesDockedRight = shouldDockPhone;

  // Enhanced background with parallax
  const backgroundStyle = {
    background: active ? `
      radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
        rgba(253, 158, 0, 0.18) 0%, 
        rgba(249, 115, 22, 0.12) 30%,
        rgba(255, 244, 224, 0.95) 70%, 
        transparent 100%)
    ` : 'transparent',
    transition: 'background 0.5s ease',
    transform: `translateY(${scrollY * 0.1}px)`,
  };

  // Responsive breakpoints
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  return (
    <section
      ref={sectionRef}
      className="hero-section homepage-section"
      style={{
        width: '100vw',
        height: isMobile ? 'auto' : '100vh',
        minHeight: isMobile ? '100vh' : 'auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        justifyContent: isMobile ? 'center' : 'space-between',
        position: 'relative',
        background: 'transparent',
        padding: isMobile ? '60px 5%' : isTablet ? '40px 4%' : '0',
        margin: 0,
        overflow: 'hidden',
        ...backgroundStyle,
      }}
    >
      {/* Enhanced Floating Particles */}
      {particleData.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${active || isVisible ? 'animate' : ''}`}
          style={{
            position: 'absolute',
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            background: `linear-gradient(45deg, #f97316, #fbbf24)`,
            borderRadius: '50%',
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: (active || isVisible) ? particle.opacity : 0,
            transform: (active || isVisible) ? `translateY(${particle.translateY}px) scale(1)` : 'translateY(50px) scale(0)',
            transition: `all ${particle.transitionDuration}s cubic-bezier(0.23, 1, 0.32, 1) ${particle.transitionDelay}s`,
            animation: (active || isVisible) ? `
              float ${particle.animationDuration}s ease-in-out infinite ${particle.animationDelay}s,
              particlePulse 2s ease-in-out infinite ${particle.pulseDelay}s
            ` : 'none',
            zIndex: 0,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 10px rgba(249, 115, 22, 0.3)',
          }}
        />
      ))}

      {/* Background Gradient Animation */}
      <div
        className="bg-gradient-animation"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 30%, rgba(253, 158, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(249, 115, 22, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 60% 20%, rgba(251, 191, 36, 0.06) 0%, transparent 50%)
          `,
          animation: 'gradientShift 8s ease-in-out infinite',
          zIndex: -1,
        }}
      />

      {/* Left: Text */}
      <div
        ref={heroContentRef}
        className={`hero-content ${showContent ? 'hero-content-animate' : ''} ${textGlow ? 'text-glow' : ''}`}
        style={{
          flex: isMobile ? 'none' : 1,
          maxWidth: isMobile ? '100%' : '700px',
          width: isMobile ? '100%' : 'auto',
          paddingLeft: isMobile ? '0' : isTablet ? '4vw' : '6vw',
          paddingRight: isMobile ? '0' : '2vw',
          paddingTop: isMobile ? '0' : '48px',
          paddingBottom: isMobile ? '40px' : '80px',
          textAlign: isMobile ? 'center' : 'left',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: isMobile ? 'center' : 'flex-start',
          height: isMobile ? 'auto' : 'auto',
          transform: `translateY(${scrollY * 0.05}px)`,
          order: isMobile ? 1 : 0,
        }}
      >
        {textContent.map((line, index) => (
          <div
            key={index}
            className={`hero-line hero-line-${index + 1} ${currentLine >= index + 1 ? 'hero-line-visible' : ''}`}
            style={{
              opacity: currentLine >= index + 1 ? 1 : 0,
              transform: currentLine >= index + 1 ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15 + 0.1}s`,
              marginBottom: index === textContent.length - 1 ? 0 : 8,
              filter: textGlow ? 'drop-shadow(0 0 20px rgba(253, 158, 0, 0.4))' : 'none',
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
          flex: isMobile ? 'none' : '0 0 400px',
          maxWidth: isMobile ? '100%' : '400px',
          minWidth: isMobile ? '260px' : '300px',
          width: isMobile ? '100%' : 'auto',
          height: 'auto',
          display: 'flex',
          alignItems: isMobile ? 'center' : 'center',
          justifyContent: isMobile ? 'center' : phonesDockedRight ? 'flex-end' : 'center',
          position: 'relative',
          marginRight: isMobile ? '0' : isTablet ? '2vw' : 'calc(150px + 4vw)',
          marginTop: isMobile ? '0' : '0',
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          background: 'none',
          boxShadow: 'none',
          border: 'none',
          paddingTop: isMobile ? '0' : '20px',
          paddingBottom: isMobile ? '0' : '20px',
          transform: `translateY(${scrollY * -0.03}px)`,
          order: isMobile ? 2 : 1,
        }}
      >
        {/* Enhanced Glow with animation */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: phonesDockedRight ? 'translate(-50%, -50%) scale(0.5)' : 'translate(-50%, -50%) scale(1)',
          width: isMobile ? '350px' : '450px',
          height: isMobile ? '600px' : '700px',
          background: `
            radial-gradient(ellipse 60% 80%, #fd9e00 0%, #f97316 30%, rgba(249, 115, 22, 0.3) 60%, transparent 100%)
          `,
          filter: `blur(${isMobile ? '36px' : '48px'})`,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: (phonesDockedRight || !showPhone) ? 0 : isMobile ? 0.7 : 1,
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          animation: showPhone ? `
            randomGlowFloat 7s ease-in-out infinite,
            glowPulse 3s ease-in-out infinite
          ` : 'none',
        }} />

        {/* Phone image with enhanced animations */}
        <img
          src="/images/herosection.png"
          alt="Lumeo App Preview"
          style={{
            width: isMobile ? '260px' : isTablet ? '300px' : '350px',
            height: 'auto',
            aspectRatio: '526/1042',
            display: 'block',
            margin: phonesDockedRight ? '0 0 0 auto' : '0 auto',
            border: 'none',
            borderRadius: 0,
            // boxShadow: showPhone ? `
              // 0 25px 50px rgba(0, 0, 0, 0.15),
              // 0 0 30px rgba(253, 158, 0, 0.2)
            // ` : 'none',
            background: 'none',
            position: 'relative',
            zIndex: 2,
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: showPhone ? 
              (phonesDockedRight ? 'translateX(30vw) scale(1)' : 'translateX(0) scale(1)') : 
              'translateX(0) scale(0.8)',
            opacity: showPhone ? 1 : 0,
            objectFit: 'contain',
            animation: showPhone ? 'phoneFloat 6s ease-in-out infinite' : 'none',
          }}
        />

        {/* Additional floating elements around phone */}
        {showPhone && (
          <>
            <div className="floating-icon" style={{
              position: 'absolute',
              top: '15%',
              left: '5%',
              width: '35px',
              height: '35px',
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              borderRadius: '50%',
              zIndex: 3,
              animation: 'iconFloat1 4s ease-in-out infinite',
              boxShadow: '0 8px 20px rgba(251, 191, 36, 0.3)',
            }} />
            <div className="floating-icon" style={{
              position: 'absolute',
              top: '40%',
              right: '8%',
              width: '28px',
              height: '28px',
              background: 'linear-gradient(45deg, #f97316, #ea580c)',
              borderRadius: '50%',
              zIndex: 3,
              animation: 'iconFloat2 5s ease-in-out infinite',
              boxShadow: '0 6px 15px rgba(249, 115, 22, 0.3)',
            }} />
            <div className="floating-icon" style={{
              position: 'absolute',
              bottom: '25%',
              left: '10%',
              width: '32px',
              height: '32px',
              background: 'linear-gradient(45deg, #fd9e00, #f97316)',
              borderRadius: '30%',
              zIndex: 3,
              animation: 'iconFloat3 6s ease-in-out infinite',
              boxShadow: '0 7px 18px rgba(253, 158, 0, 0.3)',
            }} />
            <div className="floating-icon" style={{
              position: 'absolute',
              top: '65%',
              right: '15%',
              width: '25px',
              height: '25px',
              background: 'linear-gradient(45deg, #fbbf24, #fd9e00)',
              borderRadius: '40%',
              zIndex: 3,
              animation: 'iconFloat1 7s ease-in-out infinite 1s',
              boxShadow: '0 5px 12px rgba(251, 191, 36, 0.3)',
            }} />
          </>
        )}
      </div>

      <style jsx>{`
        .hero-section {
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hero-content {
          opacity: ${showContent ? 1 : 0};
          transform: translateX(${showContent ? 0 : -50}px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .text-glow {
          filter: drop-shadow(0 0 25px rgba(253, 158, 0, 0.4));
          transition: filter 0.4s ease;
        }

        .hero-content::before {
          content: '';
          position: absolute;
          top: -30px;
          left: -30px;
          right: -30px;
          bottom: -30px;
          background: radial-gradient(circle, rgba(253, 158, 0, 0.15) 0%, transparent 70%);
          opacity: ${textGlow ? 1 : 0};
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: -1;
          border-radius: 20px;
        }

        .hero-line {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 8px;
          background: linear-gradient(135deg, #fd9e00 0%, #f97316 50%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(253, 158, 0, 0.3));
        }

        .hero-line-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-line-1 { 
          transition-delay: 0.2s;
          animation: ${currentLine >= 1 ? 'slideInLeft 0.8s ease-out' : 'none'};
        }
        .hero-line-2 { 
          transition-delay: 0.4s;
          animation: ${currentLine >= 2 ? 'slideInLeft 0.8s ease-out 0.2s both' : 'none'};
        }
        .hero-line-3 { 
          transition-delay: 0.6s;
          animation: ${currentLine >= 3 ? 'slideInLeft 0.8s ease-out 0.4s both' : 'none'};
        }
        .hero-line-4 { 
          transition-delay: 0.8s;
          margin-bottom: 0;
          animation: ${currentLine >= 4 ? 'slideInLeft 0.8s ease-out 0.6s both' : 'none'};
        }

        .intro-text {
          font-size: ${isMobile ? '1.2rem' : isTablet ? '1.3rem' : '1.5rem'};
          font-weight: 400;
          background: linear-gradient(135deg, #fd9e00 0%, #f97316 50%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 18px;
          letter-spacing: 0.01em;
          position: relative;
          margin-top: ${isMobile ? '0' : '170px'};
          margin-left: ${isMobile ? '0' : '104px'};
          text-align: ${isMobile ? 'center' : 'left'};
          filter: drop-shadow(0 2px 4px rgba(253, 158, 0, 0.3));
        }

        .intro-text::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: ${isMobile ? '50%' : '0'};
          transform: ${isMobile ? 'translateX(-50%)' : 'none'};
          width: ${currentLine >= 1 ? '100%' : '0%'};
          height: 2px;
          background: linear-gradient(90deg, #f97316, #fbbf24);
          transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s;
        }

        .hero-content h1 {
          font-size: ${isMobile ? '2.2rem' : isTablet ? '2.8rem' : '3.2rem'};
          line-height: 1.1;
          font-weight: 800;
          background: linear-gradient(135deg, #fd9e00 0%, #f97316 50%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          letter-spacing: -0.01em;
          position: relative;
          overflow: hidden;
          margin-left: ${isMobile ? '0' : '104px'};
          text-align: ${isMobile ? 'center' : 'left'};
          filter: drop-shadow(0 2px 4px rgba(253, 158, 0, 0.3));
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
          75% { transform: translateY(-25px) rotate(270deg); }
        }

        @keyframes particlePulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes highlightPulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }

        @keyframes randomGlowFloat {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            filter: blur(48px);
          }
          25% {
            transform: translate(-48%, -52%) scale(1.1) rotate(-5deg);
            filter: blur(52px);
          }
          50% {
            transform: translate(-52%, -48%) scale(0.9) rotate(3deg);
            filter: blur(44px);
          }
          75% {
            transform: translate(-49%, -51%) scale(1.05) rotate(-2deg);
            filter: blur(50px);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            filter: blur(48px);
          }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(0.5deg); }
          66% { transform: translateY(-5px) rotate(-0.5deg); }
        }

        @keyframes iconFloat1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }

        @keyframes iconFloat2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        @keyframes iconFloat3 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-12px) rotate(90deg) scale(1.05); }
        }

        @keyframes gradientShift {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 5% !important;
            min-height: 100vh;
            height: auto;
          }

          .hero-content {
            text-align: center;
            align-items: center;
            padding: 0 !important;
            margin-bottom: 40px;
          }

          .intro-text {
            margin-left: 0 !important;
            margin-top: 0 !important;
          }

          .hero-content h1 {
            margin-left: 0 !important;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 1.8rem !important;
          }
          
          .intro-text {
            font-size: 1rem !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-section {
            padding: 40px 4%;
          }
        }

        @media (min-width: 1025px) {
          .hero-section {
            padding: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;