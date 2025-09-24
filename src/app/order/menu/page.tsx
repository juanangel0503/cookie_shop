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
            <Link href="/order/customize?pack=single" className="dessert-card">
              <div className="card-image">
                <Image
                  src="/images/products/Chocolate-chip.png"
                  alt="Single Chocolate Chip Cookie"
                  width={200}
                  height={200}
                  className="dessert-img"
                  priority
                />
                <div className="image-overlay"></div>
              </div>
              <div className="card-content">
                <h3 className="dessert-name">Single</h3>
                <div className="dessert-price">$4.99</div>
              </div>
            </Link>

            {/* Chocolate Chip 4-Pack */}
            <Link href="/order/customize?pack=4pack" className="dessert-card">
              <div className="card-image">
                <Image
                  src="/images/products/chocolate-chip-horizontal.jpg"
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
            </Link>

            {/* Mixed 4-Pack */}
            <Link href="/order/customize?pack=4pack" className="dessert-card">
              <div className="card-image">
                <Image
                  src="/images/products/variety-horizontal.jpg"
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
            </Link>

            {/* Mixed 6-Pack */}
            <Link href="/order/customize?pack=6pack" className="dessert-card">
              <div className="card-image">
                <Image
                  src="/images/products/cookie-cream-vertical.jpg"
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
            </Link>
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
          text-decoration: none;
          color: inherit;
          display: block;
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
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .dessert-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        .dessert-card:hover .dessert-img {
          transform: scale(1.05);
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
