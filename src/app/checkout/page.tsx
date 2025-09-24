'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { OrderData } from '@/types';
import { useRouter } from 'next/navigation';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import Image from 'next/image';

export default function CheckoutPage() {
  const { state, clearCart, getTotalValue } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTip, setSelectedTip] = useState(2);
  const [customTip, setCustomTip] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    specialNote: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Wait for cart to load, then redirect if empty
  useEffect(() => {
    if (state.isLoaded && state.items.length === 0) {
      router.push('/');
    }
  }, [state.isLoaded, state.items.length, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTipChange = (tip: number) => {
    setSelectedTip(tip);
    setCustomTip('');
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTip(value);
    if (value) {
      setSelectedTip(0);
    }
  };

  const getTipAmount = () => {
    if (customTip) {
      return parseFloat(customTip) || 0;
    }
    return selectedTip;
  };

  const getTotal = () => {
    return getTotalValue() + getTipAmount();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData: OrderData = {
        ...formData,
        items: state.items,
        orderDate: new Date().toISOString(),
        totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalValue: getTotal(),
        tip: getTipAmount()
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        clearCart();
        alert(`Order submitted successfully! Order number: ${result.orderNumber}`);
        router.push('/');
      } else {
        throw new Error(result.error || 'Failed to submit order');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while cart is being loaded
  if (!state.isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: "80px" }}>
        <Header />
        <div className="text-center">
          <div className="loading-spinner"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading your cart...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  // Show empty cart message if cart is loaded but empty
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: "80px" }}>
        <Header />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No items in cart</h1>
          <button 
            onClick={() => router.push('/')}
            className="cta-button"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      
      <main className="checkout-main">
        <div className="checkout-container">
          {/* Mobile-First Single Column Layout */}
          <div className="checkout-content">
            {/* Order Summary Section */}
            <div className="order-summary-mobile">
              <h2>Order Summary</h2>
              <div className="summary-items">
                {state.items.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <h3>{item.packName}</h3>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${(item.packPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>${getTotalValue().toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Tip</span>
                  <span>${getTipAmount().toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="payment-form">
              <h2>Payment Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Card number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={errors.cardNumber ? 'error' : ''}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <input 
                    type="text" 
                    placeholder="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={errors.cvv ? 'error' : ''}
                    required
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    required
                  />
                </div>
                
                <div className="tip-section">
                  <h3>Tip</h3>
                  <div className="tip-buttons">
                    <button 
                      type="button"
                      className={`tip-btn ${selectedTip === 2 ? 'selected' : ''}`}
                      onClick={() => handleTipChange(2)}
                    >
                      $2
                    </button>
                    <button 
                      type="button"
                      className={`tip-btn ${selectedTip === 3 ? 'selected' : ''}`}
                      onClick={() => handleTipChange(3)}
                    >
                      $3
                    </button>
                    <button 
                      type="button"
                      className={`tip-btn ${selectedTip === 5 ? 'selected' : ''}`}
                      onClick={() => handleTipChange(5)}
                    >
                      $5
                    </button>
                    <button 
                      type="button"
                      className={`tip-btn ${selectedTip === 0 ? 'selected' : ''}`}
                      onClick={() => setSelectedTip(0)}
                    >
                      Other
                    </button>
                  </div>
                  {selectedTip === 0 && (
                    <input 
                      type="number" 
                      placeholder="Enter amount"
                      value={customTip}
                      onChange={handleCustomTipChange}
                      className="custom-tip-input"
                    />
                  )}
                </div>
                
                <div className="legal-text">
                  <p>
                    By proceeding you agree to our{' '}
                    <a href="#">Terms and Conditions</a> and confirm you have read and understand our{' '}
                    <a href="#">Privacy policy</a>
                  </p>
                </div>
                
                <div className="rewards-section">
                  <button type="button" className="rewards-btn">
                    🍪 Sign in to earn Crumbs for this order!
                  </button>
                </div>
                
                <button 
                  type="submit" 
                  className="place-order-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <style jsx>{`
        .checkout-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding-top: 80px;
        }

        .checkout-main {
          padding: 1rem 0;
        }

        .checkout-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .checkout-content {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .order-summary-mobile h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 1rem;
        }

        .summary-items {
          margin-bottom: 1.5rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .item-info h3 {
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 0.25rem;
        }

        .item-info p {
          color: #666;
          font-size: 0.9rem;
        }

        .item-price {
          font-weight: 600;
          color: #2c2c2c;
        }

        .price-breakdown {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
        }

        .price-row.total {
          font-weight: 700;
          font-size: 1.1rem;
          border-top: 2px solid #e0e0e0;
          margin-top: 0.5rem;
          padding-top: 0.75rem;
        }

        .payment-form h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group input,
        .form-row input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-row input:focus {
          outline: none;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .form-group input.error,
        .form-row input.error {
          border-color: #e91e63;
        }

        .tip-section {
          margin: 1.5rem 0;
        }

        .tip-section h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 1rem;
        }

        .tip-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tip-btn {
          padding: 12px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 1rem;
        }

        .tip-btn:hover {
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .tip-btn.selected {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
        }

        .custom-tip-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
        }

        .custom-tip-input:focus {
          outline: none;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .legal-text {
          margin: 1.5rem 0;
        }

        .legal-text p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .legal-text a {
          color: rgb(255 185 205/var(--tw-bg-opacity));
          text-decoration: none;
        }

        .legal-text a:hover {
          text-decoration: underline;
        }

        .rewards-section {
          margin: 1.5rem 0;
        }

        .rewards-btn {
          width: 100%;
          padding: 12px;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .rewards-btn:hover {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateY(-1px);
        }

        .place-order-btn {
          width: 100%;
          padding: 16px;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .place-order-btn:hover {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateY(-1px);
        }

        .place-order-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        @media (min-width: 768px) {
          .checkout-container {
            max-width: 800px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          
          .checkout-content {
            padding: 2rem;
          }
        }

        @media (max-width: 480px) {
          .checkout-container {
            padding: 0 0.5rem;
          }
          
          .checkout-content {
            padding: 1rem;
          }
          
          .tip-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
