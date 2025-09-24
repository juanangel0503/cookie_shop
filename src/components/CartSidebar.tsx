'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, updateQuantity, removeFromCart, getTotalValue } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsSubmitting(true);
    // Navigate to checkout
    window.location.href = '/checkout';
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="cart-backdrop" onClick={onClose}></div>
      )}

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">My Bag</h2>
          <button className="close-cart" onClick={onClose}>
            <span>×</span>
          </button>
        </div>

        <div className="cart-content">
          {state.items.length === 0 ? (
            <div className="empty-cart">
              <p>Your bag is empty</p>
              <Link href="/order" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="cart-items">
                {state.items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <div className="image-placeholder">
                        <span>{item.packName}</span>
                      </div>
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">{item.packName}</h3>
                      <p className="item-price">${item.packPrice.toFixed(2)}</p>
                      <p className="item-description">
                        {item.cookies && item.cookies.length > 0 
                          ? `${item.cookies.length} ${item.cookies[0].name} Cookie`
                          : 'Cookie Pack'
                        }
                      </p>
                    </div>
                    <div className="item-controls">
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="add-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Items */}
              <div className="suggested-section">
                <h3>Missing Something?</h3>
                <div className="suggested-item">
                  <div className="suggested-image">
                    <div className="image-placeholder">
                      <span>Cool Cutter</span>
                    </div>
                    <button className="add-suggested">+</button>
                  </div>
                  <div className="suggested-details">
                    <h4>Cookie Cutter</h4>
                    <p>$4.99</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${getTotalValue().toFixed(2)}</span>
                </div>
              </div>

              {/* Rewards Banner */}
              <div className="rewards-banner">
                <span className="trophy">🏆</span>
                <span>Sign in to earn Crumbs for this order!</span>
              </div>

              {/* Checkout Button */}
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Checkout'}
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .cart-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .cart-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 400px;
          height: 100vh;
          background: white;
          box-shadow: -4px 0 20px rgba(0,0,0,0.1);
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .cart-sidebar.open {
          transform: translateX(0);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .cart-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c2c2c;
          margin: 0;
        }

        .close-cart {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
          transition: color 0.3s ease;
        }

        .close-cart:hover {
          color: #2c2c2c;
        }

        .cart-content {
          flex: 1;
          overflow-y: auto;
          padding: 0 2rem 2rem;
        }

        .empty-cart {
          text-align: center;
          padding: 3rem 0;
        }

        .empty-cart p {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .continue-shopping-btn {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .continue-shopping-btn:hover {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateY(-1px);
        }

        .cart-items {
          margin-bottom: 2rem;
        }

        .cart-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .item-image {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
          padding: 0.5rem;
        }

        .item-details {
          flex: 1;
        }

        .item-name {
          font-size: 1rem;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 0.25rem;
        }

        .item-price {
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 0.25rem;
        }

        .item-description {
          color: #666;
          font-size: 0.9rem;
        }

        .item-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .remove-btn,
        .add-btn {
          background: #f0f0f0;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .remove-btn:hover,
        .add-btn:hover {
          background: #e0e0e0;
        }

        .quantity {
          font-weight: 600;
          color: #2c2c2c;
          min-width: 20px;
          text-align: center;
        }

        .suggested-section {
          margin-bottom: 2rem;
        }

        .suggested-section h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 1rem;
        }

        .suggested-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .suggested-image {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .add-suggested {
          position: absolute;
          top: -5px;
          right: -5px;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          border: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 600;
        }

        .suggested-details h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 0.25rem;
        }

        .suggested-details p {
          font-weight: 600;
          color: #2c2c2c;
        }

        .order-summary {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: #2c2c2c;
        }

        .rewards-banner {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .trophy {
          font-size: 1.2rem;
        }

        .checkout-btn {
          width: 100%;
          background: #2c2c2c;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .checkout-btn:hover {
          background: #1a1a1a;
          transform: translateY(-1px);
        }

        .checkout-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .cart-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
