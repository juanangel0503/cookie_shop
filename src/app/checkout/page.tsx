'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { OrderData } from '@/types';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { state, clearCart, getTotalValue } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    city: '',
    zipCode: '',
    deliveryDate: '',
    specialInstructions: ''
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
    if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

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
        totalValue: getTotalValue()
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
        // Show success modal or redirect to success page
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading your cart...</h1>
        </div>
      </div>
    );
  }

  // Show empty cart message if cart is loaded but empty
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No items in cart</h1>
          <button 
            onClick={() => router.push('/')}
            className="cta-button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>🍪 Happily Ever Bakers</h1>
          </div>
          <nav className="nav">
            <a href="/">Home</a>
            <a href="/#cookies">Cookies</a>
            <a href="/#about">About</a>
          </nav>
        </div>
      </header>

      <div className="checkout-container">
        <a href="/" className="back-to-shop">← Back to Cookie Shop</a>
        
        <div className="checkout-header">
          <h1>Complete Your Order</h1>
          <p>Review your cookie selections and provide your delivery information</p>
        </div>

        <div className="checkout-content">
          {/* Left Column - Order Details */}
          <div className="order-details-column">
            <div className="delivery-section">
              <h2>Delivery Information</h2>
              <div className="delivery-method">
                <div className="method-option selected">
                  <span className="method-icon">🚚</span>
                  <div className="method-info">
                    <strong>Home Delivery</strong>
                    <p>Fresh cookies delivered to your door</p>
                  </div>
                </div>
              </div>
              <div className="delivery-time">
                <p><strong>Estimated Delivery:</strong> 24-48 hours</p>
                <p><strong>Delivery Area:</strong> Local area only</p>
              </div>
            </div>

            <div className="order-form">
              <h3>Customer Information</h3>
              <div className="no-payment-notice">
                <strong>💳 Easy Ordering Process</strong><br />
                Place your order now and we'll send you an invoice for payment. No payment required upfront.
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                      required 
                    />
                    {errors.firstName && <div className="field-error">{errors.firstName}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                      required 
                    />
                    {errors.lastName && <div className="field-error">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    required 
                  />
                  {errors.email && <div className="field-error">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    required 
                  />
                  {errors.phone && <div className="field-error">{errors.phone}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="deliveryAddress">Delivery Address *</label>
                  <textarea 
                    id="deliveryAddress" 
                    name="deliveryAddress" 
                    rows={3} 
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    className={errors.deliveryAddress ? 'error' : ''}
                    required 
                  />
                  {errors.deliveryAddress && <div className="field-error">{errors.deliveryAddress}</div>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                      required 
                    />
                    {errors.city && <div className="field-error">{errors.city}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input 
                      type="text" 
                      id="zipCode" 
                      name="zipCode" 
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={errors.zipCode ? 'error' : ''}
                      required 
                    />
                    {errors.zipCode && <div className="field-error">{errors.zipCode}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="deliveryDate">Preferred Delivery Date</label>
                  <input 
                    type="date" 
                    id="deliveryDate" 
                    name="deliveryDate" 
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialInstructions">Special Instructions</label>
                  <textarea 
                    id="specialInstructions" 
                    name="specialInstructions" 
                    rows={3} 
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special requests or delivery instructions..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-order-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading"></span>
                      Processing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary-column">
            <div className="order-summary">
              <h2>Your Cookie Box</h2>
              <div className="order-note">
                <label htmlFor="orderNote">Special Instructions (Optional)</label>
                <textarea 
                  id="orderNote" 
                  placeholder="Any special requests or delivery instructions..." 
                  rows={3}
                />
              </div>
              <div id="orderSummary">
                {state.items.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="item-details">
                      <div className="item-emoji">📦</div>
                      <div className="item-info">
                        <h4>{item.packName}</h4>
                        <p>${item.packPrice.toFixed(2)} per pack</p>
                        {item.cookies && item.cookies.length > 0 && (
                          <div className="pack-cookies-detail">
                            {item.cookies.map((cookie, index) => (
                              <div key={index} className="pack-cookie-detail">
                                • {cookie.quantity} {cookie.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="item-total">
                      {item.quantity} × ${item.packPrice.toFixed(2)} = ${(item.packPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-breakdown">
                <div className="breakdown-item">
                  <span>Subtotal:</span>
                  <span>${getTotalValue().toFixed(2)}</span>
                </div>
                <div className="breakdown-item">
                  <span>Delivery:</span>
                  <span>Free</span>
                </div>
                <div className="breakdown-item total">
                  <span>Total:</span>
                  <span>${getTotalValue().toFixed(2)}</span>
                </div>
              </div>
              <div className="order-info">
                <p><strong>What's Next?</strong></p>
                <ul>
                  <li>📧 You'll receive an order confirmation email</li>
                  <li>💰 We'll send you an invoice for payment</li>
                  <li>🍪 Your cookies will be freshly baked</li>
                  <li>🚚 We'll deliver to your door</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
