'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import Image from 'next/image';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, updateQuantity, removeFromCart, getTotalValue } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="cart-overlay" onClick={onClose}></div>
      )}
      
      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>My Bag</h2>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="cart-content">
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
                  <h3>{item.packName}</h3>
                  <p className="item-price">${item.packPrice.toFixed(2)}</p>
                  <p className="item-description">
                    {item.cookies && item.cookies.length > 0 
                      ? `${item.cookies.length} ${item.cookies[0].name} Cookie`
                      : 'Cookie Pack'
                    }
                  </p>
                </div>
                <div className="item-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M3 6h18l-2 13H5L3 6zM8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
                    </svg>
                  </button>
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="subtotal-section">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <span>${getTotalValue().toFixed(2)}</span>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="rewards-section">
            <div className="rewards-banner">
              <div className="trophy-icon">🏆</div>
              <span>Sign in to earn Crumbs for this order!</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Link href="/checkout" className="checkout-btn" onClick={onClose}>
            Checkout
          </Link>
        </div>
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          backdrop-filter: blur(5px);
        }

        .cart-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 400px;
          height: 100vh;
          background: white;
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          box-shadow: -4px 0 20px rgba(0,0,0,0.1);
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
          padding: 2rem 1.5rem 1rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .cart-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2c;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }

        .close-btn:hover {
          background: #f0f0f0;
        }

        .cart-content {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
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
          font-size: 0.7rem;
          font-weight: 600;
          color: white;
          text-align: center;
          padding: 0.25rem;
        }

        .item-details {
          flex: 1;
        }

        .item-details h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #2c2c2c;
          margin: 0 0 0.25rem 0;
        }

        .item-price {
          font-weight: 600;
          color: #2c2c2c;
          margin: 0 0 0.25rem 0;
        }

        .item-description {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
        }

        .item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 0.25rem;
          border-radius: 4px;
          transition: color 0.3s ease;
        }

        .remove-btn:hover {
          color: #e91e63;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .qty-btn {
          width: 24px;
          height: 24px;
          border: 1px solid #e0e0e0;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .qty-btn:hover {
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
        }

        .quantity {
          font-weight: 600;
          color: #2c2c2c;
          min-width: 20px;
          text-align: center;
        }

        .subtotal-section {
          margin-bottom: 1.5rem;
        }

        .subtotal-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c2c2c;
        }

        .rewards-section {
          margin-bottom: 2rem;
        }

        .rewards-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .trophy-icon {
          font-size: 1.2rem;
        }

        .checkout-btn {
          display: block;
          width: 100%;
          padding: 16px;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          text-align: center;
          transition: all 0.3s ease;
          margin-top: auto;
          border: none;
          cursor: pointer;
        }

        .checkout-btn:hover {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(255, 185, 205, 0.3);
        }

        @media (max-width: 480px) {
          .cart-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
