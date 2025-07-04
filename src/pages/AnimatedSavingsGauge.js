import React, { useEffect, useRef, useState } from 'react';

const MAX = 90000;
const TARGET = 41253;
const DURATION = 1800; // ms
const PERCENT = TARGET / MAX;

// Helper to get arc path for a semi-circle (left to right)
function describeSemiArc(cx, cy, r, startAngle, endAngle) {
  const start = {
    x: cx + r * Math.cos(startAngle),
    y: cy + r * Math.sin(startAngle),
  };
  const end = {
    x: cx + r * Math.cos(endAngle),
    y: cy + r * Math.sin(endAngle),
  };
  return [
    'M', start.x, start.y,
    'A', r, r, 0, 0, 1, end.x, end.y
  ].join(' ');
}

const AnimatedSavingsGauge = ({ active }) => {
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');
  const animationRef = useRef();

  // Screen size detection (matching FeaturesSection)
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

  useEffect(() => {
    if (!active) {
      setValue(0);
      setProgress(0);
      return;
    }
    let start = null;
    function animate(ts) {
      if (!start) start = ts;
      const t = Math.min((ts - start) / DURATION, 1);
      setValue(Math.floor(TARGET * t));
      setProgress(t);
      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [active]);

  // Responsive dimensions for a large, surrounding gauge
  const getResponsiveDimensions = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          radius: 45,
          centerX: 65,
          centerY: 65,
          strokeWidth: 10,
          svgWidth: 130,
          svgHeight: 85
        };
      case 'tablet':
        return {
          radius: 70,
          centerX: 100,
          centerY: 100,
          strokeWidth: 13,
          svgWidth: 200,
          svgHeight: 120
        };
      case 'laptop':
        return {
          radius: 100,
          centerX: 135,
          centerY: 135,
          strokeWidth: 17,
          svgWidth: 270,
          svgHeight: 160
        };
      default: // desktop
        return {
          radius: 115,
          centerX: 160,
          centerY: 160,
          strokeWidth: 20,
          svgWidth: 320,
          svgHeight: 190
        };
    }
  };

  const { radius, centerX, centerY, strokeWidth, svgWidth, svgHeight } = getResponsiveDimensions();
  
  const START_ANGLE = Math.PI; // 180deg (left)
  const END_ANGLE = 2 * Math.PI; // 360deg (right, for left-to-right arc)
  const SEMI_CIRCUM = Math.PI * radius; // half circumference

  // Arc calculations
  const arcLength = SEMI_CIRCUM * PERCENT * progress;
  const bgPath = describeSemiArc(centerX, centerY, radius, START_ANGLE, END_ANGLE);
  const fgPath = describeSemiArc(centerX, centerY, radius, START_ANGLE, END_ANGLE);

  return (
    <div className="savings-gauge-container">
      <div className="savings-dropdown">
        Savings <span className="dropdown-arrow">▼</span>
      </div>
      <div className="gauge-outer-wrapper">
        <svg 
          width={svgWidth} 
          height={svgHeight} 
          className="savings-gauge-svg"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        >
          {/* Background semi-circle */}
          <path
            d={bgPath}
            stroke="#fde6c0"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          {/* Animated arc */}
          <path
            d={fgPath}
            stroke="#fd9e00"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={SEMI_CIRCUM}
            strokeDashoffset={SEMI_CIRCUM - arcLength}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.2s' }}
          />
        </svg>
        <div className="savings-gauge-center savings-gauge-center-semi">
          <div className="savings-gauge-label">Savings</div>
          <div className="savings-gauge-value">${value.toLocaleString()}</div>
          <div className="savings-gauge-sublabel">Out of ${MAX.toLocaleString()}</div>
        </div>
      </div>
      <div className="savings-gauge-periods">
        <span>W</span>
        <span className="active">M</span>
        <span>Y</span>
      </div>
      <style jsx>{`
        .gauge-outer-wrapper {
          position: relative;
          width: ${svgWidth}px;
          height: ${svgHeight}px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .savings-gauge-svg {
          display: block;
        }
        .savings-gauge-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -30%);
          width: 70%;
          text-align: center;
          z-index: 2;
          pointer-events: none;
          padding-top: 0.5em;
        }
        .savings-gauge-label {
          font-size: ${screenSize === 'mobile' ? '0.7rem' : screenSize === 'tablet' ? '0.9rem' : screenSize === 'laptop' ? '1.1rem' : '1.2rem'};
          font-weight: 600;
          margin-bottom: 0.2em;
          color: #4a2a1c;
        }
        .savings-gauge-value {
          font-size: ${screenSize === 'mobile' ? '1.1rem' : screenSize === 'tablet' ? '1.5rem' : screenSize === 'laptop' ? '2rem' : '2.2rem'};
          font-weight: 800;
          margin-bottom: 0.1em;
          color: #4a2a1c;
          text-shadow: 0 2px 4px rgba(0,0,0,0.08);
        }
        .savings-gauge-sublabel {
          font-size: ${screenSize === 'mobile' ? '0.6rem' : screenSize === 'tablet' ? '0.7rem' : screenSize === 'laptop' ? '0.8rem' : '0.9rem'};
          opacity: 0.8;
          font-weight: 500;
          color: #4a2a1c;
        }
        .savings-gauge-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          background: white;
          border-radius: ${screenSize === 'mobile' ? '20px' : '30px'};
          padding: ${screenSize === 'mobile' ? '15px' : 
                   screenSize === 'tablet' ? '20px' : 
                   screenSize === 'laptop' ? '25px' : '30px'};
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .savings-dropdown {
          position: absolute;
          top: ${screenSize === 'mobile' ? '12px' : '15px'};
          right: ${screenSize === 'mobile' ? '12px' : '15px'};
          background: rgba(253, 158, 0, 0.1);
          color: #4a2a1c;
          padding: ${screenSize === 'mobile' ? '4px 8px' : '6px 12px'};
          border-radius: ${screenSize === 'mobile' ? '6px' : '8px'};
          font-size: ${screenSize === 'mobile' ? '0.7rem' : '0.8rem'};
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .savings-dropdown:hover {
          background: rgba(253, 158, 0, 0.2);
        }

        .dropdown-arrow {
          margin-left: 4px;
          font-size: ${screenSize === 'mobile' ? '0.6rem' : '0.7rem'};
        }

        .savings-gauge-periods {
          display: flex;
          gap: ${screenSize === 'mobile' ? '12px' : '16px'};
          margin-top: auto;
        }

        .savings-gauge-periods span {
          background: rgba(253, 158, 0, 0.1);
          color: #4a2a1c;
          padding: ${screenSize === 'mobile' ? '4px 8px' : '6px 12px'};
          border-radius: ${screenSize === 'mobile' ? '6px' : '8px'};
          font-size: ${screenSize === 'mobile' ? '0.7rem' : '0.8rem'};
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          min-width: ${screenSize === 'mobile' ? '20px' : '24px'};
          text-align: center;
        }

        .savings-gauge-periods span:hover {
          background: rgba(253, 158, 0, 0.2);
          transform: translateY(-1px);
        }

        .savings-gauge-periods span.active {
          background: rgba(253, 158, 0, 0.8);
          color: white;
          box-shadow: 0 4px 12px rgba(253, 158, 0, 0.3);
        }

        /* Mobile optimizations */
        @media (max-width: 480px) {
          .savings-gauge-container {
            min-height: 180px;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 481px) and (max-width: 768px) {
          .savings-gauge-container {
            min-height: 220px;
          }
        }

        /* Laptop optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
          .savings-gauge-container {
            min-height: 260px;
          }
        }

        /* Desktop optimizations */
        @media (min-width: 1025px) {
          .savings-gauge-container {
            min-height: 300px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .savings-dropdown:hover,
          .savings-gauge-periods span:hover {
            background: rgba(253, 158, 0, 0.1);
            transform: none;
          }
          
          .savings-gauge-periods span.active {
            background: rgba(253, 158, 0, 0.9);
          }
        }

        /* High DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .savings-gauge-svg {
            shape-rendering: geometricPrecision;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .savings-gauge-svg path {
            transition: none;
          }
          
          .savings-dropdown,
          .savings-gauge-periods span {
            transition: none;
          }
        }

        /* Specific breakpoint matching FeaturesSection */
        @media (max-width: 900px) {
          .savings-gauge-container {
            margin-bottom: 1rem;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }
        }

        @media (max-width: 600px) {
          .savings-gauge-container {
            padding: 12px;
          }
          
          .savings-gauge-value {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSavingsGauge;