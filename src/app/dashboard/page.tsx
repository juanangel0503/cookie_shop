'use client';

import { useState, useEffect } from 'react';
import { cookieFlavors, packOptions, calculateSavings } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { PackOption, SelectedCookie } from '@/types';
import CartSidebar from '@/components/CartSidebar';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopPage() {
  const { state, dispatch, addToCart } = useCart();
  const [currentPack, setCurrentPack] = useState<PackOption | null>(null);
  const [currentPackItems, setCurrentPackItems] = useState<SelectedCookie[]>([]);
  const [filteredFlavors, setFilteredFlavors] = useState(cookieFlavors);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter cookie flavors based on search and category
  useEffect(() => {
    const filtered = cookieFlavors.filter(cookie => {
      const matchesSearch = cookie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cookie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cookie.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || cookie.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    setFilteredFlavors(filtered);
  }, [searchTerm, categoryFilter]);

  const selectPack = (pack: PackOption) => {
    setCurrentPack(pack);
    setCurrentPackItems([]);
  };

  const backToPackSelection = () => {
    setCurrentPack(null);
    setCurrentPackItems([]);
    setSearchTerm('');
    setCategoryFilter('');
  };

  const updateCookieQuantity = (cookieId: number, change: number) => {
    const cookie = cookieFlavors.find(c => c.id === cookieId);
    if (!cookie) return;

    const selectedItem = currentPackItems.find(item => item.id === cookieId);
    let quantity = selectedItem ? selectedItem.quantity : 0;
    const newQuantity = quantity + change;
    const totalSelected = getTotalSelectedInPack();

    // Check if we can add more
    if (change > 0 && totalSelected >= (currentPack?.size || 0)) {
      return; // Can't add more
    }

    // Check if we can remove
    if (change < 0 && quantity <= 0) {
      return; // Can't remove more
    }

    if (newQuantity <= 0) {
      // Remove from selection
      setCurrentPackItems(prev => prev.filter(item => item.id !== cookieId));
    } else {
      // Update or add to selection
      if (selectedItem) {
        setCurrentPackItems(prev => 
          prev.map(item => 
            item.id === cookieId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        setCurrentPackItems(prev => [...prev, {
          id: cookieId,
          name: cookie.name,
          quantity: newQuantity
        }]);
      }
    }
  };

  const getTotalSelectedInPack = () => {
    return currentPackItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const addPackToBag = () => {
    if (!currentPack || getTotalSelectedInPack() !== currentPack.size) {
      return; // Pack not complete
    }

    const packId = `pack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const packItem = {
      id: packId,
      packType: currentPack.id,
      packName: currentPack.name,
      packPrice: currentPack.price,
      packSize: currentPack.size,
      cookies: [...currentPackItems],
      quantity: 1
    };

    addToCart(packItem);
    backToPackSelection();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
  };

  const getCategories = () => {
    const categories = cookieFlavors.map(cookie => cookie.category);
    return Array.from(new Set(categories));
  };

  return (
    <div className="min-h-screen">
      {/* HEB Branded Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <Image 
              src="/assets/logos/HEB-White-Logo@4x.png" 
              alt="Happily Ever Bakers Logo" 
              width={50} 
              height={50}
              priority
            />
            <h1>Happily Ever Bakers</h1>
          </div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#cookies">Cookies</a>
            <a href="#about">About</a>
            <Link href="/" className="nav-link">Dashboard</Link>
          </nav>
          <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
            <span className="cart-count">{state.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            🛒
          </div>
        </div>
      </header>

      {/* HEB Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h2>Handcrafted Cookies Made Daily</h2>
            <p>Premium ingredients, traditional recipes, delivered fresh to your door. Experience the perfect blend of artisanal craftsmanship and modern convenience.</p>
            <div className="hero-actions">
              <button 
                className="cta-button" 
                onClick={() => document.getElementById('packSelection')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🍪 Shop Our Cookies
              </button>
              <Link href="/dashboard" className="dashboard-cta">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Pack Selection Section */}
          <section id="packSelection" className="pack-selection">
            <h2>Choose Your Perfect Pack</h2>
            <p className="subtitle">Select the size that's just right for you and your loved ones</p>
            
            <div className="pack-options">
              {packOptions.map(pack => {
                const savings = calculateSavings(pack.size, pack.price);
                return (
                  <div 
                    key={pack.id}
                    className={`pack-option ${currentPack?.id === pack.id ? 'selected' : ''}`}
                    onClick={() => selectPack(pack)}
                  >
                    <span className="pack-icon">📦</span>
                    <h3>{pack.name}</h3>
                    <div className="pack-price">${pack.price.toFixed(2)}</div>
                    {savings > 0 && (
                      <div className="pack-savings">Save {savings}%</div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Cookie Selection Section */}
          {currentPack && (
            <section className="cookie-selection">
              <h2>Customize Your {currentPack.name}</h2>
              
              <div className="selection-info">
                <p>Select {currentPack.size} cookies for your pack. You can choose multiple of the same flavor!</p>
              </div>

              {/* Enhanced Search and Filter */}
              <div className="search-filter-container">
                <div className="search-box">
                  <input 
                    type="text" 
                    placeholder="Search cookie flavors..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-options">
                  <select 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {getCategories().map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <button className="clear-filters" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Cookie Flavors Grid */}
              <div className="cookie-flavors">
                {filteredFlavors.map(cookie => {
                  const selectedItem = currentPackItems.find(item => item.id === cookie.id);
                  const quantity = selectedItem ? selectedItem.quantity : 0;
                  const totalSelected = getTotalSelectedInPack();
                  const canAddMore = totalSelected < currentPack.size;
                  
                  return (
                    <div key={cookie.id} className="cookie-flavor-item">
                      <div className="cookie-flavor-info">
                        <h4>{cookie.name}</h4>
                        <p>{cookie.description}</p>
                        <small>Category: {cookie.category}</small>
                      </div>
                      <div className="cookie-quantity">
                        <button 
                          className="quantity-btn" 
                          onClick={() => updateCookieQuantity(cookie.id, -1)}
                          disabled={quantity <= 0}
                        >
                          −
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button 
                          className="quantity-btn" 
                          onClick={() => updateCookieQuantity(cookie.id, 1)}
                          disabled={!canAddMore}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pack Actions */}
              <div className="pack-actions">
                <button 
                  className="add-to-bag-btn"
                  onClick={addPackToBag}
                  disabled={getTotalSelectedInPack() !== currentPack.size}
                >
                  {getTotalSelectedInPack() === currentPack.size ? (
                    <>
                      🛒 Add to Bag - ${currentPack.price.toFixed(2)}
                    </>
                  ) : (
                    <>
                      Select {currentPack.size - getTotalSelectedInPack()} more cookies
                    </>
                  )}
                </button>
                <button 
                  className="cta-button" 
                  onClick={backToPackSelection}
                  style={{ marginTop: '1rem', background: 'transparent', border: '2px solid var(--heb-pink)', color: 'var(--heb-pink)' }}
                >
                  ← Back to Pack Selection
                </button>
              </div>
            </section>
          )}

          {/* About Section */}
          <section id="about" className="about-section" style={{ marginTop: '4rem', padding: '3rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-light)' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--heb-pink)', marginBottom: '2rem' }}>About Happily Ever Bakers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍🍳</div>
                <h3 style={{ color: 'var(--heb-pink)', marginBottom: '1rem' }}>Artisan Crafted</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Every cookie is handcrafted using traditional techniques and the finest ingredients.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
                <h3 style={{ color: 'var(--heb-pink)', marginBottom: '1rem' }}>Fresh Daily</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Baked fresh every morning to ensure the perfect texture and flavor in every bite.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
                <h3 style={{ color: 'var(--heb-pink)', marginBottom: '1rem' }}>Fast Delivery</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Delivered to your door within 24-48 hours, maintaining freshness and quality.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Happily Ever Bakers</h4>
              <p>Artisan cookies made with love and premium ingredients. Fresh baked daily for your enjoyment.</p>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>📞 (555) 123-BAKE</p>
              <p>✉️ hello@happilyeverbakers.com</p>
              <p>📍 123 Sweet Street, Cookie City, CC 12345</p>
            </div>
            <div className="footer-section">
              <h4>Ordering</h4>
              <p>Order online, we'll invoice you</p>
              <p>Fresh delivery within 24-48 hours</p>
              <p>Custom orders welcome</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Happily Ever Bakers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
