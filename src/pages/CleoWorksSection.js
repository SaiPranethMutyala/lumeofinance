import React, { useRef, useEffect, useState } from 'react';

const CleoWorksSection = ({ active = true }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const images = [
    { src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308", alt: "Person 1", position: "top-left" },
    { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9", alt: "Person 2", position: "top-right" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", alt: "Person 3", position: "bottom-left" },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", alt: "Person 4", position: "bottom-right" }
  ];

  const getImagePosition = (position) => {
    const positions = {
      'top-left': { top: '6%', left: '3%' },
      'top-right': { top: '6%', right: '3%' },
      'bottom-left': { bottom: '6%', left: '3%' },
      'bottom-right': { bottom: '6%', right: '3%' }
    };
    return positions[position];
  };

  return (
    <section 
      ref={sectionRef}
      className={`cleo-works-section ${isVisible ? 'animate' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #F97316 0%, #ea580c 50%, #F97316 100%)',
        color: 'white',
        width: '100vw',
        minHeight: '100vh',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundSize: '200% 200%',
        borderRadius: 0,
      }}
    >
      {/* Main Content */}
      <div 
        className="cleo-works-content"
        style={{
          position: 'relative',
          textAlign: 'center',
          zIndex: 3,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: active && isVisible ? 1 : 0,
          transform: active && isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.8s',
          color: '#fff'
        }}
      >
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 900,
          margin: '0 0 24px 0',
          lineHeight: 1.1,
          color: '#fff',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          display: 'block',
          width: '100%'
        }}>
          Lumeo saves for you
          <br />
          (not ur parents)
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: 400,
          margin: '0',
          color: '#fff',
          maxWidth: '800px',
          textAlign: 'center',
          lineHeight: 1.5,
          opacity: 0.95
        }}>
          In other words, lumeo saves your way, not theirs—<br />
          always helping you hit money goals and live life your way.
        </p>
      </div>

      {/* Images with Enhanced Animations */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={img.alt}
          style={{
            position: 'absolute',
            maxWidth: '220px',
            maxHeight: '140px',
            objectFit: 'cover',
            borderRadius: '18px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 1.5px 8px rgba(0,0,0,0.15)',
            background: '#fff',
            border: '2px solid rgba(255,255,255,0.9)',
            boxSizing: 'border-box',
            zIndex: 2,
            opacity: 0,
            transform: `translateY(80px) scale(0.7) rotate(${Math.random() * 20 - 10}deg)`,
            transition: `all 1s cubic-bezier(0.23, 1, 0.32, 1) ${0.3 + index * 0.2}s`,
            ...getImagePosition(img.position),
            ...(active && isVisible && {
              opacity: 1,
              transform: 'translateY(0) scale(1) rotate(0deg)',
              animation: `imageFloat ${3 + index * 0.5}s ease-in-out infinite ${index * 0.8}s, imageGlow ${4 + index * 0.3}s ease-in-out infinite ${1 + index * 0.5}s`,
            })
          }}
        />
      ))}

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes imageFloat {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg);
            filter: brightness(1);
          }
          25% { 
            transform: translateY(-12px) scale(1.03) rotate(1deg);
            filter: brightness(1.1);
          }
          50% { 
            transform: translateY(-20px) scale(1.05) rotate(0deg);
            filter: brightness(1.2);
          }
          75% { 
            transform: translateY(-8px) scale(1.02) rotate(-1deg);
            filter: brightness(1.1);
          }
        }

        @keyframes titlePulse {
          0%, 100% {
            text-shadow: 0 6px 40px rgba(0,0,0,0.4), 0 2px 12px rgba(0,0,0,0.2);
          }
          50% {
            text-shadow: 
              0 8px 50px rgba(0,0,0,0.5), 
              0 3px 15px rgba(0,0,0,0.3),
              0 0 30px rgba(255,255,255,0.2);
          }
        }

        .cleo-works-section.animate {
          animation: gradientShift 8s ease-in-out infinite;
        }

        .cleo-works-section.animate .floating-image {
          animation: imageFloat 4s ease-in-out infinite;
        }

        .cleo-works-section.animate .main-title {
          animation: titlePulse 3s ease-in-out infinite 2s;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .cleo-works-section {
            padding: 20px 15px;
            min-height: 100vh;
          }

          .cleo-works-content {
            max-width: 90% !important;
          }

          .floating-image {
            width: clamp(80px, 20vw, 150px) !important;
            height: clamp(60px, 15vw, 100px) !important;
            border-radius: 12px !important;
          }

          .floating-image[style*="top: 6%"] { top: 8% !important; left: 5% !important; }
          .floating-image[style*="right: 3%"] { top: 8% !important; right: 5% !important; }
          .floating-image[style*="bottom: 6%"] { bottom: 12% !important; left: 5% !important; }
          .floating-image[style*="bottom: 6%"][style*="right"] { bottom: 12% !important; right: 5% !important; }
        }

        @media (max-width: 480px) {
          .cleo-works-section {
            padding: 20px 10px;
            min-height: 100vh;
          }

          .cleo-works-content {
            max-width: 95% !important;
          }

          .floating-image {
            width: clamp(60px, 18vw, 120px) !important;
            height: clamp(45px, 12vw, 80px) !important;
            border-radius: 8px !important;
            border-width: 2px !important;
          }

        }
      `}</style>
    </section>
  );
};

export default CleoWorksSection;