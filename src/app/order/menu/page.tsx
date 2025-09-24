'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import CartSidebar from '@/components/CartSidebar';

export default function OrderMenu() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="menu-page">
      <Header />
      <main className="menu-main">
        <div className="menu-container">
          <h1 className="menu-title">Large Desserts</h1>
          <div className="dessert-grid">
            {/* Single Cookie */}
            <Link href={`/order/customize?pack=single`} className="dessert-card">
              <div className="card-image">
                <div className="image-placeholder">
                  <span>product_image</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="dessert-name">Single</h3>
                <div className="dessert-price">$4.99</div>
              </div>
            </Link>

            {/* Chocolate Chip 4-Pack */}
            <Link href={`/order/customize?pack=4pack`} className="dessert-card">
              <div className="card-image">
                <div className="image-placeholder">
                  <span>product_image</span>
                </div>
                <div className="savings-tag">Save 49%</div>
              </div>
              <div className="card-content">
                <h3 className="dessert-name">Chocolate Chip 4-Pack</h3>
                <div className="dessert-price">$9.99</div>
              </div>
            </Link>

            {/* Mixed 4-Pack */}
            <Link href={`/order/customize?pack=4pack`} className="dessert-card">
              <div className="card-image">
                <div className="image-placeholder">
                  <span>product_image</span>
                </div>
                <div className="savings-tag">Save 4%</div>
              </div>
              <div className="card-content">
                <h3 className="dessert-name">4-Pack</h3>
                <div className="dessert-price">$18.99</div>
              </div>
            </Link>

            {/* Mixed 6-Pack */}
            <Link href={`/order/customize?pack=6pack`} className="dessert-card">
              <div className="card-image">
                <div className="image-placeholder">
                  <span>product_image</span>
                </div>
                <div className="savings-tag">Save 36%</div>
              </div>
              <div className="card-content">
                <h3 className="dessert-name">6-Pack</h3>
                <div className="dessert-price">$18.99</div>
              </div>
            </Link>

            {/* Mixed 12-Pack */}
            <Link href={`/order/customize?pack=12pack`} className="dessert-card">
              <div className="card-image">
                <div className="image-placeholder">
                  <span>product_image</span>
                </div>
                <div className="savings-tag">Save 18%</div>
              </div>
              <div className="card-content">
                <h3 className="dessert-name">12-Pack</h3>
                <div className="dessert-price">$48.99</div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <style jsx>{`
        .menu-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding-top: 160px; /* Account for header + order details bar */
        }

        .menu-main {
          padding: 2rem 0;
        }

        .menu-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .menu-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 2rem;
          text-align: left;
        }

        .dessert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .dessert-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          position: relative;
        }

        .dessert-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }

        .card-image {
          position: relative;
          height: 200px;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-placeholder {
          background: #e0e0e0;
          color: #666;
          padding: 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
        }

        .savings-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(255, 185, 205, 0.3);
        }

        .card-content {
          padding: 1.5rem;
        }

        .dessert-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 0.5rem;
        }

        .dessert-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2c;
        }

        @media (max-width: 768px) {
          .menu-page {
            padding-top: 140px;
          }

          .menu-container {
            padding: 0 1rem;
          }

          .menu-title {
            font-size: 2rem;
          }

          .dessert-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
          }

          .card-image {
            height: 150px;
          }

          .card-content {
            padding: 1rem;
          }

          .dessert-name {
            font-size: 1.1rem;
          }

          .dessert-price {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .menu-page {
            padding-top: 120px;
          }

          .dessert-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .menu-title {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
