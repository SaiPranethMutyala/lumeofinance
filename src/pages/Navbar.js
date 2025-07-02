import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [productsDropdown, setProductsDropdown] = useState(false);
    const [aboutDropdown, setAboutDropdown] = useState(false);
    const productsTimeoutRef = useRef(null);
    const aboutTimeoutRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleMouseEnter = (dropdownType) => {
        if (dropdownType === 'products') {
            if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
            setProductsDropdown(true);
        } else if (dropdownType === 'about') {
            if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
            setAboutDropdown(true);
        }
    };

    const handleMouseLeave = (dropdownType) => {
        const timeout = setTimeout(() => {
            if (dropdownType === 'products') setProductsDropdown(false);
            else if (dropdownType === 'about') setAboutDropdown(false);
        }, 100);

        if (dropdownType === 'products') productsTimeoutRef.current = timeout;
        else aboutTimeoutRef.current = timeout;
    };

    const handleGetAppClick = () => {
        if (/iPhone/i.test(navigator.userAgent)) {
            window.location.href = 'https://apps.apple.com/us/app/lumeo-social-finance/id6747216538';
        } else {
            setShowModal(true);
        }
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            navigate('/homepage');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            {/* <div className="navbar-top-bar"></div> */}
            <div className="navbar-content">
                <a href="#" className="navbar-logo" onClick={handleLogoClick}>
                    <img src="/images/logo.png" alt="Lumeo Logo" />
                </a>
                
                <div className={`navbar-links-container ${menuOpen ? 'open' : ''}`}>
                    <div className="navbar-center-links">
                        <div className="navbar-links">
                            <div 
                                className="nav-item"
                                onMouseEnter={() => handleMouseEnter('products')}
                                onMouseLeave={() => handleMouseLeave('products')}
                            >
                                <Link to="/products" className="nav-link">Products</Link>
                                {/* {productsDropdown && (
                                    <div 
                                        className="dropdown"
                                        onMouseEnter={() => handleMouseEnter('products')}
                                        onMouseLeave={() => handleMouseLeave('products')}
                                    >
                                        <Link to="/products">Product</Link>
                                    </div>
                                )} */}
                            </div>
                            <div 
                                className="nav-item"
                                onMouseEnter={() => handleMouseEnter('about')}
                                onMouseLeave={() => handleMouseLeave('about')}
                            >
                                <Link to="/story" className="nav-link">About</Link>
                                {aboutDropdown && (
                                    <div 
                                        className="dropdown"
                                        onMouseEnter={() => handleMouseEnter('about')}
                                        onMouseLeave={() => handleMouseLeave('about')}
                                    >
                                        <Link to="/team">The Team</Link>
                                        <Link to="/story">The Story</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="navbar-action">
                    <button className="btn btn-primary" onClick={handleGetAppClick}>Get the app</button>
                </div>

                <button className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </button>
            </div>

            {/* Modal for QR code */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    boxSizing: 'border-box'
                }} onClick={() => setShowModal(false)}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '18px',
                        padding: '40px 32px',
                        minWidth: '320px',
                        minHeight: '320px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                    }} onClick={e => e.stopPropagation()}>
                        <h2 style={{marginBottom: '24px', color: '#F97316', fontWeight: 800, fontSize: '2rem'}}>Scan to download now!</h2>
                        <img src="/images/qr.png" alt="Lumeo App QR Code" style={{width: 180, height: 180, borderRadius: '16px', marginBottom: '18px', objectFit: 'cover', background: '#eee'}} />
                        <button style={{marginTop: 8, background: '#F97316', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer'}} onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 