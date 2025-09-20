'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="dashboard-header">
        <div className="header-container">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleMenu}>
              <span className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className="menu-text">Menu</span>
            </button>
          </div>
          
          <div className="header-center">
            <Image 
              src="/assets/logos/HEB-Pink-Logo@4x.png" 
              alt="Happily Ever Bakers" 
              width={120} 
              height={40}
              className="header-logo"
            />
          </div>
          
          <div className="header-right">
            <button className="order-now-header-btn">Order Now</button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-content">
          <div className="menu-header">
            <span className="sign-in-text">Sign in</span>
            <button className="close-menu" onClick={toggleMenu}>
              <span>×</span>
            </button>
          </div>
          
          <nav className="menu-nav">
            <a href="/" className="menu-link">Home</a>
            <a href="/order" className="menu-link">Order</a>
            <a href="/locations" className="menu-link">Locations</a>
            <a href="/catering" className="menu-link">Catering</a>
            <a href="/gift-cards" className="menu-link">Gift Cards</a>
            <a href="/merch" className="menu-link">Merch</a>
          </nav>
        </div>
      </div>

      <style jsx>{`
        .dashboard-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #F8BBD9;
          z-index: 1000;
          height: 70px;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .menu-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }

        .menu-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .hamburger span {
          width: 20px;
          height: 2px;
          background: #2c2c2c;
          transition: all 0.3s ease;
        }

        .menu-text {
          font-size: 1rem;
          font-weight: 600;
          color: #2c2c2c;
        }

        .header-center {
          display: flex;
          align-items: center;
        }

        .header-logo {
          height: 40px;
          width: auto;
        }

        .header-right {
          display: flex;
          align-items: center;
        }

        .order-now-header-btn {
          background: #2c2c2c;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .order-now-header-btn:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1001;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .menu-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 300px;
          height: 100vh;
          background: white;
          padding: 2rem;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .menu-overlay.active .menu-content {
          transform: translateX(0);
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }

        .sign-in-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2c2c2c;
        }

        .close-menu {
          background: #E91E63;
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .close-menu:hover {
          background: #C2185B;
          transform: scale(1.1);
        }

        .menu-nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .menu-link {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2c;
          text-decoration: none;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }

        .menu-link:hover {
          color: #E91E63;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 1rem;
          }

          .header-logo {
            height: 35px;
          }

          .order-now-header-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .menu-content {
            width: 280px;
          }
        }
      `}</style>
    </>
  );
}
