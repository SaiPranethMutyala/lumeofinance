import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Products.css';
import FAQ from './FAQ';

const Products = () => {
  useScrollAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="products-page">
      <div className="budget-your-way-section animate-on-scroll fade-in scale-in">
        <div className="budget-content">
          <h1>The Money<br />App.</h1>
          <div className="feature-box">
            <ul className="staggered-list">
              <li>Win all your money goals and your life</li>
              <li>Talk with Lumeo, your favorite finance friend</li>
              <li>Gamified saving challenges with leaderboards</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="join-section animate-on-scroll fade-in scale-in">
        <div className="stars pulse">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
        </div>
        <h3>Join the revolution. Join Lumeo.</h3>
        <p>
          Join lumeo on 
                <button className="store-button pop-on-hover">
                App Store
            </button>
            and
            <button className="store-button pop-on-hover">
                Google Store coming soon...
            </button>
        </p>
      </div>

  

      <div className="smarter-budgeting-section animate-on-scroll fade-in-up scale-in" style={{
        background: 'none', padding: '80px 0', marginTop: '-80px'}}>
        {/* <h2 style={{
          fontSize: '3.2rem',
          fontWeight: 900,
          color: '#F97316',
          margin: '-64px 0 24px 80px',
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
          textAlign: 'left',
          marginLeft: 25
        }}>
          Finance that finally <br/> fits for real
        </h2> */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? '24px' : '48px',
          maxWidth: '1400px',
          margin: '0 auto',
          minHeight: isMobile ? 'auto' : '500px',
        }}>
          {!isMobile && (
            <div className="image-content pop-on-hover" style={{
              flex: 1,
              width: '1000px',
              maxWidth: '1000px',
              height: '600px',
              borderRadius: '32px',
              backgroundImage: "url('/images/p2.PNG')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              marginTop: -20,
            }} />
          )}
          <div
            style={{
              flex: 1,
              width: isMobile ? '100%' : '600',
              maxWidth: isMobile ? '100%' : '600px',
              height: isMobile ? 'auto' : '370px',
              background: isMobile ? `url('/images/p2.PNG') center/cover no-repeat` : '#fff',
              borderRadius: '32px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              padding: isMobile ? '32px 12px' : '64px 56px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: isMobile ? 'center' : 'flex-start',
              minWidth: isMobile ? '0' : '400px',
              maxHeight: isMobile ? 'none' : 500,
              marginTop: 0,
              color: isMobile ? '#fff' : '#F97316',
              position: 'relative',
              zIndex: 1,
              backgroundBlendMode: isMobile ? 'darken' : 'initial',
              backgroundColor: isMobile ? 'rgba(0,0,0,0.35)' : '#fff',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            <h3 style={{
              fontSize: isMobile ? '2rem' : '2.8rem',
              fontWeight: 900,
              color: isMobile ? '#fff' : '#F97316',
              margin: isMobile ? '-32px 0 0 0' : '-48px 0 0 0',
              textAlign: isMobile ? 'center' : 'left',
              width: '100%',
              alignSelf: isMobile ? 'center' : 'flex-start',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              textShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
            }}>
              All your money in one place.
            </h3>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.35rem',
              color: isMobile ? '#fff' : '#F97316',
              margin: '28px 0 0 0',
              fontWeight: 400,
              lineHeight: 1.5,
              textAlign: isMobile ? 'center' : 'left',
              width: '100%',
              alignSelf: isMobile ? 'center' : 'flex-start',
              textShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.18)' : 'none',
            }}>
              Connect all your banks, cards, and savings accounts. Lumeo automatically tracks what's coming in, what's going out, and what's left to spend.
            </p>
          </div>
        </div>
      </div>
      <div className="should-money-be-social-section animate-on-scroll fade-in scale-in">
        <div className="content-overlay">
          <div className="content-card">
            <h1>
              Should money be social?
            </h1>
            <p>
              Lumeo lets you share, challenge, and learn with friends. See how your habits stack up, join group challenges, and celebrate wins together.
            </p>
          </div>
        </div>
      </div>

      <div className="set-spending-limit-section animate-on-scroll fade-in-up">
        <div className="content-wrapper">
          <div className="text-content">
            <h3> Track and grow your net worth </h3>
            <p>See your net worth, total savings, and growth all in one place — updated automatically.
            Track your financial progress in real time and stay motivated every step of the ways 
today.</p>
          </div>
          <div className="image-content spending-limit-image animate-on-scroll blur-in"></div>
        </div>
      </div>

      <div className="stay-ahead-section animate-on-scroll fade-in-up">
        <div className="content-wrapper">
          <div className="image-content stay-ahead-image animate-on-scroll blur-in"></div>
          <div className="text-content">
            <h3>Social savings</h3>
            <p>Discover real-time deals like grocery sales and local discounts.
            The social feed is community-powered, turning saving money into a viral, shareable experience.</p>
          </div>
        </div>
      </div>

      <div className="get-real-answers-section animate-on-scroll fade-in-up">
        <div className="content-wrapper">
          <div className="text-content">
            <h3> Shop your smartest</h3>
            <p>Cut back with the interactive product map 
recommendationlets users compare total shopping list costs across nearby stores in seconds.
By crowdsourcing real prices and locations, users can find the best deals without wasting time.
Lumeo spots the deals so you don't 
have to.</p>
          </div>
          <div className="image-content real-answers-image animate-on-scroll blur-in"></div>
        </div>
      </div>

      <div className="challenge-yourself-section animate-on-scroll fade-in-up">
        <div className="content-wrapper">
          <div className="image-content challenge-image animate-on-scroll blur-in"></div>
          <div className="text-content">
            <h3>See your balance grow</h3>
            <p>Track your savings on a leaderboard and watch your progress stack up.
Post wins, grow your following, and turn smarter money moves into social currency.

</p>
          </div>
        </div>
      </div>

      <div className="final-cta-section animate-on-scroll fade-in visible" style={{position: 'relative', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', padding: 0}}>
        <div
          className="final-cta-bg-image"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.95)',
          }}
        ></div>
        <div
          className="final-cta-overlay-box"
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'rgba(120,120,120,0.25)',
            borderRadius: '24px',
            padding: '40px 48px',
            maxWidth: '480px',
            marginLeft: '8vw',
            textAlign: 'left',
            boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <h2 style={{color: '#fff', fontWeight: 700, fontSize: '2.2rem', marginBottom: '32px', lineHeight: 1.1}}>
            Join the revolution of Lumeo users who are helping us transform the way we do money.
          </h2>
          <button style={{
            background: '#fff',
            color: '#4A2E2E',
            border: 'none',
            borderRadius: '24px',
            padding: '12px 32px',
            fontWeight: 600,
            fontSize: '1.1rem',
            marginTop: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            cursor: 'pointer',
          }}>
            Do the money our way
          </button>
        </div>
      </div>

      <div className="research-hero-section" style={{
        width: '100%',
        background: '#ea580c',
        padding: '64px 0 48px 0',
        margin: '48px 0',
        borderRadius: '32px',
        boxShadow: '0 8px 32px rgba(255, 167, 38, 0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        fontFamily: 'Inter, Montserrat, Arial, sans-serif',
      }}>
        <h1 style={{color: '#fff', fontSize: '3rem', fontWeight: 900, marginBottom: '40px', lineHeight: 1.08, letterSpacing: '-0.01em', textAlign: 'center'}}>
          What the research says
        </h1>
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          margin: '0',
          width: '100%',
          maxWidth: '1200px',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.18)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px 0 rgba(255, 184, 77, 0.13)',
            padding: '40px 32px',
            minWidth: '260px',
            maxWidth: '320px',
            flex: '1 1 260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            transition: 'transform 0.2s',
          }}>
            <div style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px'}}>90%</div>
            <div style={{fontSize: '1.15rem', fontWeight: 400}}>talk about salaries</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.18)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px 0 rgba(255, 184, 77, 0.13)',
            padding: '40px 32px',
            minWidth: '260px',
            maxWidth: '320px',
            flex: '1 1 260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            transition: 'transform 0.2s',
          }}>
            <div style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px'}}>58%</div>
            <div style={{fontSize: '1.15rem', fontWeight: 400}}>ask friends for advice</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.18)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px 0 rgba(255, 184, 77, 0.13)',
            padding: '40px 32px',
            minWidth: '260px',
            maxWidth: '320px',
            flex: '1 1 260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            transition: 'transform 0.2s',
          }}>
            <div style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px'}}>65%</div>
            <div style={{fontSize: '1.15rem', fontWeight: 400}}>use social media for money tips</div>
          </div>
        </div>
      </div>

      <div className="security-section animate-on-scroll fade-in" style={{
        position: 'relative',
        backgroundImage: "linear-gradient(90deg, rgba(247,179,122,0.3) 0%, rgba(247,214,178,0.3) 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '200px 0',
        minHeight: '90vh',
      }}>
        <h2 style={{ color: '#fff', fontSize: '3rem', fontWeight: 800, marginLeft: '8vw', marginBottom: '48px' }}>Security and Compliance</h2>
        <div className="security-glass-grid" style={{
          display: 'flex',

          gap: '32px',
          justifyContent: 'center',
          margin: '0 auto',
          maxWidth: '1600px',
          width: '100vw',
        }}>
          <div className="security-glass-card">
            <div className="security-icon">
              {/* Shield icon (Bank icon reused) */}
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M4 10h16M5 10V8.5A1.5 1.5 0 0 1 6.5 7h11A1.5 1.5 0 0 1 19 8.5V10m-2 4v2m-4-2v2m-4-2v2" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3>SOC 2 compliant</h3>
            <p>Lumeo is built on industry-leading SOC 2 standards, so your privacy and security are always our top priority.</p>
          </div>
          <div className="security-glass-card">
            <div className="security-icon">
              {/* Lock icon */}
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M8 11V9a4 4 0 1 1 8 0v2" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="11" width="12" height="7" rx="2" stroke="#ea580c" strokeWidth="1.5"/></svg>
            </div>
            <h3>All your data is encrypted</h3>
            <p>With Lumeo, every piece of your information is protected by bank-level encryption—both in transit and at rest.</p>
          </div>
          <div className="security-glass-card">
            <div className="security-icon">
              {/* Read-only icon */}
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="#ea580c" strokeWidth="1.5"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="#ea580c" strokeWidth="1.5"/></svg>
            </div>
            <h3>We don't save your data</h3>
            <p>Lumeo never stores your sensitive information. Your data stays yours—private, secure, and never saved on our servers.</p>
          </div>
        </div>
      </div>

      <div className="bounce-in">
        <FAQ />
      </div>
    </div>
  );
};

export default Products; 