'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
              src="/assets/logos/HEB-White-Logo@4x.png" 
              alt="Happily Ever Bakers" 
              width={200} 
              height={60}
              className="header-logo"
              style={{ 
                width: 'auto', 
                height: '50px',
                objectFit: 'contain'
              }}
            />
          </div>
          
          <div className="header-right">
            <Link href="/"><button className="order-now-header-btn">Order Now</button></Link>
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
            <Link href="/" className="menu-link" onClick={toggleMenu}>Shop</Link>
            <Link href="/" className="menu-link" onClick={toggleMenu}>Order</Link>
                <Link href="/dashboard" className="menu-link" onClick={toggleMenu}>Dashboard</Link>
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
          height: 80px;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .menu-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .menu-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hamburger span {
          width: 22px;
          height: 3px;
          background: #2c2c2c;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .menu-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c2c2c;
          letter-spacing: 0.5px;
        }

        .header-center {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }

        .header-logo {
          height: 50px !important;
          width: auto !important;
          max-width: 200px;
          object-fit: contain !important;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
        }

        .header-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
        }

        .order-now-header-btn {
          background: #2c2c2c;
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          letter-spacing: 0.5px;
        }

        .order-now-header-btn:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1001;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .menu-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 350px;
          height: 100vh;
          background: white;
          padding: 3rem 2rem;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          box-shadow: 4px 0 20px rgba(0,0,0,0.1);
        }

        .menu-overlay.active .menu-content {
          transform: translateX(0);
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .sign-in-text {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2c2c2c;
          letter-spacing: 0.5px;
        }

        .close-menu {
          background: #E91E63;
          color: white;
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.4rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }

        .close-menu:hover {
          background: #C2185B;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(233, 30, 99, 0.4);
        }

        .menu-nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .menu-link {
          font-size: 1.6rem;
          font-weight: 700;
          color: #2c2c2c;
          text-decoration: none;
          padding: 1rem 0;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
          letter-spacing: 0.5px;
        }

        .menu-link:hover {
          color: #E91E63;
          border-bottom-color: #E91E63;
          transform: translateX(10px);
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 1rem;
          }

          .header-logo {
            height: 45px !important;
            max-width: 180px;
          }

          .order-now-header-btn {
            padding: 12px 24px;
            font-size: 1rem;
          }

          .menu-content {
            width: 300px;
            padding: 2rem 1.5rem;
          }

          .menu-text {
            font-size: 1rem;
          }

          .hamburger span {
            width: 20px;
            height: 2px;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            padding: 0 0.75rem;
          }

          .header-logo {
            height: 40px !important;
            max-width: 160px;
          }

          .order-now-header-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .menu-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
