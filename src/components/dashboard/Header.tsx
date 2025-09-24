'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import CartSidebar from '@/components/CartSidebar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state, clearCart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
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
            <Image 
              src="/images/logos/heb-white-logo.png" 
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
            <button className="cart-link" onClick={toggleCart}>
              <div className="cart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                </svg>
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </div>
            </button>
            <Link href="/order"><button className="order-now-header-btn">Order Now</button></Link>
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

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

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
          gap: 1rem;
          flex: 1;
        }

        .cart-link {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transition: all 0.3s ease;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }

        .cart-link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .cart-icon {
          color: #2c2c2c;
          font-size: 1.5rem;
        }

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #e91e63;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(233, 30, 99, 0.3);
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

          .cart-link {
            width: 45px;
            height: 45px;
          }

          .cart-badge {
            width: 20px;
            height: 20px;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  );
}
