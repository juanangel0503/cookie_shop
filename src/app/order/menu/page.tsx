'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import CartSidebar from '@/components/CartSidebar';
import { GHLProduct } from '@/types';

export default function OrderMenu() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<GHLProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (data.success && data.products) {
        // Keep only 4, 6, 12 packs
        const filtered = (data.products as GHLProduct[]).filter((product: GHLProduct) => {
          const name = product.name.toLowerCase();
          const size = String(product.customFields?.size || '').toLowerCase();
          const isPackCategory = (product.category || '').toLowerCase() === 'packs';
          const isValidSize =
            name.includes('4-pack') ||
            name.includes('6-pack') ||
            name.includes('12-pack') ||
            size === '4-pack' ||
            size === '6-pack' ||
            size === '12-pack';
          return (isPackCategory && isValidSize) || isValidSize;
        });
        setProducts(filtered);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProductLink = (product: GHLProduct) => {
    // Determine pack type based on product name or custom fields
    if (product.name.toLowerCase().includes('4-pack') || product.customFields?.size === '4-pack') {
      return '/order/customize?pack=4pack';
    } else if (product.name.toLowerCase().includes('6-pack') || product.customFields?.size === '6-pack') {
      return '/order/customize?pack=6pack';
    } else if (product.name.toLowerCase().includes('12-pack') || product.customFields?.size === '12-pack') {
      return '/order/customize?pack=12pack';
    }
    // Fallback to 4-pack if not determined
    return '/order/customize?pack=4pack';
  };

  const getSavingsText = (product: GHLProduct) => {
    return product.customFields?.savings || '';
  };

  if (loading) {
    return (
      <div className="menu-page">
        <Header />
        <main className="menu-main">
          <div className="menu-container">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h2>Loading products...</h2>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-page">
        <Header />
        <main className="menu-main">
          <div className="menu-container">
            <div className="error-container">
              <h2>Error loading products</h2>
              <p>{error}</p>
              <button onClick={fetchProducts} className="retry-btn">
                Try Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="menu-page">
      <Header />
      <main className="menu-main">
        <div className="menu-container">
          <h1 className="menu-title">Large Desserts</h1>
          <div className="dessert-grid">
            {products.map((product) => (
              <Link 
                key={product.id} 
                href={getProductLink(product)} 
                className="dessert-card"
              >
                <div className="card-image">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="product-image"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>product_image</span>
                    </div>
                  )}
                  {getSavingsText(product) && (
                    <div className="savings-tag">{getSavingsText(product)}</div>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="dessert-name">{product.name}</h3>
                  <div className="dessert-price">${product.price.toFixed(2)}</div>
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                </div>
              </Link>
            ))}
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

        .loading-container,
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid rgb(255 185 205/var(--tw-bg-opacity));
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-container h2 {
          color: #e91e63;
          margin-bottom: 1rem;
        }

        .retry-btn {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .retry-btn:hover {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateY(-1px);
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

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          margin-bottom: 0.5rem;
        }

        .product-description {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.4;
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
