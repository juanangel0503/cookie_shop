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
          max-width: 800px; 
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
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .choice-card {
          background: white;
          border: none;
          border-radius: 16px;
          padding: 3rem 2rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          position: relative;
          min-height: 320px;
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
        
        .card-illustration {
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 220px;
        }
        
        .icon-image {
          object-fit: contain;
          max-width: 100%;
          max-height: 100%;
          width: auto;
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
          .order-main {
            padding: 2rem 0;
          }
          
          .main-title {
            font-size: 2.5rem;
            margin-bottom: 3rem;
          }
          
          .choices-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 400px;
          }
          
          .choice-card {
            min-height: 280px;
            padding: 2.5rem 2rem;
          }
          
          .card-illustration {
            height: 180px;
          }
          
          .card-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
