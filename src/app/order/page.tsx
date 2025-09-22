'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function OrderLanding() {
  return (
    <div className="order-page">
      {/* Header matching Crumbl style */}
      <header className="order-header">
        <div className="header-content">
          <button className="menu-button">
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="menu-text">Menu</span>
          </button>
          
          <div className="logo">
            <h1>crumbl</h1>
          </div>
          
          <div className="header-spacer"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="order-main">
        <div className="order-container">
          <h1 className="title">Start an Order</h1>
          
          <div className="choices-grid">
            <Link href="/order/menu?method=delivery" className="choice-card delivery">
              <div className="card-illustration">
                <Image
                  src="/images/icons/delivery-icon.png"
                  alt="Delivery"
                  width={100}
                  height={100}
                  className="icon-image"
                />
              </div>
              <h3 className="card-title">Delivery</h3>
            </Link>

            <Link href="/order/menu?method=pickup" className="choice-card pickup">
              <div className="card-illustration">
                <Image
                  src="/images/icons/pickup-icon.png"
                  alt="Pickup"
                  width={100}
                  height={100}
                  className="icon-image"
                />
              </div>
              <h3 className="card-title">Pickup</h3>
            </Link>

            <div className="choice-card disabled">
              <div className="card-illustration">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="15" y="20" width="30" height="20" rx="3" fill="none" stroke="#333" strokeWidth="2"/>
                  <rect x="20" y="25" width="20" height="10" rx="2" fill="#333"/>
                  <rect x="25" y="30" width="10" height="2" fill="white"/>
                  <path d="M15 20 L30 10 L45 20" stroke="#333" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="card-title">Digital Gift Cards</h3>
            </div>

            <div className="choice-card disabled">
              <div className="card-illustration">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <ellipse cx="30" cy="35" rx="20" ry="15" fill="none" stroke="#333" strokeWidth="2"/>
                  <rect x="25" y="25" width="10" height="8" rx="2" fill="#333"/>
                  <circle cx="30" cy="20" r="3" fill="#333"/>
                  <path d="M27 20 L30 15 L33 20" stroke="#333" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="card-title">Catering</h3>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .order-page {
          min-height: 100vh;
          background: white;
        }

        .order-header {
          background: #F8BBD9;
          padding: 1rem 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .menu-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .menu-button:hover {
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
          background: #333;
          border-radius: 1px;
        }

        .menu-text {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
        }

        .logo h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #333;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .header-spacer {
          width: 100px;
        }

        .order-main {
          padding: 4rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 80px);
        }
        
        .order-container { 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 0 2rem; 
          text-align: center;
        }
        
        .title { 
          font-size: 3.5rem; 
          font-weight: 800; 
          margin-bottom: 4rem; 
          color: #333;
          letter-spacing: -0.02em;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .choices-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .choice-card {
          background: white;
          border: none;
          border-radius: 20px;
          padding: 3rem 2rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          position: relative;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .choice-card:hover:not(.disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.2);
        }
        
        .choice-card.delivery {
          background: #F8BBD9;
        }
        
        .choice-card.pickup {
          background: #F8BBD9;
        }
        
        .choice-card.disabled {
          opacity: 0.8;
          cursor: not-allowed;
          background: white;
        }
        
        .card-illustration {
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .icon-image {
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
        
        .card-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        @media (max-width: 768px) {
          .header-content {
            padding: 0 1rem;
          }
          
          .order-main {
            padding: 2rem 0;
          }
          
          .title {
            font-size: 2.8rem;
            margin-bottom: 3rem;
          }
          
          .choices-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            max-width: 400px;
          }
          
          .choice-card {
            min-height: 220px;
            padding: 2.5rem 2rem;
          }
          
          .card-title {
            font-size: 1.6rem;
          }
        }
        
        @media (max-width: 480px) {
          .title {
            font-size: 2.2rem;
          }
          
          .choice-card {
            padding: 2rem 1.5rem;
            min-height: 200px;
          }
          
          .card-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
