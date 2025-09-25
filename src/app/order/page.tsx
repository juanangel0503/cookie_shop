'use client';

import Link from 'next/link';
import Image from 'next/image';
import AnimatedCanvasImage from '@/components/AnimatedCanvasImage';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';

export default function OrderLanding() {
  return (
    <div className="order-page">
      <Header />
      
      {/* Main content */}
      <main className="order-main">
        <div className="order-container">
          <h1 className="main-title">Start an Order</h1>
          
          <div className="choices-grid">
            <Link href="/order/menu?method=delivery">
              <div className="choice-card delivery">
                <div className="card-illustration">
                  <AnimatedCanvasImage
                    src="/images/icons/delivery-icon.png"
                    alt="Delivery"
                    width={300}
                    height={300}
                  />
                </div>
                <h3 className="card-title">Delivery</h3>
              </div>
            </Link>

            <Link href="/order/menu">
              <div className="choice-card pickup">
                <div className="card-illustration">
                  <AnimatedCanvasImage
                    src="/images/icons/pickup-icon.png"
                    alt="Pickup"
                    width={300}
                    height={300}
                  />
                </div>
                <h3 className="card-title">Pickup</h3>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />

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
          max-width: 1000px; 
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
          gap: 4rem;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .choice-card {
          background: white;
          border: 2px solid transparent;
          border-radius: 20px;
          padding: 15px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
          box-shadow: none;
          position: relative;
          min-height: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          cursor: pointer;
        }
        
        .choice-card:hover:not(.disabled) {
          transform: translateY(-2px);
        }
        
        .choice-card.delivery {
          --tw-bg-opacity: 1;
          background: rgb(255 185 205/var(--tw-bg-opacity));
        }
        
        .choice-card.pickup {
          --tw-bg-opacity: 1;
          background: rgb(255 185 205/var(--tw-bg-opacity));
        }
        
        .card-illustration {
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 300px;
          position: relative;
          padding: 16px;
        }
        
        .icon-image {
          object-fit: contain !important;
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
        }
        
        .card-title {
          font-size: 2.25rem;
          font-weight: 900;
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          text-decoration: none;
        }
        
        @media (max-width: 1024px) {
          .choices-grid {
            gap: 3rem;
            max-width: 700px;
          }
          
          .choice-card {
            min-height: 400px;
            padding: 2.5rem 1.5rem;
          }
          
          .card-illustration {
            height: 260px;
            padding: 14px;
          }
        }
        
        @media (min-width: 640px) {
          .choice-card {
            --tw-bg-opacity: 1;
            background: rgb(255 185 205/var(--tw-bg-opacity));
            border: 2px solid #000;
            box-shadow: 10px 10px 0 #000;
            padding: 3rem 2rem;
          }
          .choice-card:hover:not(.disabled) {
            box-shadow: 12px 12px 0 #000;
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
            gap: 2.5rem;
            max-width: 500px;
          }
          
          .choice-card {
            min-height: 350px;
            padding: 2.5rem 2rem;
          }
          
          .card-illustration {
            height: 210px;
            padding: 12px;
          }
          
          .card-title {
            font-size: 1.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .choice-card {
            min-height: 300px;
            padding: 2rem 1.5rem;
          }
          
          .card-illustration {
            height: 180px;
            padding: 10px;
          }
          
          .card-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}
