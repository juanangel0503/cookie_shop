'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/dashboard/Header';

export default function OrderLanding() {
  return (
    <div className="order-page">
      <Header />
      
      {/* Main content */}
      <main className="order-main">
        <div className="order-container">
          <h1 className="main-title">Start an Order</h1>
          
          <div className="choices-grid">
            <Link href="/order/menu?method=delivery" className="choice-card delivery">
              <div className="card-illustration">
                <Image
                  src="/images/icons/delivery-icon.png"
                  alt="Delivery"
                  width={200}
                  height={200}
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
                  width={200}
                  height={200}
                  className="icon-image"
                />
              </div>
              <h3 className="card-title">Pickup</h3>
            </Link>

            <div className="choice-card disabled">
              <div className="card-illustration">
                <svg width="120" height="120" viewBox="0 0 60 60" fill="none">
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
                <svg width="120" height="120" viewBox="0 0 60 60" fill="none">
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

        .order-main {
          padding: 4rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 80px);
        }
        
        .order-container { 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 0 2rem; 
          text-align: center;
          width: 100%;
        }
        
        .main-title { 
          font-size: 3.5rem; 
          font-weight: 800; 
          margin-bottom: 4rem; 
          color: #333;
          letter-spacing: -0.02em;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .choices-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .choice-card {
          background: white;
          border: none;
          border-radius: 16px;
          padding: 2.5rem 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          position: relative;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        
        .choice-card:hover:not(.disabled) {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
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
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 200px;
        }
        
        .icon-image {
          object-fit: contain;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }
        
        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        @media (max-width: 1024px) {
          .choices-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          
          .choice-card {
            min-height: 250px;
            padding: 2rem 1.5rem;
          }
          
          .card-illustration {
            height: 150px;
          }
        }
        
        @media (max-width: 768px) {
          .order-main {
            padding: 2rem 0;
          }
          
          .main-title {
            font-size: 2.5rem;
            margin-bottom: 3rem;
          }
          
          .choices-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            max-width: 400px;
          }
          
          .choice-card {
            min-height: 200px;
            padding: 2rem 1.5rem;
          }
          
          .card-illustration {
            height: 120px;
          }
          
          .card-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}
