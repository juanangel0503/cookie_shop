'use client';

import { useState, useEffect } from 'react';
import { cookieFlavors, packOptions, calculateSavings } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { PackOption, SelectedCookie } from '@/types';
import CartSidebar from '@/components/CartSidebar';

export default function HomePage() {
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>🍪 Happily Ever Bakers</h1>
          </div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#cookies">Cookies</a>
            <a href="#about">About</a>
          </nav>
          <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
            <span className="cart-count">{state.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            🛒
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Handcrafted Cookies Made Daily</h2>
            <p>Premium ingredients, traditional recipes, delivered fresh to your door</p>
            <button 
              className="cta-button" 
              onClick={() => document.getElementById('packSelection')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Our Cookies
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      {currentPack && (
        <section className="search-filter-section">
          <div className="container">
            <div className="search-filter-container">
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Search cookie flavors..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
              <div className="filter-options">
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="classic">Classic</option>
                  <option value="fruity">Fruity</option>
                  <option value="seasonal">Seasonal</option>
                </select>
                <button className="clear-filters" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pack Selection Section */}
      <section className="pack-selection-section" id="packSelection" style={{ display: currentPack ? 'none' : 'block' }}>
        <div className="container">
          <h2>Choose Your Pack Size</h2>
          <div className="pack-options">
            {packOptions.map(pack => {
              const savings = pack.size > 1 ? calculateSavings(pack.size, pack.price) : 0;
              return (
                <div key={pack.id} className="pack-option" onClick={() => selectPack(pack)}>
                  <div className="pack-icon">📦</div>
                  <h3>{pack.name}</h3>
                  <p>{pack.size === 1 ? 'Single cookie' : `Choose ${pack.size} cookies`}</p>
                  <div className="pack-price">${pack.price.toFixed(2)}</div>
                  {savings > 0 && <div className="save-badge">Save {savings}%</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cookie Selection Section */}
      {currentPack && (
        <section className="cookie-selection-section">
          <div className="container">
            <div className="selection-header">
              <div className="back-to-packs">
                <button className="back-btn" onClick={backToPackSelection}>
                  ← Back to Pack Selection
                </button>
              </div>
              <h2>Select {currentPack.size} Flavors</h2>
              <div className="pack-progress">
                <span>{getTotalSelectedInPack()}</span> of <span>{currentPack.size}</span> cookies selected
              </div>
            </div>
            <div className="cookie-flavors">
              {filteredFlavors.map(cookie => {
                const selectedItem = currentPackItems.find(item => item.id === cookie.id);
                const quantity = selectedItem ? selectedItem.quantity : 0;
                const canAddMore = getTotalSelectedInPack() < currentPack.size;
                
                return (
                  <div key={cookie.id} className="cookie-flavor-item">
                    <div className="cookie-info">
                      <div className="cookie-name">{cookie.name}</div>
                      <div className="cookie-details">
                        {cookie.calories}
                        {cookie.surcharge && ` / ${cookie.surcharge}`}
                      </div>
                      <div className="cookie-category">
                        {cookie.category.charAt(0).toUpperCase() + cookie.category.slice(1)}
                      </div>
                    </div>
                    <div className="cookie-quantity">
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateCookieQuantity(cookie.id, -1)}
                        disabled={quantity <= 0}
                      >
                        -
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
            <div className="pack-actions">
              <button 
                className="add-to-bag-btn" 
                onClick={addPackToBag}
                disabled={getTotalSelectedInPack() !== currentPack.size}
              >
                {getTotalSelectedInPack() === currentPack.size ? 'Add to Bag' : `Select ${currentPack.size - getTotalSelectedInPack()} more`}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
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
              <p>📧 hello@happilyeverbakers.com</p>
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
            <p>&copy; 2024 Happily Ever Bakers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
