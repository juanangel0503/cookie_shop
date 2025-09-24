'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, clearCart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
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
            <span className="crumbl-logo">crumbl</span>
          </div>
          
          <div className="header-right">
            <Link href="/checkout" className="view-bag-btn">
              <span className="bag-icon">🛍️</span>
              <span className="bag-text">View Bag</span>
              {getTotalItems() > 0 && (
                <span className="bag-badge">{getTotalItems()}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Order Details Bar */}
      <div className="order-details-bar">
        <div className="order-info">
          <div className="order-item">
            <span className="order-icon">🏠</span>
            <span className="order-text">Carry Out</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="order-item">
            <span className="order-icon">🕐</span>
            <span className="order-text">Today - 12:10 pm</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="order-item">
            <span className="order-icon">📍</span>
            <span className="order-text">Tikahtnu Commons - 111...</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
      </div>

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
            <Link href="/" className="menu-link" onClick={toggleMenu}>Home</Link>
            <Link href="/order" className="menu-link" onClick={toggleMenu}>Order</Link>
            <Link href="/order/location" className="menu-link" onClick={toggleMenu}>Locations</Link>
            {getTotalItems() > 0 && (
              <button className="clear-cart-btn" onClick={handleClearCart}>
                🗑️ Clear Cart ({getTotalItems()} items)
              </button>
            )}
          </nav>
        </div>
      </div>

      <style jsx>{`
        .dashboard-header {
          --tw-bg-opacity: 1;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          --tw-bg-opacity: 1;
          background: rgb(255 185 205/var(--tw-bg-opacity));
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

        .crumbl-logo {
          font-size: 2rem;
          font-weight: 700;
          color: #2c2c2c;
          letter-spacing: -0.5px;
        }

        .header-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
        }

        .view-bag-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #2c2c2c;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
        }

        .view-bag-btn:hover {
          background: #1a1a1a;
          transform: translateY(-1px);
        }

        .bag-icon {
          font-size: 1.2rem;
        }

        .bag-text {
          font-size: 1rem;
        }

        .bag-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #e91e63;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 600;
          border: 2px solid white;
        }

        .order-details-bar {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
          z-index: 999;
          padding: 1rem 0;
        }

        .order-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .order-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 6px;
        }

        .order-item:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .order-icon {
          font-size: 1.1rem;
        }

        .order-text {
          font-weight: 600;
          color: #2c2c2c;
          font-size: 0.9rem;
        }

        .dropdown-arrow {
          color: #666;
          font-size: 0.8rem;
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
          background: rgb(255 185 205/var(--tw-bg-opacity));
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
          background: rgb(255 185 205/var(--tw-bg-opacity));
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
          color: rgb(255 185 205/var(--tw-bg-opacity));
          border-bottom-color: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateX(10px);
        }

        .clear-cart-btn {
          background: #e91e63;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .clear-cart-btn:hover {
          background: #c2185b;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 1rem;
          }

          .order-info {
            gap: 1rem;
            padding: 0 1rem;
          }

          .order-item {
            flex-direction: column;
            gap: 0.25rem;
            text-align: center;
          }

          .order-text {
            font-size: 0.8rem;
          }

          .view-bag-btn {
            padding: 10px 16px;
            font-size: 0.9rem;
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

          .order-info {
            gap: 0.5rem;
            padding: 0 0.75rem;
          }

          .order-item {
            padding: 0.25rem;
          }

          .order-text {
            font-size: 0.7rem;
          }

          .view-bag-btn {
            padding: 8px 12px;
            font-size: 0.8rem;
          }

          .menu-text {
            display: none;
          }

          .bag-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
