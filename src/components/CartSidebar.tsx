'use client';

import { useCart } from '@/lib/cart-context';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, updateQuantity, removeFromCart, getTotalValue } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    if (state.items.length === 0) {
      alert('Your bag is empty!');
      return;
    }
    
    setIsCheckingOut(true);
    // Close the cart sidebar first
    onClose();
    // Navigate to checkout page using Next.js router
    router.push('/checkout');
  };

  return (
    <>
      {/* Cart Overlay */}
      {isOpen && (
        <div className="cart-overlay active" onClick={onClose}></div>
      )}
      
      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>My Bag</h3>
          <button className="close-cart" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-items">
          {state.items.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
              Your bag is empty
            </p>
          ) : (
            state.items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">📦</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.packName}</div>
                  <div className="cart-item-price">${(item.packPrice * item.quantity).toFixed(2)}</div>
                  {item.cookies && item.cookies.length > 0 && (
                    <div className="pack-cookies">
                      {item.cookies.map((cookie, index) => (
                        <div key={index} className="pack-cookie">
                          {cookie.quantity} {cookie.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="cart-item-actions">
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button 
                    className="remove-item" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="cart-footer">
          <div className="cart-total">
            <strong>Subtotal: ${getTotalValue().toFixed(2)}</strong>
          </div>
          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={state.items.length === 0 || isCheckingOut}
          >
            {isCheckingOut ? (
              <>
                <span className="loading"></span>
                Processing...
              </>
            ) : (
              'Checkout'
            )}
          </button>
        </div>
      </div>
    </>
  );
}
