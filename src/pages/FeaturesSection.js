import React, { useEffect, useState, useRef } from 'react';
import AnimatedSavingsGauge from './AnimatedSavingsGauge';
import AnimatedStatsGraph from './AnimatedStatsGraph';
// Mock components for demonstration

const FeaturesSection = ({ active = true, className = '' }) => {
  const [showContent, setShowContent] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showGauge, setShowGauge] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [screenSize, setScreenSize] = useState('desktop');
  const sectionRef = useRef();

  // Screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('mobile');
      else if (width < 768) setScreenSize('tablet');
      else if (width < 1024) setScreenSize('laptop');
      else setScreenSize('desktop');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Particle system (only on larger screens for performance)
  useEffect(() => {
    if (!active || screenSize === 'mobile') return;

    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 60 + 30,
    });

    const particleCount = screenSize === 'tablet' ? 10 : 20;
    const initialParticles = Array.from({ length: particleCount }, createParticle);
    setParticles(initialParticles);

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        opacity: particle.opacity - 0.002,
      })).filter(p => p.opacity > 0));
    };

    const interval = setInterval(animateParticles, 50);
    const addParticle = setInterval(() => {
      setParticles(prev => [...prev, createParticle()]);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(addParticle);
    };
  }, [active, screenSize]);

  // Mouse tracking (only on desktop)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current && screenSize === 'desktop') {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    if (active && screenSize === 'desktop') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [active, screenSize]);

  // Animation timing
  useEffect(() => {
    if (active) {
      setShowContent(true);
      setTimeout(() => setShowCards(true), 300);
      setTimeout(() => setShowGauge(true), 600);
    } else {
      setShowContent(false);
      setShowCards(false);
      setShowGauge(false);
    }
  }, [active]);

  const getResponsiveStyles = () => {
    const baseStyles = {
      padding: screenSize === 'mobile' ? '40px 4%' : 
               screenSize === 'tablet' ? '60px 4%' : '80px 5%',
      minHeight: screenSize === 'mobile' ? '80vh' : '100vh',
      gap: screenSize === 'mobile' ? '30px' : 
           screenSize === 'tablet' ? '40px' : 
           screenSize === 'laptop' ? '60px' : '100px',
    };
    
    return baseStyles;
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <div 
      ref={sectionRef}
      className={`features-section ${className} ${active ? 'active' : ''}`}
      style={{
        padding: responsiveStyles.padding,
        minHeight: responsiveStyles.minHeight,
      }}
    >
      {/* Floating Particles - Hidden on mobile */}
      {screenSize !== 'mobile' && (
        <div className="particles-container">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                background: `hsl(${particle.hue}, 70%, 60%)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Background Shapes - Only on desktop */}
      {screenSize === 'desktop' && (
        <div className="bg-shapes">
          <div className="shape shape-1" style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotate(${mousePosition.x * 45}deg)`
          }} />
          <div className="shape shape-2" style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px) rotate(${mousePosition.y * 60}deg)`
          }} />
          <div className="shape shape-3" style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * -10}px) rotate(${mousePosition.x * -30}deg)`
          }} />
        </div>
      )}

      <div 
        className={`features-layout ${showContent ? 'features-layout-animate' : ''}`}
        style={{ gap: responsiveStyles.gap }}
      >
        <div className={`features-text ${showContent ? 'features-text-animate' : ''}`}>
          <h2>
            <span className="text-word">The</span>
            <span className="text-word highlight-word">future</span>
            <span className="text-word">of</span>
            <span className="text-word">finance</span>
            <span className="text-word">right</span>
            <span className="text-word">in</span>
            <span className="text-word">your</span>
            <span className="text-word">pocket</span> 
          </h2>
        </div>
        
        <div className={`features-grid ${showCards ? 'features-grid-animate' : ''}`}>
          <div className={`card image-card-1 ${showCards ? 'card-animate' : ''}`} style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
            <img src="/images/homepagetopleft.PNG" alt="Smart Tracking" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            <div className="card-overlay" style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
              <div className="card-content" style={{ position: 'relative', zIndex: 3, padding: '30px' }}>
                <h3>Smart Tracking</h3>
                <p>AI-powered expense categorization</p>
              </div>
            </div>
          </div>
          
          { (screenSize === 'laptop' || screenSize === 'desktop') && (
            <div className="card-wrapper">
              <AnimatedSavingsGauge active={showGauge} />
            </div>
          )}
          
          { (screenSize === 'laptop' || screenSize === 'desktop') && (
            <div className="card-wrapper">
              <AnimatedStatsGraph active={active} />
            </div>
          )}
          
          <div className={`card image-card-2 ${showCards ? 'card-animate' : ''}`} style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
            <img src="/images/homepagetopright.PNG" alt="Instant Insights" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            <div className="card-overlay" style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
              <div className="card-content" style={{ position: 'relative', zIndex: 3, padding: '30px' }}>
                <h3>Instant Insights</h3>
                <p>Real-time financial analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .features-section {
          text-align: left;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: transparent;
          opacity: ${active ? 1 : 0.8};
          transform: translateY(${active ? 0 : 20}px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          animation: particleFloat 3s ease-in-out infinite;
        }

        .bg-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .shape-1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(253, 158, 0, 0.1), rgba(249, 115, 22, 0.05));
          top: 10%;
          right: 10%;
          animation: shapeFloat 8s ease-in-out infinite;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, rgba(51, 102, 255, 0.1), rgba(102, 153, 255, 0.05));
          bottom: 20%;
          left: 5%;
          animation: shapeFloat 6s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.05));
          top: 50%;
          left: 20%;
          animation: shapeFloat 10s ease-in-out infinite;
        }

        .features-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 3;
          opacity: ${showContent ? 1 : 0.8};
          transform: translateX(${showContent ? 0 : -10}px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .features-text {
          flex: 1 1 40%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          opacity: ${showContent ? 1 : 0.8};
          transform: translateY(${showContent ? 0 : 10}px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .features-text h2 {
          font-size: ${screenSize === 'mobile' ? '2rem' :
                       screenSize === 'tablet' ? '2.5rem' :
                       screenSize === 'laptop' ? '3rem' : '4rem'};
          color: #fd9e00;
          line-height: 1.1;
          font-weight: 800;
          margin: 0;
          position: relative;
          overflow: hidden;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 4px rgba(55,55,55,0.15);
        }

        .text-word {
          display: inline-block;
          margin-right: 0.5rem;
          opacity: ${showContent ? 1 : 0};
          transform: translateY(${showContent ? 0 : 20}px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .text-word:nth-child(1) { transition-delay: 0.1s; }
        .text-word:nth-child(2) { transition-delay: 0.2s; }
        .text-word:nth-child(3) { transition-delay: 0.3s; }
        .text-word:nth-child(4) { transition-delay: 0.4s; }
        .text-word:nth-child(5) { transition-delay: 0.5s; }
        .text-word:nth-child(6) { transition-delay: 0.6s; }
        .text-word:nth-child(7) { transition-delay: 0.7s; }
        .text-word:nth-child(8) { transition-delay: 0.8s; }

        .highlight-word {
          background: linear-gradient(135deg, #fd9e00, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .highlight-word::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: ${showContent ? '100%' : '0%'};
          height: 3px;
          background: linear-gradient(90deg, #fd9e00, #f97316);
          transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s;
        }

        .features-grid {
          flex: 1 1 60%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: ${screenSize === 'mobile' ? '15px' :
                screenSize === 'tablet' ? '20px' : '30px'};
          height: ${screenSize === 'mobile' ? '320px' :
                   screenSize === 'tablet' ? '400px' :
                   screenSize === 'laptop' ? '500px' : '600px'};
          opacity: ${showCards ? 1 : 0.8};
          transform: translateX(${showCards ? 0 : 10}px) scale(${showCards ? 1 : 0.98});
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card, .card-wrapper {
          border-radius: ${screenSize === 'mobile' ? '20px' : '30px'};
          overflow: hidden;
          opacity: ${showCards ? 1 : 0.8};
          transform: scale(${showCards ? 1 : 0.95}) translateY(${showCards ? 0 : 10}px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .card-wrapper {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: stretch;
          height: 100%;
          width: 100%;
        }

        .card {
          // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1));
          display: flex;
          align-items: flex-end;
          padding: ${screenSize === 'mobile' ? '15px' : '30px'};
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card:hover .card-overlay {
          opacity: 1;
        }

        .card-content h3 {
          color: white;
          font-size: ${screenSize === 'mobile' ? '1.1rem' : '1.5rem'};
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .card-content p {
          color: rgba(255, 255, 255, 0.9);
          font-size: ${screenSize === 'mobile' ? '0.85rem' : '1rem'};
          margin: 0;
        }

        .card:hover, .card-wrapper:hover {
          transform: scale(1.02) translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .image-card-1, .image-card-2 {
          background-size: cover;
          background-position: center;
          background-color: #667eea;
        }

        .image-card-1 { transition-delay: 0.1s; }
        .image-card-2 { transition-delay: 0.2s; }

        .card-animate {
          animation: cardFloat 4s ease-in-out infinite;
        }

        .image-card-1.card-animate { animation-delay: 0s; }
        .image-card-2.card-animate { animation-delay: 2s; }

        /* Mock component styles */
        .gauge-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .gauge-circle {
          width: ${screenSize === 'mobile' ? '120px' : '160px'};
          height: ${screenSize === 'mobile' ? '120px' : '160px'};
          border-radius: 50%;
          background: conic-gradient(from 0deg, #fd9e00 0deg 270deg, rgba(255,255,255,0.2) 270deg 360deg);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: ${showGauge ? 'gaugeRotate 2s ease-out' : 'none'};
        }

        .gauge-center {
          width: 80%;
          height: 80%;
          background: white;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .gauge-percentage {
          font-size: ${screenSize === 'mobile' ? '1.5rem' : '2rem'};
          font-weight: bold;
          color: #fd9e00;
        }

        .gauge-label {
          font-size: ${screenSize === 'mobile' ? '0.7rem' : '0.8rem'};
          color: #666;
          text-align: center;
        }

        .stats-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .stats-bars {
          display: flex;
          align-items: flex-end;
          gap: ${screenSize === 'mobile' ? '8px' : '12px'};
          height: ${screenSize === 'mobile' ? '80px' : '120px'};
          margin-bottom: 15px;
        }

        .stat-bar {
          width: ${screenSize === 'mobile' ? '20px' : '24px'};
          background: linear-gradient(to top, #fd9e00, #f97316);
          border-radius: 4px;
          opacity: ${active ? 1 : 0};
          transform: ${active ? 'scaleY(1)' : 'scaleY(0)'};
          transform-origin: bottom;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .stats-label {
          color: white;
          font-size: ${screenSize === 'mobile' ? '0.8rem' : '1rem'};
          font-weight: 600;
          text-align: center;
        }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes shapeFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gaugeRotate {
          from { transform: rotate(-90deg); }
          to { transform: rotate(0deg); }
        }

        /* Mobile First Responsive Design */
        @media (max-width: 480px) {
          .features-layout {
            flex-direction: column;
            text-align: center;
          }
          
          .features-text {
            justify-content: center;
            margin-bottom: 20px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, 1fr);
            height: auto;
            min-height: 400px;
          }

          .text-word {
            margin-right: 0.3rem;
            font-size: 2.2rem;
          }

          .highlight-word::after {
            height: 2px;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .features-layout {
            flex-direction: column;
            text-align: center;
          }
          
          .features-text {
            justify-content: center;
            margin-bottom: 30px;
            font-size: 2.2rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .features-layout {
            flex-direction: row;
          }
          
          .features-text {
            justify-content: flex-start;
          }
        }

        @media (min-width: 1025px) {
          .features-text {
            margin-right: 35px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .card:hover, .card-wrapper:hover {
            transform: none;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          
          .card-overlay {
            opacity: 1;
            background: linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05));
          }
        }

        /* High DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .particle {
            filter: blur(0.5px);
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .features-section,
          .features-layout,
          .features-text,
          .features-grid,
          .card,
          .card-wrapper,
          .text-word,
          .particle,
          .shape,
          .stat-bar {
            animation: none;
            transition: none;
          }
          
          .highlight-word::after {
            width: 100%;
            transition: none;
          }
        }

        @media (max-width: 900px) {
          .features-layout {
            flex-direction: column;
            gap: 32px;
          }
          .features-text {
            text-align: center;
            justify-content: center;
          }
          .features-text h2 {
            font-size: 1.3rem;
            margin-top: 1.2rem;
            margin-bottom: 1.2rem;
            line-height: 1.2;
          }
          .features-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, auto);
            gap: 16px;
            height: auto;
            min-height: unset;
          }
          .card, .card-wrapper {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
            margin-bottom: 1rem;
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
            border-radius: 20px 20px 0 0;
          }
        }
        @media (max-width: 600px) {
          .features-text h2 {
            font-size: 2.2rem;
          }
          .features-layout {
            padding: 0 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturesSection;