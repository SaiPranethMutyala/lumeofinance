import React, { useEffect, useState } from 'react';

const AnswersSection = ({ active = true }) => {
  const [leftAnimated, setLeftAnimated] = useState(false);
  const [imageAnimated, setImageAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (active) {
      // Small delay to ensure smooth animation start
      const timer = setTimeout(() => {
        setIsVisible(true);
        setLeftAnimated(true);
        setImageAnimated(true);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setLeftAnimated(false);
      setImageAnimated(false);
    }
  }, [active]);

  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  // Responsive values
  const getResponsiveValue = (desktop, tablet, mobile) => {
    if (windowWidth <= 768) return mobile;
    if (windowWidth <= 1024) return tablet;
    return desktop;
  };

  const getResponsivePadding = () => {
    if (windowWidth <= 480) return '0 1rem';
    if (windowWidth <= 768) return '0 2rem';
    if (windowWidth <= 1024) return '0 4rem';
    return '0 10rem';
  };

  const getResponsiveTitleSize = () => {
    if (windowWidth <= 480) return '1.8rem';
    if (windowWidth <= 768) return '2.2rem';
    if (windowWidth <= 1024) return '2.8rem';
    return '3.2rem';
  };

  const getResponsiveImageSize = () => {
    if (windowWidth <= 480) return { width: '100%', height: '200px' };
    if (windowWidth <= 768) return { width: '100%', height: '250px' };
    if (windowWidth <= 1024) return { width: '100%', height: '300px' };
    return { width: '540px', height: '370px' };
  };

  return (
    <section 
      className={`answers-section ${isVisible ? 'animate' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #FFFFFF, #FFFFFF, #FFFFFF)',
        backgroundSize: '400% 400%',
        width: '100%',
        margin: '0 !important',
        position: 'relative',
        boxSizing: 'border-box',
        top: 0,
        left: 0,
        right: 0,
        borderTop: 'none',
        borderBottom: 'none',
        transform: 'translateY(0) !important',
        zIndex: 1,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(0)',
        transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        ...(isVisible && {
          animation: 'answers-bg-gradient 8s ease-in-out infinite',
        })
      }}
    >
      {/* Animated Background Elements */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(68, 35, 26, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(68, 35, 26, 0.03) 0%, transparent 50%)',
          opacity: 0,
          transition: 'opacity 1s ease-out 0.3s',
          ...(isVisible && {
            opacity: 1,
            animation: 'backgroundPulse 3s ease-in-out infinite',
          })
        }}
      />

      {/* Floating Particles - not rendered on phones */}
      {/* Removed particles for content stability */}

      <div 
        className="answers-content-row"
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1400px',
          alignItems: getResponsiveValue('center', 'flex-start', 'flex-start'),
          justifyContent: getResponsiveValue('space-between', 'center', 'center'),
          flexDirection: getResponsiveValue('row', 'column', 'column'),
          padding: getResponsivePadding(),
          boxSizing: 'border-box',
          gap: getResponsiveValue('0', '2rem', '1.5rem'),
          paddingTop: getResponsiveValue('0', '2rem', '1.5rem'),
          paddingBottom: getResponsiveValue('0', '2rem', '1.5rem')
        }}
      >
        <div 
          className={`answers-left ${leftAnimated ? 'answers-left-animate' : ''}`}
          style={{
            flex: getResponsiveValue('1 1 45%', '1 1 100%', '1 1 100%'),
            display: 'flex',
            flexDirection: 'column',
            alignItems: getResponsiveValue('flex-start', 'center', 'center'),
            justifyContent: 'center',
            color: '#44231a',
            zIndex: 2,
            opacity: 0,
            paddingLeft: getResponsiveValue('6rem', '0', '0'),
            paddingRight: getResponsiveValue('0', '0', '0'),
            textAlign: getResponsiveValue('left', 'center', 'center'),
            transform: 'translateX(-40px) scale(0.97)',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.1s',
            ...(leftAnimated && {
              opacity: 1,
              transform: 'translateX(0) scale(1)',
            })
          }}
        >
          <h2 
            className="answers-title"
            style={{
              fontSize: getResponsiveTitleSize(),
              fontWeight: 800,
              marginBottom: getResponsiveValue('18px', '16px', '12px'),
              lineHeight: 1.08,
              color: '#fd9e00',
              position: 'relative',
              overflow: 'hidden',
              opacity: 0,
              transform: 'translateY(30px) scale(0.97)',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0.1s',
              textAlign: getResponsiveValue('left', 'center', 'center'),
              maxWidth: getResponsiveValue('none', '600px', '100%'),
              ...(leftAnimated && {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
              })
            }}
          >
            {leftAnimated ? (
              <>
                {'Lumeo knows what matters'.split(' ').map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`text-word ${wordIndex === 2 ? 'highlight-word' : ''}`}
                    style={{
                      display: 'inline-block',
                      marginRight: wordIndex < 4 ? '0.3em' : '0',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.05 + wordIndex * 0.05}s`,
                      ...(leftAnimated && {
                        opacity: 1,
                        transform: 'translateY(0)',
                      }),
                      ...(wordIndex === 2 && {
                        background: 'linear-gradient(135deg, #fd9e00, #f97316)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        position: 'relative',
                      })
                    }}
                  >
                    {word}
                    {wordIndex === 2 && (isMobile || isTablet) && <br />}
                    {wordIndex === 2 && (
                      <span
                        style={{
                          content: '',
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          width: leftAnimated ? '100%' : '0%',
                          height: '3px',
                          background: 'linear-gradient(90deg, #fd9e00, #f97316)',
                          transition: 'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s',
                        }}
                      />
                    )}
                  </span>
                ))}
              </>
            ) : (
              'Lumeo knows what matters'
            )}
          </h2>
          
          <p 
            className="answers-desc"
            style={{
              fontSize: getResponsiveValue('1.1rem', '1rem', '0.95rem'),
              color: '#ff9800',
              marginBottom: '0.7em',
              maxWidth: getResponsiveValue('420px', '500px', '100%'),
              opacity: 0,
              transform: 'translateY(30px) scale(0.97)',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0.15s',
              textAlign: getResponsiveValue('left', 'center', 'center'),
              lineHeight: 1.5,
              ...(leftAnimated && {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
              })
            }}
          >
            From tracking your spending to crushing debt and building real wealth, Lumeo helps you and your crew make smarter money moves, right now.
          </p>
          
          <p 
            className="answers-desc"
            style={{
              fontSize: getResponsiveValue('1.1rem', '1rem', '0.95rem'),
              color: '#ff9800',
              marginBottom: '0.7em',
              maxWidth: getResponsiveValue('420px', '500px', '100%'),
              fontWeight: 600,
              opacity: 0,
              transform: 'translateY(30px) scale(0.97)',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0.2s',
              textAlign: getResponsiveValue('left', 'center', 'center'),
              lineHeight: 1.5,
              ...(leftAnimated && {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
              })
            }}
          >
            Where do you want to start now?
          </p>
        </div>

        <div 
          className="answers-right"
          style={{
            flex: getResponsiveValue('1 1 55%', '1 1 100%', '1 1 100%'),
            display: 'flex',
            alignItems: getResponsiveValue('flex-start', 'center', 'center'),
            justifyContent: getResponsiveValue('flex-end', 'center', 'center'),
            position: 'relative',
            minWidth: getResponsiveValue('500px', 'auto', 'auto'),
            width: getResponsiveValue('auto', '100%', '100%')
          }}
        >
          <div 
            className={`answers-image-wrapper ${imageAnimated ? 'answers-image-animate' : ''}`}
            style={{
              position: 'relative',
              width: getResponsiveImageSize().width,
              height: getResponsiveImageSize().height,
              borderRadius: getResponsiveValue('28px', '20px', '16px'),
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              background: '#eee',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              backgroundImage: "url('/images/lumeohaveans.PNG')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0,
              transform: 'translateY(40px) scale(0.97)',
              transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.3s',
              ...(imageAnimated && {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
                animation: 'imageFloat 2s ease-in-out infinite 0.8s, imageGlow 3s ease-in-out infinite 1s',
              })
            }}
          >
            <div 
              className="answers-voice-bar"
              style={{
                position: 'absolute',
                left: '50%',
                bottom: getResponsiveValue('32px', '24px', '16px'),
                transform: 'translateX(-50%)',
                background: 'rgba(105, 105, 90, 0.32)',
                color: '#fff',
                borderRadius: getResponsiveValue('24px', '20px', '16px'),
                padding: getResponsiveValue('0 24px', '0 20px', '0 16px'),
                height: getResponsiveValue('56px', '48px', '40px'),
                minWidth: getResponsiveValue('320px', '280px', '240px'),
                maxWidth: '90%',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                fontSize: getResponsiveValue('1.2rem', '1.1rem', '1rem'),
                fontWeight: 500,
                zIndex: 3,
                gap: getResponsiveValue('18px', '16px', '12px'),
                opacity: 0,
                transform: 'translateX(-50%) translateY(20px) scale(0.9)',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.6s',
                ...(imageAnimated && {
                  opacity: 1,
                  transform: 'translateX(-50%) translateY(0) scale(1)',
                  animation: 'voiceBarPulse 1.5s ease-in-out infinite 1.2s',
                })
              }}
            >
              <div className="answers-voice-icon" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <div style={{ 
                  width: getResponsiveValue('12px', '10px', '8px'), 
                  height: getResponsiveValue('12px', '10px', '8px'), 
                  background: '#4ade80', 
                  borderRadius: '50%', 
                  marginRight: '8px', 
                  animation: imageAnimated ? 'pulse 1s ease-in-out infinite' : 'none' 
                }}></div>
              </div>
              <span className="answers-voice-text" style={{ 
                fontSize: getResponsiveValue('1.1rem', '1rem', '0.9rem'), 
                fontWeight: 500, 
                marginRight: '10px', 
                color: '#fff', 
                opacity: 0.95 
              }}>
                Lumeo is ready to answer
              </span>
              <div className="answers-voice-arrow" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="answers-arrow-circle" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: getResponsiveValue('38px', '32px', '28px'), 
                  height: getResponsiveValue('38px', '32px', '28px'), 
                  background: 'rgba(255,255,255,0.2)', 
                  borderRadius: '50%', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  fontSize: getResponsiveValue('1.2rem', '1rem', '0.9rem')
                }}>
                  →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes answers-bg-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes backgroundPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% { 
            transform: translateY(-10px) translateX(8px) rotate(90deg);
          }
          50% { 
            transform: translateY(-15px) translateX(-4px) rotate(180deg);
          }
          75% { 
            transform: translateY(-8px) translateX(-10px) rotate(270deg);
          }
        }

        @keyframes imageFloat {
          0%, 100% { 
            transform: translateY(0) scale(1);
          }
          25% { 
            transform: translateY(-6px) scale(1.01);
          }
          50% { 
            transform: translateY(-10px) scale(1.02);
          }
          75% { 
            transform: translateY(-4px) scale(1.01);
          }
        }

        @keyframes imageGlow {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          }
          50% {
            box-shadow: 
              0 12px 40px rgba(0,0,0,0.15), 
              0 0 20px rgba(68, 35, 26, 0.1);
          }
        }

        @keyframes wordReveal {
          0% {
            opacity: 0;
            transform: translateY(20px) rotateX(90deg) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px) rotateX(0deg) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
          }
        }

        @keyframes titleBreathe {
          0%, 100% {
            text-shadow: none;
          }
          50% {
            text-shadow: 0 2px 8px rgba(68, 35, 26, 0.2);
          }
        }

        @keyframes voiceBarPulse {
          0%, 100% {
            background: rgba(105, 105, 90, 0.32);
          }
          50% {
            background: rgba(105, 105, 90, 0.4);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        /* Enhanced responsive styles */
        @media (max-width: 1200px) {
          .answers-content-row {
            padding: 0 6rem !important;
          }
          .answers-title {
            font-size: 2.8rem !important;
          }
        }

        @media (max-width: 1024px) {
          .answers-content-row {
            flex-direction: column !important;
            padding: 0 4rem !important;
            align-items: center !important;
            gap: 2rem !important;
          }
          .answers-left {
            text-align: center !important;
            align-items: center !important;
            padding-left: 0 !important;
          }
          .answers-right {
            min-width: 0 !important;
            width: 100% !important;
            justify-content: center !important;
          }
          .answers-image-wrapper {
            width: 100% !important;
            max-width: 600px !important;
            height: 350px !important;
          }
          .answers-title {
            font-size: 2.5rem !important;
            text-align: center !important;
          }
          .answers-desc {
            text-align: center !important;
            max-width: 500px !important;
          }
        }

        @media (max-width: 768px) {
          .answers-section {
            padding: 0 !important;
            min-height: auto !important;
            margin: 0 !important;
          }
          .answers-content-row {
            padding: 0 2rem !important;
            gap: 1.5rem !important;
          }
          .answers-image-wrapper {
            width: 100% !important;
            height: 280px !important;
            border-radius: 16px !important;
          }
          .answers-title {
            font-size: 2rem !important;
            margin-bottom: 12px !important;
          }
          .answers-desc {
            font-size: 0.95rem !important;
            max-width: 100% !important;
          }
          .answers-voice-bar {
            min-width: 260px !important;
            height: 44px !important;
            font-size: 1rem !important;
            padding: 0 16px !important;
            bottom: 20px !important;
          }
        }

        @media (max-width: 480px) {
          .answers-section {
            padding: 0 !important;
            margin: 0 !important;
          }
          .answers-content-row {
            padding: 0 1rem !important;
            gap: 1rem !important;
          }
          .answers-image-wrapper {
            height: 220px !important;
            border-radius: 12px !important;
          }
          .answers-title {
            font-size: 1.6rem !important;
            margin-bottom: 8px !important;
            line-height: 1.2 !important;
          }
          .answers-desc {
            font-size: 0.9rem !important;
            line-height: 1.4 !important;
          }
          .answers-voice-bar {
            min-width: 220px !important;
            height: 40px !important;
            font-size: 0.9rem !important;
            padding: 0 12px !important;
            bottom: 16px !important;
            gap: 8px !important;
          }
          .answers-arrow-circle {
            width: 24px !important;
            height: 24px !important;
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 360px) {
          .answers-title {
            font-size: 1.4rem !important;
          }
          .answers-desc {
            font-size: 0.85rem !important;
          }
          .answers-image-wrapper {
            height: 180px !important;
          }
          .answers-voice-bar {
            min-width: 200px !important;
            height: 36px !important;
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AnswersSection;