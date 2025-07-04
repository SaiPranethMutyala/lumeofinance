import React, { useState, useRef, useEffect } from 'react';
import './Homepage.css';
import './MoneyTalksSection.css';
import './UnderstandSection.css';
import './VerticalImageCarousel.css';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import MoneyTalksSection from './MoneyTalksSection';
import UnderstandSection from './UnderstandSection';
import ChallengeSection from './ChallengeSection';
import AnswersSection from './AnswersSection';
import CleoWorksSection from './CleoWorksSection';
import TryCleoSection from './TryCleoSection';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Homepage = () => {
  useScrollAnimation();
  
  // Refs for all sections
  const heroRef = useRef();
  const featuresRef = useRef();
  const moneyTalksRef = useRef();
  const understandRef = useRef();
  const challengeRef = useRef();
  const answersRef = useRef();
  const cleoWorksRef = useRef();
  const tryCleoRef = useRef();
  
  // State for tracking current section
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Simple text for hero (you can animate this in HeroSection component)
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

  const [challengeInView, setChallengeInView] = useState(false);
  const [answersInView, setAnswersInView] = useState(false);
  const [featuresInView, setFeaturesInView] = useState(false);

  // Smooth scroll to section function
  const scrollToSection = (sectionIndex) => {
    const sections = [
      heroRef.current,
      featuresRef.current,
      moneyTalksRef.current,
      understandRef.current,
      challengeRef.current,
      answersRef.current,
      cleoWorksRef.current,
      tryCleoRef.current
    ];
    
    if (sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setCurrentSection(sectionIndex);
    }
  };

  // Enhanced intersection observer for better scroll tracking
  useEffect(() => {
    const sections = [
      heroRef.current,
      featuresRef.current,
      moneyTalksRef.current,
      understandRef.current,
      challengeRef.current,
      answersRef.current,
      cleoWorksRef.current,
      tryCleoRef.current
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sections.indexOf(entry.target);
          if (index !== -1) {
            const element = entry.target;
            
            // Calculate intersection ratio for smooth transitions
            const ratio = entry.intersectionRatio;
            
            if (ratio > 0.1) {
              // Section is entering view
              element.classList.add('section-entering');
              element.classList.remove('section-exiting');
              
              if (ratio > 0.5) {
                // Section is fully active
                element.classList.add('section-active');
                element.classList.remove('section-entering');
                setCurrentSection(index);
                
                // Update specific section states
                if (index === 4) setChallengeInView(true);
                if (index === 5) setAnswersInView(true);
                if (index === 1) setFeaturesInView(true);
              }
            } else {
              // Section is exiting view
              element.classList.add('section-exiting');
              element.classList.remove('section-active', 'section-entering');
              
              // Update specific section states when not in view
              if (index === 4) setChallengeInView(false);
              if (index === 5) setAnswersInView(false);
              if (index === 1) setFeaturesInView(false);
            }
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Track scroll progress for smooth progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextSection = Math.min(currentSection + 1, 7);
        scrollToSection(nextSection);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevSection = Math.max(currentSection - 1, 0);
        scrollToSection(prevSection);
      } else if (e.key >= '1' && e.key <= '8') {
        e.preventDefault();
        scrollToSection(parseInt(e.key) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  return (
    <div className="homepage" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      {/* All sections rendered normally without fixed positioning */}
      <div className="sections-container" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div 
          ref={heroRef}
          className="homepage-section animate-on-scroll" 
          style={{ minHeight: 0 }}
          data-section="hero"
        >
          <HeroSection active={true} shouldDockPhone={featuresInView} />
        </div>
        <div 
          ref={featuresRef}
          className="homepage-section animate-on-scroll" 
          style={{ minHeight: 0 }}
          data-section="features"
        >
          <FeaturesSection active={true} />
        </div>
        <div 
          ref={moneyTalksRef}
          className="homepage-section animate-on-scroll" 
          style={{ minHeight: 0 }}
          data-section="money-talks"
        >
          <MoneyTalksSection active={true} />
        </div>
        <div 
          ref={understandRef}
          className="homepage-section animate-on-scroll" 
          style={{ minHeight: 0 }}
          data-section="understand"
        >
          <UnderstandSection active={true} />
        </div>
        <div 
          ref={challengeRef}
          className="homepage-section animate-on-scroll" 
          style={{ minHeight: 0 }}
          data-section="challenge"
        >
          <ChallengeSection active={challengeInView} />
        </div>
        <div 
          ref={answersRef}
          className="homepage-section animate-on-scroll" 
          style={{ minHeight: 0 }}
          data-section="answers"
        >
          <AnswersSection active={answersInView} />
        </div>
        <div 
          ref={cleoWorksRef}
          className="homepage-section animate-on-scroll" 
          style={{ minHeight: 0 }}
          data-section="cleo-works"
        >
          <CleoWorksSection active={true} />
        </div>
        <div 
          ref={tryCleoRef}
          className="homepage-section animate-on-scroll" 
          style={{ minHeight: 0 }}
          data-section="try-cleo"
        >
          <TryCleoSection active={true} />
        </div>
      </div>
      
      {/* Navigation dots */}
      <ul className="side-dots">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <li
            key={index}
            className={currentSection === index ? 'active' : ''}
            onClick={() => scrollToSection(index)}
            title={`Go to section ${index + 1}`}
          />
        ))}
      </ul>
      
      {/* Progress indicator */}
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar"
          style={{ 
            height: `${scrollProgress}%`,
            transition: 'height 0.2s ease-out'
          }}
        />
      </div>
    </div>
  );
};

export default Homepage;