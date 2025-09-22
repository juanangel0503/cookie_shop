'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function OrderLanding() {
  return (
    <div className="order-landing">
      <div className="order-container">
        <h1 className="title">Start an Order</h1>
        
        <div className="choices-grid">
          <Link href="/order/menu?method=delivery" className="choice-card delivery">
            <div className="card-illustration">
              <Image
                src="/images/icons/delivery-icon.png"
                alt="Delivery"
                width={80}
                height={80}
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
                width={80}
                height={80}
                className="icon-image"
              />
            </div>
            <h3 className="card-title">Pickup</h3>
          </Link>

          <div className="choice-card disabled">
            <div className="card-illustration">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                {/* Gift card illustration */}
                <rect x="15" y="20" width="30" height="20" rx="3" fill="none" stroke="#666" strokeWidth="2"/>
                <rect x="20" y="25" width="20" height="10" rx="2" fill="#666"/>
                <rect x="25" y="30" width="10" height="2" fill="white"/>
                <path d="M15 20 L30 10 L45 20" stroke="#666" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h3 className="card-title">Digital Gift Cards</h3>
            <p className="card-note">Coming Soon</p>
          </div>

          <div className="choice-card disabled">
            <div className="card-illustration">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                {/* Catering illustration */}
                <ellipse cx="30" cy="35" rx="20" ry="15" fill="none" stroke="#666" strokeWidth="2"/>
                <rect x="25" y="25" width="10" height="8" rx="2" fill="#666"/>
                <circle cx="30" cy="20" r="3" fill="#666"/>
                <path d="M27 20 L30 15 L33 20" stroke="#666" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h3 className="card-title">Catering</h3>
            <p className="card-note">Coming Soon</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .order-landing { 
          min-height: 100vh; 
          background: white; 
          padding: 2rem 0;
        }
        
        .order-container { 
          max-width: 1000px; 
          margin: 0 auto; 
          padding: 0 2rem; 
          text-align: center;
        }
        
        .title { 
          font-size: 3rem; 
          font-weight: 800; 
          margin-bottom: 3rem; 
          color: var(--text-dark);
          letter-spacing: -0.02em;
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
          border: 2px solid #e0e0e0;
          border-radius: 20px;
          padding: 2rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          position: relative;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .choice-card:hover:not(.disabled) {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          border-color: var(--primary-pink);
        }
        
        .choice-card.delivery {
          background: var(--primary-pink-light);
          border-color: var(--primary-pink);
        }
        
        .choice-card.pickup {
          background: var(--primary-pink-light);
          border-color: var(--primary-pink);
        }
        
        .choice-card.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .card-illustration {
          margin-bottom: 1.5rem;
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
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-dark);
        }
        
        .card-note {
          font-size: 0.9rem;
          color: var(--text-light);
          margin: 0.5rem 0 0 0;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }
          
          .choices-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .choice-card {
            min-height: 180px;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
