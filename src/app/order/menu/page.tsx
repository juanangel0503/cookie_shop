'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import { packOptions } from '@/lib/data';

export default function OrderMenu() {
  return (
    <div className="menu-page">
      <Header />
      
      <main className="menu-main">
        {/* Order Header */}
        <div className="order-header">
          <div className="order-info">
            <div className="order-method">
              <span className="icon">🏠</span>
              <span>Carry Out</span>
              <span className="dropdown">▼</span>
            </div>
            <div className="order-time">
              <span className="icon">🕐</span>
              <span>Today - 8:00 am</span>
              <span className="dropdown">▼</span>
            </div>
            <div className="preorder-tag">
              Preorder In Progress
            </div>
            <div className="order-location">
              <span className="icon">📍</span>
              <span>Dimond - 8840 Old Sewa...</span>
              <span className="dropdown">▼</span>
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="menu-content">
          <h1 className="menu-title">Large Desserts</h1>
          
          <div className="dessert-cards">
            {/* Single Cookie */}
            <div className="dessert-card">
              <div className="card-image">
                <Image
                  src="/images/cookies/single-cookie.jpg"
                  alt="Single Cookie"
                  width={200}
                  height={200}
                  className="dessert-img"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="card-content">
                <h3 className="dessert-name">Single</h3>
                <div className="dessert-price">$4.99</div>
              </div>
            </div>

            {/* Chocolate Chip 4-Pack */}
            <div className="dessert-card">
              <div className="card-image">
                <Image
                  src="/images/cookies/chocolate-chip-4pack.jpg"
                  alt="Chocolate Chip 4-Pack"
                  width={200}
                  height={200}
                  className="dessert-img"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="card-content">
                <div className="savings">Save 49%</div>
                <h3 className="dessert-name">Chocolate Chip 4-Pack</h3>
                <div className="dessert-price">$9.99</div>
              </div>
            </div>

            {/* Mixed 4-Pack */}
            <div className="dessert-card">
              <div className="card-image">
                <Image
                  src="/images/cookies/mixed-4pack.jpg"
                  alt="Mixed 4-Pack"
                  width={200}
                  height={200}
                  className="dessert-img"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="card-content">
                <div className="savings">Save 4%</div>
                <h3 className="dessert-name">4-Pack</h3>
                <div className="dessert-price">$18.99</div>
              </div>
            </div>

            {/* Mixed 6-Pack */}
            <div className="dessert-card">
              <div className="card-image">
                <Image
                  src="/images/cookies/mixed-6pack.jpg"
                  alt="Mixed 6-Pack"
                  width={200}
                  height={200}
                  className="dessert-img"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="card-content">
                <div className="savings">Save 36%</div>
                <h3 className="dessert-name">6-Pack</h3>
                <div className="dessert-price">$18.99</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .menu-page {
          min-height: 100vh;
          background: white;
        }

        .menu-main {
          padding-top: 80px;
          min-height: calc(100vh - 80px);
        }

        .order-header {
          background: white;
          border-bottom: 1px solid #e0e0e0;
          padding: 1rem 0;
        }

        .order-info {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .order-method,
        .order-time,
        .order-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #333;
        }

        .icon {
          font-size: 1rem;
        }

        .dropdown {
          font-size: 0.7rem;
          color: #666;
          margin-left: 0.25rem;
        }

        .preorder-tag {
          --tw-bg-opacity: 1;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: #333;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: auto;
        }

        .menu-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .menu-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #333;
          margin-bottom: 2rem;
          text-align: center;
        }

        .dessert-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .dessert-card {
          --tw-bg-opacity: 1;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          border-radius: 20px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .dessert-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(255, 185, 205, 0.3);
        }

        .card-image {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto 1rem;
          border-radius: 12px;
          overflow: hidden;
          background: white;
        }

        .dessert-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 60px;
          --tw-bg-opacity: 1;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }

        .card-content {
          text-align: center;
        }

        .savings {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .dessert-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .dessert-price {
          font-size: 1.5rem;
          font-weight: 800;
          color: #333;
        }

        @media (max-width: 768px) {
          .order-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .preorder-tag {
            margin-left: 0;
            align-self: flex-start;
          }

          .menu-title {
            font-size: 2rem;
          }

          .dessert-cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .dessert-card {
            padding: 1rem;
          }

          .card-image {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}
