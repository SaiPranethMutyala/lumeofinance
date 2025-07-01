import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Products.css';
import FAQ from './FAQ';

const Products = () => {
  useScrollAnimation();

  return (
    <div className="products-page">
      <div className="budget-your-way-section animate-on-scroll fade-in">
        <div className="budget-content">
          <h1>The Money<br />App.</h1>
          <div className="feature-box">
            <ul>
              <li>Win all your money goals and your life</li>
              <li>Talk with Lumeo, your favorite finance friend</li>
              <li>Gamified saving challenges with leaderboards</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="join-section animate-on-scroll fade-in">
        <div className="stars">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
        </div>
        <h3>Join the revolution. Join Lumeo.</h3>
        <p>
          Join lumeo on 
                <button className="store-button">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }} viewBox="0 0 16 16">
                    <path d="M11.182.008C10.148-.03 9.05.235 8.058.715c-.992.48-1.803 1.228-2.494 2.06C4.823 3.687 4.157 4.597 4.015 5.586c-.143.989.358 2.053.97 2.83.613.776 1.48 1.346 2.414 1.638.934.292 1.928.24 2.84-.136.913-.377 1.715-.967 2.328-1.693.613-.726.98-1.63.98-2.588 0-.02-.002-.04-.002-.06a4.93 4.93 0 0 0-1.558-3.55C12.37.818 11.782.262 11.182.008ZM10.275 1.132c.571.492 1.024 1.21 1.024 1.956 0 .04-.002.08-.006.12a3.48 3.48 0 0 0-1.998-1.19c.744-.333 1.35-.37 1.998.114Z"/>
                </svg> */}
                App Store
            </button>
            and
            <button className="store-button">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }} viewBox="0 0 16 16">
                    <path d="M14.222 9.374c1.037-.61.998-1.484-.048-1.708L2.92 1.713A2.5 2.5 0 0 0 .092 3.857v8.286a2.5 2.5 0 0 0 2.828 2.47l11.302-6.241ZM2.525 6.425l6.237 3.469-6.877 3.82a1.5 1.5 0 0 1-1.888-1.393V6.425Z"/>
                </svg> */}
                Google Store coming soon...
            </button>
        </p>
      </div>

  

      <div className="smarter-budgeting-section animate-on-scroll fade-in-up" style={{background: 'none', padding: '80px 0'}}>
        <h2 style={{
          fontSize: '3.2rem',
          fontWeight: 900,
          color: '#F97316',
          margin: '0 0 48px 80px',
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
          textAlign: 'left',
          marginLeft: 25
        }}>
          Finance that finally <br/> fits for real
        </h2>
        <div style={{
          display: 'flex',
          
          gap: '48px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <div className="image-content" style={{
            flex: 1,
            width: '800',
            maxWidth: '800px',
            height: '500px',
            borderRadius: '32px',
            backgroundImage: "url('/images/p2.PNG')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            marginTop: -20,
          }} />
          <div style={{
            flex: 1,
            width: '600',
            maxWidth: '600px',
            height: '370px',
            background: '#fff',
            borderRadius: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            padding: '64px 56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '400px',
            maxHeight: 500,
            marginTop: 0,
          }}>
            <h3 style={{
              fontSize: '2.8rem',
              fontWeight: 900,
              color: '#F97316',
              margin: 0,
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              textAlign: 'left',
            }}>
              All your money in one place.
            </h3>
            <p style={{
              fontSize: '1.35rem',
              color: '#F97316',
              margin: '28px 0 0 0',
              fontWeight: 400,
              lineHeight: 1.5,
              textAlign: 'left',
            }}>
              Connect all your banks, cards, and savings accounts. Lumeo automatically tracks what's coming in, what's going out, and what's left to spend.
            </p>
          </div>
        </div>
      </div>
      <div className="should-money-be-social-section animate-on-scroll fade-in" style={{
        minHeight: '101vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: "url('/images/p69.PNG') center center / cover no-repeat",
        margin: '48px 0',
        textAlign: 'left',
        boxShadow: '0 4px 32px rgba(255, 167, 38, 0.07)',
        position: 'relative',
        borderRadius: '40px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '54%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          zIndex: 2,
          padding: '0 0 0 64px',
        }}>
          <div style={{
            background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.32) 100%)',
            backdropFilter: 'blur(18px)',
            borderRadius: '40px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            padding: '32px 32px',
            maxWidth: '500px',
            width: '100%',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '575px',
            marginLeft:-30,
          }}>
            <h1 style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              margin: 0,
              color: '#fff',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              textAlign: 'left',
              textShadow: '0 2px 12px rgba(0,0,0,0.18)',
            }}>
              Should money be social?
            </h1>
            <h2 style={{
              fontSize: '1.25rem',
              color: '#fff',
              fontWeight: 400,
              margin: '16px 0 0 0',
              lineHeight: 1.4,
              textAlign: 'left',
              textShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}>
              Studies show users exposed to leaderboards saved 57% more.
            </h2>
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
        backgroundImage: "linear-gradient(90deg, rgba(247,179,122,0.92) 0%, rgba(247,214,178,0.92) 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '80px 0',
      }}>
        <h2 style={{ color: '#fff', fontSize: '3rem', fontWeight: 800, marginLeft: '8vw', marginBottom: '48px' }}>Security and Compliance</h2>
        <div className="security-glass-grid" style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          margin: '0 auto',
          maxWidth: '1200px',
        }}>
          <div className="security-glass-card" style={{
            background: 'rgba(255,255,255,0.13)',
            borderRadius: '32px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.18)',
            padding: '40px 32px',
            minWidth: '320px',
            maxWidth: '350px',
            flex: '1 1 320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <div className="security-icon" style={{background: 'rgba(44,28,15,0.13)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px'}}>
              {/* Bank icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M4 10h16M5 10V8.5A1.5 1.5 0 0 1 6.5 7h11A1.5 1.5 0 0 1 19 8.5V10m-2 4v2m-4-2v2m-4-2v2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 style={{color: '#fff', fontSize: '2rem', fontWeight: 700, margin: '0 0 12px 0'}}>Bank-level 256-bit encryption</h3>
            <p style={{color: '#fff', fontSize: '1.1rem', fontWeight: 400, margin: 0}}>Your bank login details are never stored.<br/><br/>When Cleo needs to connect to your bank, we use Plaid to securely transfer your data using the latest security technology.</p>
          </div>
          <div className="security-glass-card" style={{
            background: 'rgba(255,255,255,0.13)',
            borderRadius: '32px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.18)',
            padding: '40px 32px',
            minWidth: '320px',
            maxWidth: '350px',
            flex: '1 1 320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <div className="security-icon" style={{background: 'rgba(44,28,15,0.13)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px'}}>
              {/* Lock icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M8 11V9a4 4 0 1 1 8 0v2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="11" width="12" height="7" rx="2" stroke="#fff" strokeWidth="1.5"/></svg>
            </div>
            <h3 style={{color: '#fff', fontSize: '2rem', fontWeight: 700, margin: '0 0 12px 0'}}>Data protection</h3>
            <p style={{color: '#fff', fontSize: '1.1rem', fontWeight: 400, margin: 0}}>We never sell your data to third parties. Period.</p>
          </div>
          <div className="security-glass-card" style={{
            background: 'rgba(255,255,255,0.13)',
            borderRadius: '32px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.18)',
            padding: '40px 32px',
            minWidth: '320px',
            maxWidth: '350px',
            flex: '1 1 320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <div className="security-icon" style={{background: 'rgba(44,28,15,0.13)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px'}}>
              {/* Read-only icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="#fff" strokeWidth="1.5"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="#fff" strokeWidth="1.5"/></svg>
            </div>
            <h3 style={{color: '#fff', fontSize: '2rem', fontWeight: 700, margin: '0 0 12px 0'}}>Read-only mode</h3>
            <p style={{color: '#fff', fontSize: '1.1rem', fontWeight: 400, margin: 0}}>Cleo can only view your transaction data in read-only mode. At no time can Cleo access your accounts.</p>
          </div>
        </div>
      </div>

      <FAQ />
    </div>
  );
};

export default Products; 