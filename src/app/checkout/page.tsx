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
          {/* Left Column - Order Details */}
          <div className="order-details">
            <div className="carryout-section">
              <h2>Carryout Order</h2>
              <div className="order-info">
                <div className="info-item">
                  <span className="label">Pickup Method</span>
                  <span className="value">Carry Out</span>
                </div>
                <div className="info-item">
                  <span className="label">Time</span>
                  <span className="value">Today - 12:10 pm</span>
                  <span className="sub-value">Ready in 5-10 min</span>
                </div>
                <div className="info-item">
                  <span className="label">Location</span>
                  <span className="value">Tikahtnu Commons</span>
                  <span className="sub-value">1118 N Muldoon Rd, Unit 145, Anchorage, Alaska 99504</span>
                </div>
              </div>
              
              <div className="pickup-person">
                <label htmlFor="firstName">Who will be picking up the order?</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  placeholder="First & Last name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                  required 
                />
                {errors.firstName && <div className="field-error">This field is required</div>}
              </div>
            </div>

            <div className="bag-section">
              <h2>My Bag</h2>
              <div className="bag-note">
                <p>Ordering for someone special? Add a personal note to go on the box.</p>
                <textarea 
                  name="specialNote"
                  placeholder="Add a note (optional)"
                  value={formData.specialNote}
                  onChange={handleInputChange}
                  maxLength={150}
                  rows={3}
                />
                <div className="char-count">{150 - formData.specialNote.length}</div>
              </div>
              
              <div className="bag-items">
                {state.items.map(item => (
                  <div key={item.id} className="bag-item">
                    <div className="item-image">
                      <div className="image-placeholder"></div>
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
                    <div className="item-quantity">
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Payment */}
          <div className="order-summary">
            <div className="summary-section">
              <h2>Order Details</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getTotalValue().toFixed(2)}</span>
              </div>
              
              <div className="tip-section">
                <div className="tip-label">
                  <span>Tip</span>
                  <span>${getTipAmount().toFixed(2)}</span>
                </div>
                <div className="tip-buttons">
                  <button 
                    className={`tip-btn ${selectedTip === 2 ? 'selected' : ''}`}
                    onClick={() => handleTipChange(2)}
                  >
                    $2
                  </button>
                  <button 
                    className={`tip-btn ${selectedTip === 3 ? 'selected' : ''}`}
                    onClick={() => handleTipChange(3)}
                  >
                    $3
                  </button>
                  <button 
                    className={`tip-btn ${selectedTip === 5 ? 'selected' : ''}`}
                    onClick={() => handleTipChange(5)}
                  >
                    $5
                  </button>
                  <button 
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
                <p className="tip-note">100% of tips go to the bakers</p>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="payment-section">
              <h2>Payment</h2>
              <form onSubmit={handleSubmit}>
                <div className="card-input">
                  <div className="card-icon">💳</div>
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
                
                <div className="card-details">
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className={errors.expiryDate ? 'error' : ''}
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={errors.cvv ? 'error' : ''}
                    required
                  />
                </div>
                
                <div className="additional-info">
                  <input 
                    type="email" 
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
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
                
                <div className="gift-card-link">
                  <a href="#">+ Gift Card or Voucher</a>
                </div>
                
                <div className="legal-text">
                  <p>
                    By proceeding you agree to our{' '}
                    <a href="#">Terms and Conditions</a> and confirm you have read and understand our{' '}
                    <a href="#">Privacy policy</a>
                  </p>
                  <p className="stripe-text">Powered by Stripe</p>
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
          padding: 2rem 0;
        }

        .checkout-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .order-details {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .carryout-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 1.5rem;
        }

        .order-info {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .label {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .value {
          font-weight: 600;
          color: #2c2c2c;
        }

        .sub-value {
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.25rem;
        }

        .pickup-person {
          margin-bottom: 2rem;
        }

        .pickup-person label {
          display: block;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 0.5rem;
        }

        .pickup-person input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .pickup-person input:focus {
          outline: none;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .pickup-person input.error {
          border-color: #e91e63;
        }

        .field-error {
          color: #e91e63;
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .bag-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 1rem;
        }

        .bag-note {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
        }

        .bag-note p {
          color: #666;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .bag-note textarea {
          width: 100%;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 12px;
          font-size: 1rem;
          resize: none;
          transition: border-color 0.3s ease;
        }

        .bag-note textarea:focus {
          outline: none;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .char-count {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          color: #666;
          font-size: 0.8rem;
        }

        .bag-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .bag-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .item-image {
          width: 60px;
          height: 60px;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          border-radius: 8px;
        }

        .item-details {
          flex: 1;
        }

        .item-details h3 {
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

        .item-quantity {
          font-weight: 600;
          color: #2c2c2c;
        }

        .order-summary {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          height: fit-content;
        }

        .summary-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 1.5rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .summary-row.total {
          font-weight: 700;
          font-size: 1.1rem;
          border-bottom: none;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid #f0f0f0;
        }

        .tip-section {
          margin: 1.5rem 0;
        }

        .tip-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .tip-buttons {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tip-btn {
          padding: 8px 16px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
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
          padding: 8px 12px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 1rem;
        }

        .tip-note {
          color: #666;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .payment-section {
          margin-top: 2rem;
        }

        .payment-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 1.5rem;
        }

        .card-input {
          position: relative;
          margin-bottom: 1rem;
        }

        .card-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
        }

        .card-input input {
          width: 100%;
          padding: 12px 12px 12px 45px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .card-input input:focus {
          outline: none;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .card-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .card-details input {
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .card-details input:focus {
          outline: none;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .additional-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .additional-info input {
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .additional-info input:focus {
          outline: none;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .gift-card-link {
          margin-bottom: 1.5rem;
        }

        .gift-card-link a {
          color: rgb(255 185 205/var(--tw-bg-opacity));
          text-decoration: none;
          font-weight: 600;
        }

        .gift-card-link a:hover {
          text-decoration: underline;
        }

        .legal-text {
          margin-bottom: 1.5rem;
        }

        .legal-text p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .legal-text a {
          color: rgb(255 185 205/var(--tw-bg-opacity));
          text-decoration: none;
        }

        .legal-text a:hover {
          text-decoration: underline;
        }

        .stripe-text {
          color: #666;
          font-size: 0.8rem;
        }

        .rewards-section {
          margin-bottom: 1.5rem;
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
        }

        .rewards-btn:hover {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateY(-1px);
        }

        .place-order-btn {
          width: 100%;
          padding: 16px;
          background: #2c2c2c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .place-order-btn:hover {
          background: #1a1a1a;
          transform: translateY(-1px);
        }

        .place-order-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        input.error {
          border-color: #e91e63;
        }

        @media (max-width: 768px) {
          .checkout-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0 1rem;
          }
          
          .order-details,
          .order-summary {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
