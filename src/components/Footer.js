import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ solid }) => {
  const navigate = useNavigate();
  
  const handlePrivacyPolicy = () => {
    navigate('/privacy-policy/');
  };

  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        width: '100%',
        background: '#ea580c',
        color: '#fff',
        padding: '40px 20px 20px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <footer>
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '40px',
            fontSize: '1.25rem',
            marginBottom: '30px',
          }}
        >
          <div style={{ minWidth: '200px', marginBottom: '24px' }}>
            <div style={{ 
              fontWeight: '900', 
              fontSize: '1.5rem', 
              letterSpacing: '-0.03em', 
              marginBottom: '12px' 
            }}>
              Lumeo
            </div>
            <div style={{ 
              fontWeight: '500', 
              fontSize: '1rem', 
              marginTop: '8px',
              opacity: '0.9'
            }}>
              The Social Finance App
            </div>
          </div>
          
          <div style={{ minWidth: '150px', marginBottom: '24px' }}>
            <div style={{ fontWeight: '700', marginBottom: '16px' }}>Work At Lumeo</div>
            <div style={{ 
              fontSize: '1rem', 
              marginBottom: '8px',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              ':hover': { opacity: '0.8' }
            }}>
              Company
            </div>
            <div style={{ 
              fontSize: '1rem', 
              marginBottom: '8px',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              ':hover': { opacity: '0.8' }
            }}>
              Careers
            </div>
          </div>
          
          <div style={{ minWidth: '150px', marginBottom: '24px' }}>
            <div style={{ fontWeight: '700', marginBottom: '16px' }}>Information</div>
            <div style={{ 
              fontSize: '1rem', 
              marginBottom: '8px',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              ':hover': { opacity: '0.8' }
            }}>
              FAQs
            </div>
            <div 
              style={{ 
                fontSize: '1rem', 
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                textDecoration: 'underline',
                ':hover': { opacity: '0.8' }
              }}
              onClick={handlePrivacyPolicy}
            >
              Privacy Policy
            </div>
            <div style={{ 
              fontSize: '1rem', 
              marginBottom: '8px',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              ':hover': { opacity: '0.8' }
            }}>
              Terms & Conditions
            </div>
          </div>
          
          <div style={{ minWidth: '150px', marginBottom: '24px' }}>
            <div style={{ fontWeight: '700', marginBottom: '16px' }}>Socials</div>
            <div 
              style={{ 
                fontSize: '1rem', 
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                ':hover': { opacity: '0.8' }
              }}
              onClick={() => handleLinkClick('https://instagram.com/lumeofinance')}
            >
              Instagram
            </div>
            <div 
              style={{ 
                fontSize: '1rem', 
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                ':hover': { opacity: '0.8' }
              }}
              onClick={() => handleLinkClick('https://twitter.com/lumeofinance')}
            >
              Twitter
            </div>
            <div 
              style={{ 
                fontSize: '1rem', 
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                ':hover': { opacity: '0.8' }
              }}
              onClick={() => handleLinkClick('https://tiktok.com/@lumeofinance')}
            >
              TikTok
            </div>
            <div 
              style={{ 
                fontSize: '1rem', 
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                ':hover': { opacity: '0.8' }
              }}
              onClick={() => handleLinkClick('https://linkedin.com/company/lumeofinance')}
            >
              LinkedIn
            </div>
          </div>
          
          <div style={{ minWidth: '200px', marginBottom: '24px' }}>
            <div style={{ fontWeight: '700', marginBottom: '16px' }}>Contact</div>
            <div 
              style={{ 
                fontSize: '1rem', 
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                ':hover': { opacity: '0.8' }
              }}
              onClick={() => handleLinkClick('mailto:team@lumeofinance.com')}
            >
              team@lumeofinance.com
            </div>
          </div>
        </div>
        
        <div style={{ 
          fontWeight: '700', 
          fontSize: '1.1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '20px',
          marginTop: '20px'
        }}>
          © 2025 Lumeo. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer; 