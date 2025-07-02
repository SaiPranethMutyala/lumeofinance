import React, { useState, useRef, useEffect } from 'react';
import './Homepage.css';
import './HeroSection.css';
// import './FeaturesSection.css';
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

const useSectionInView = () => {
  const ref = useRef();
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
};

const Homepage = () => {
  useScrollAnimation();
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

  const [challengeRef, challengeInView] = useSectionInView();
  const [answersRef, answersInView] = useSectionInView();
  const [featuresInView, setFeaturesInView] = useState(false);
  const featuresRef = useRef();

  useEffect(() => {
    const node = featuresRef.current;
    if (!node) return;
    if ('IntersectionObserver' in window) {
      const observer = new window.IntersectionObserver(
        ([entry]) => setFeaturesInView(entry.isIntersecting),
        { threshold: 0.7 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="homepage" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      {/* All sections rendered normally without fixed positioning */}
      <div className="sections-container" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div className="homepage-section animate-on-scroll" style={{ scrollSnapAlign: 'start', minHeight: 0 }}>
          <HeroSection animatedText={simpleText} active={true} shouldDockPhone={featuresInView} />
        </div>
        <div className="homepage-section animate-on-scroll" ref={featuresRef} style={{ scrollSnapAlign: 'start', minHeight: 0 }}>
          <FeaturesSection active={true} />
        </div>
        <div className="homepage-section animate-on-scroll" style={{ scrollSnapAlign: 'start', minHeight: 0 }}>
          <MoneyTalksSection active={true} />
        </div>
        <div className="homepage-section animate-on-scroll" style={{ scrollSnapAlign: 'start', minHeight: 0 }}>
          <UnderstandSection active={true} />
        </div>
        <div className="homepage-section animate-on-scroll" ref={challengeRef} style={{ scrollSnapAlign: 'start', minHeight: 0 }}>
          <ChallengeSection active={challengeInView} />
        </div>
        <div className="homepage-section animate-on-scroll" ref={answersRef} style={{ scrollSnapAlign: 'start', minHeight: 0 }}>
          <AnswersSection active={answersInView} />
        </div>
        <div className="homepage-section animate-on-scroll" style={{ scrollSnapAlign: 'start', minHeight: 0 }}>
          <CleoWorksSection active={true} />
        </div>
        <div className="homepage-section animate-on-scroll" style={{ scrollSnapAlign: 'start', minHeight: 0 }}>
          <TryCleoSection active={true} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;