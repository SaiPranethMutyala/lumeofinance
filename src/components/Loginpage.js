import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';

const GLOBAL_PASSWORD = 'JULY2025'; 

const Loginpage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistMsg, setWaitlistMsg] = useState('');
  const [waitlistNumber, setWaitlistNumber] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt with password:", password);
    console.log("Expected password:", GLOBAL_PASSWORD);
    console.log("Password match:", password === GLOBAL_PASSWORD);
    
    if (password === GLOBAL_PASSWORD) { // Simple password check - you can modify this logic
      setError('');
      console.log("Login successful! Setting localStorage and navigating...");
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginTime', Date.now().toString()); // Store login timestamp for 1-minute timer
      console.log("localStorage set, navigating to homepage...");
      navigate('/homepage'); // Redirect to homepage
      console.log("bdvkfbv")
    } else {
      console.log("Login failed - invalid password");
      setError('Invalid Password.');
    }
  };

  const handleWaitlist = () => {
    setShowWaitlist(true);
  };

  const getNextWaitlistNumber = async () => {
    try {
      // Get the total count of documents in the waitlist collection
      const querySnapshot = await getDocs(collection(db, "LumeoWaitlist"));
      return querySnapshot.size + 1; // Next number will be current count + 1
    } catch (error) {
      console.error("Error getting waitlist count: ", error);
      return 1; // Default to 1 if there's an error
    }
  };

  // const formatWaitlistNumber = (number) => {
  //   // Format as WL-0001, WL-0002, etc.
  //   return `WL-${number.toString().padStart(4, '0')}`;
  // };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setWaitlistMsg('');
    try {
      // Add document to the "waitlist" collection in Firebase
      await addDoc(collection(db, "LumeoWaitlist"), {
        name: waitlistName,
        email: waitlistEmail,
        phone: waitlistPhone,
        timestamp: serverTimestamp()
      });
      setWaitlistMsg('You have been added to the waitlist!');
      setWaitlistName('');
      setWaitlistEmail('');
      setWaitlistPhone('');
    } catch (error) {
      setWaitlistMsg('Error joining waitlist. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
      <video
        autoPlay
         loop
        muted
        playsInline
        onError={(e) => {
          console.error('Video failed to load:', e);
          console.log('Trying to load video from:', '/video.mov');
        }}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play successfully')}
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
        <source src="/video.mov" type="video/mp4" />
        <source src="/video.mov" type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
      
      {/* Fallback background if video fails */}
      {/* <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        zIndex: -1
      }}></div> */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <form onSubmit={handleLogin} style={{ 
          background: 'rgba(255,255,255,0.92)', 
          padding: '2rem 2.5rem', 
          borderRadius: '18px', 
          boxShadow: '0 4px 32px rgba(0,0,0,0.08)', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem', 
          minWidth: '320px' 
        }}>
          <h2 style={{ margin: 0, color: '#ea580c', textAlign: 'center' }}>Login</h2>
          <input
            type="text"
            placeholder="Enter Password...."
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
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <form onSubmit={handleWaitlistSubmit} style={{
            background: '#fff', padding: '2rem 2.5rem', borderRadius: '18px',
            boxShadow: '0 4px 32px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: '1.2rem', minWidth: '320px', position: 'relative'
          }}>
            {/* Cross button in top-right corner of the form box */}
            <button 
              onClick={() => {
                setShowWaitlist(false);
                setWaitlistNumber(null);
                setWaitlistMsg('');
                setWaitlistName('');
                setWaitlistEmail('');
                setWaitlistPhone('');
              }}
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                background: '#ea580c',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 10
              }}
            >
              ×
            </button>
            
            <h2 style={{ margin: 0, color: '#ea580c', textAlign: 'center' }}>Join Waitlist</h2>
            
            {waitlistNumber ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  color: '#f97316', 
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, #fd9e00, #f97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {waitlistMsg}
                </div>
                <div style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem' }}>
                  Thank you for joining our waitlist!
                </div>
              </div>
            ) : (
              <>
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
                  type="text"
                  placeholder="Your Phone"
                  value={waitlistPhone}
                  onChange={e => setWaitlistPhone(e.target.value)}
                  style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                />
                {waitlistMsg && <div style={{ color: waitlistMsg.includes('added') ? 'green' : 'red', fontSize: '0.95rem', textAlign: 'center' }}>{waitlistMsg}</div>}
                <button type="submit" style={{ background: 'linear-gradient(135deg, #fd9e00, #f97316)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Submit</button>
              </>
            )}
            
            <button type="button" onClick={() => {
              setShowWaitlist(false);
              setWaitlistNumber(null);
              setWaitlistMsg('');
              setWaitlistName('');
              setWaitlistEmail('');
              setWaitlistPhone('');
            }} style={{ background: '#fff', color: '#ea580c', border: '2px solid #ea580c', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>
              {waitlistNumber ? 'Close' : 'Cancel'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Loginpage;
