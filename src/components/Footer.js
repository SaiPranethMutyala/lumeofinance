import React from 'react';

const Footer = () => (
  <div
    style={{
      scrollSnapAlign: 'start',
      minHeight: '364px',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
      background: '#ea580c',
      color: '#fff',
      padding: 0,
    }}
  >
    <footer
      style={{
        width: '100%',
        minHeight: '364px',
        padding: '64px 0 32px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        background: '#ea580c',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '64px',
          fontSize: '1.25rem',
          marginLeft: '48px',
        }}
      >
        <div style={{ minWidth: 180, marginBottom: 24, marginRight: 48 }}>
          <div style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.03em', marginBottom: 12 }}>Lumeo</div>
          <div style={{ fontWeight: 500, fontSize: '1rem', marginTop: 8 }}>The Social Finance App</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Work At Lumeo</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>Company</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>Careers</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Information</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>FAQs</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>Policies</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>Terms & Conditions</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Socials</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>Instagram</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>Twitter</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>TikTok</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>LinkedIn</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Contact</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>team@lumeofinance.com</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>© 2025 Lumeo. All rights reserved.</div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer; 