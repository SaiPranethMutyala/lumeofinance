import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GLOBAL_PASSWORD = '123'; // Change this to your actual global password

const Loginpage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistMsg, setWaitlistMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === GLOBAL_PASSWORD) {
      setError('');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/homepage'); // Redirect to homepage
    } else {
      setError('Incorrect password.');
    }
  };

  const handleWaitlist = () => {
    setShowWaitlist(true);
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setWaitlistMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: waitlistName, email: waitlistEmail, phone: waitlistPhone }),
      });
      const data = await res.json();
      if (res.ok) {
        setWaitlistMsg('You have been added to the waitlist!');
        setWaitlistName('');
        setWaitlistEmail('');
        setWaitlistPhone('');
      } else {
        setWaitlistMsg(data.error || 'Error joining waitlist.');
      }
    } catch {
      setWaitlistMsg('Network error.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.7
        }}
      >
        <source src="/Cruise_Phone_Video_Generation_Complete.mov" type="video/mp4" />
        <source src="/Cruise_Phone_Video_Generation_Complete.mov" type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <form onSubmit={handleLogin} style={{ background: 'rgba(255,255,255,0.92)', padding: '2rem 2.5rem', borderRadius: '18px', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '320px' }}>
          <h2 style={{ margin: 0, color: '#ea580c', textAlign: 'center' }}>Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
          />
          {error && <div style={{ color: 'red', fontSize: '0.95rem', textAlign: 'center' }}>{error}</div>}
          <button type="submit" style={{ background: 'linear-gradient(135deg, #fd9e00, #f97316)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Login</button>
          <button type="button" onClick={handleWaitlist} style={{ background: '#fff', color: '#ea580c', border: '2px solid #ea580c', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Join Waitlist</button>
        </form>
      </div>

      {showWaitlist && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, boxSizing: 'border-box'
        }}>
          <form onSubmit={handleWaitlistSubmit} style={{
            background: '#fff', padding: '2rem 2.5rem', borderRadius: '18px',
            boxShadow: '0 4px 32px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: '1.2rem', minWidth: '320px'
          }}>
            <h2 style={{ margin: 0, color: '#ea580c', textAlign: 'center' }}>Join Waitlist</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={waitlistName}
              onChange={e => setWaitlistName(e.target.value)}
              required
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={waitlistEmail}
              onChange={e => setWaitlistEmail(e.target.value)}
              required
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              value={waitlistPhone}
              onChange={e => setWaitlistPhone(e.target.value)}
              required
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
            />
            {waitlistMsg && <div style={{ color: waitlistMsg.includes('added') ? 'green' : 'red', fontSize: '0.95rem', textAlign: 'center' }}>{waitlistMsg}</div>}
            <button type="submit" style={{ background: 'linear-gradient(135deg, #fd9e00, #f97316)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Submit</button>
            <button type="button" onClick={() => setShowWaitlist(false)} style={{ background: '#fff', color: '#ea580c', border: '2px solid #ea580c', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Cancel</button>
          </form>
        </div>
      )}

      <div style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        width: '80px', // adjust as needed
        height: '40px', // adjust as needed
        background: 'rgba(255,255,255,0.7)', // or match your background
        zIndex: 2
      }} />
    </div>
  );
};

export default Loginpage;
