import React, { useState, useEffect } from 'react';

const PrivacyPolicy = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyHTML = async () => {
      try {
        const response = await fetch('/privacy.html');
        if (!response.ok) {
          throw new Error('Failed to fetch privacy policy');
        }
        const content = await response.text();
        setHtmlContent(content);
      } catch (err) {
        console.error('Error fetching privacy policy:', err);
        setError('Failed to load privacy policy');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyHTML();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading privacy policy...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '18px',
        color: '#ff0000'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div 
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        lineHeight: '1.6',
        fontFamily: 'Arial, sans-serif'
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default PrivacyPolicy; 