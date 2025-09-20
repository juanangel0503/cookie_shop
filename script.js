// Individual Cookie Flavors
const cookieFlavors = [
    {
        id: 1,
        name: "Grandma's Chocolate Chip",
        description: "Our signature cookie made with real butter, brown sugar, and chunks of Belgian chocolate.",
        category: "chocolate",
        emoji: "🍪",
        calories: "650 cal"
    },
    {
        id: 2,
        name: "Vanilla Sugar Cookie",
        description: "Buttery soft sugar cookies with real vanilla extract and a delicate dusting of powdered sugar.",
        category: "classic",
        emoji: "🍪",
        calories: "600 cal"
    },
    {
        id: 3,
        name: "Oatmeal Raisin",
        description: "Old-fashioned oatmeal cookies with plump California raisins, cinnamon, and a touch of nutmeg.",
        category: "classic",
        emoji: "🍪",
        calories: "580 cal"
    },
    {
        id: 4,
        name: "Double Chocolate Fudge",
        description: "For chocolate lovers - rich cocoa cookies with semi-sweet chips and a fudgy center.",
        category: "chocolate",
        emoji: "🍪",
        calories: "720 cal"
    },
    {
        id: 5,
        name: "Strawberry Shortcake",
        description: "Light and airy cookies with freeze-dried strawberries and a hint of cream.",
        category: "fruity",
        emoji: "🍪",
        calories: "680 cal"
    },
    {
        id: 6,
        name: "Lemon Zest",
        description: "Bright and refreshing with fresh lemon zest and a light lemon glaze.",
        category: "fruity",
        emoji: "🍪",
        calories: "620 cal"
    },
    {
        id: 7,
        name: "Pumpkin Spice",
        description: "Fall favorite made with real pumpkin puree, warm spices, and a dusting of cinnamon sugar.",
        category: "seasonal",
        emoji: "🍪",
        calories: "640 cal"
    },
    {
        id: 8,
        name: "Peanut Butter Classic",
        description: "Creamy natural peanut butter cookies with a crisscross pattern.",
        category: "classic",
        emoji: "🍪",
        calories: "590 cal"
    },
    {
        id: 9,
        name: "Red Velvet Indulgence",
        description: "Luxurious red velvet cookies with cream cheese frosting and chocolate chips.",
        category: "chocolate",
        emoji: "🍪",
        calories: "750 cal",
        surcharge: "+$0.99 each"
    },
    {
        id: 10,
        name: "Snickerdoodle Classic",
        description: "Traditional snickerdoodles with cinnamon sugar coating and soft, chewy center.",
        category: "classic",
        emoji: "🍪",
        calories: "610 cal"
    },
    {
        id: 11,
        name: "Blueberry Muffin Top",
        description: "Cookie version of your favorite blueberry muffin with fresh berry pieces.",
        category: "fruity",
        emoji: "🍪",
        calories: "670 cal"
    },
    {
        id: 12,
        name: "Gingerbread Wonder",
        description: "Holiday favorite with warm ginger, molasses, and festive spices.",
        category: "seasonal",
        emoji: "🍪",
        calories: "630 cal"
    }
];

// Pack Options
const packOptions = [
    {
        id: 'single',
        name: "Single",
        price: 4.99,
        size: 1
    },
    {
        id: '4pack',
        name: "4-Pack",
        price: 18.99,
        size: 4
    },
    {
        id: '6pack',
        name: "6-Pack", 
        price: 24.99,
        size: 6
    },
    {
        id: '12pack',
        name: "12-Pack",
        price: 48.99,
        size: 12
    }
];

// Shopping Cart - Crumbl Style
let cart = JSON.parse(localStorage.getItem('cookieCart')) || [];
let currentPack = null; // Currently building pack
let currentPackItems = []; // Individual cookies in current pack

// Individual cookie price for savings calculation
const individualCookiePrice = 4.99;

// Calculate savings percentage
function calculateSavings(boxSize, boxPrice) {
    const individualTotal = individualCookiePrice * boxSize;
    const savings = individualTotal - boxPrice;
    const savingsPercentage = Math.round((savings / individualTotal) * 100);
    return savingsPercentage;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    updateCartDisplay();
    displayPackOptions();
});

// Display pack options
function displayPackOptions() {
    const packOptionsContainer = document.getElementById('packOptions');
    packOptionsContainer.innerHTML = '';
    
    packOptions.forEach(pack => {
        const packCard = document.createElement('div');
        packCard.className = 'pack-option';
        packCard.onclick = () => selectPack(pack);
        
        const savings = pack.size > 1 ? calculateSavings(pack.size, pack.price) : 0;
        
        packCard.innerHTML = `
            <div class="pack-icon">📦</div>
            <h3>${pack.name}</h3>
            <p>${pack.size === 1 ? 'Single cookie' : `Choose ${pack.size} cookies`}</p>
            <div class="pack-price">$${pack.price.toFixed(2)}</div>
            ${savings > 0 ? `<div class="save-badge">Save ${savings}%</div>` : ''}
        `;
        
        packOptionsContainer.appendChild(packCard);
    });
}

// Select a pack and show cookie selection
function selectPack(pack) {
    currentPack = pack;
    currentPackItems = [];
    
    // Update UI
    document.getElementById('packSelection').style.display = 'none';
    document.getElementById('cookieSelection').style.display = 'block';
    
    // Update headers
    document.getElementById('packSizeText').textContent = pack.size;
    document.getElementById('maxCount').textContent = pack.size;
    
    // Display cookie flavors
    displayCookieFlavors();
    
    // Scroll to cookie selection
    document.getElementById('cookieSelection').scrollIntoView({ behavior: 'smooth' });
}

// Select box size (4-pack or 12-pack)
function selectBoxSize(size) {
    selectedBoxSize = size;
    boxPrice = boxPricing[size];
    
    // Update UI
    document.querySelectorAll('.box-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`[data-size="${size}"]`).classList.add('selected');
    
    // Show cookie selection
    document.getElementById('boxSelection').style.display = 'none';
    document.getElementById('cookieSelection').style.display = 'block';
    
    // Update headers
    document.getElementById('boxSizeText').textContent = `${size}-Pack`;
    document.getElementById('maxCount').textContent = size;
    
    // Show box info in cart
    const boxInfo = document.getElementById('boxInfo');
    if (boxInfo) {
        boxInfo.style.display = 'block';
    }
    
    const boxTypeText = document.getElementById('boxTypeText');
    if (boxTypeText) {
        boxTypeText.textContent = `${size}-Pack`;
    }
    
    const boxPriceText = document.getElementById('boxPriceText');
    if (boxPriceText) {
        boxPriceText.textContent = `$${boxPrice.toFixed(2)}`;
    }
    
    // Display products
    displayProducts();
    
    // Scroll to cookie selection
    document.getElementById('cookieSelection').scrollIntoView({ behavior: 'smooth' });
}

// Display cookie flavors for selection
function displayCookieFlavors() {
    const cookieFlavorsContainer = document.getElementById('cookieFlavors');
    cookieFlavorsContainer.innerHTML = '';
    
    cookieFlavors.forEach(cookie => {
        const cookieItem = document.createElement('div');
        cookieItem.className = 'cookie-flavor-item';
        
        const selectedItem = currentPackItems.find(item => item.id === cookie.id);
        const quantity = selectedItem ? selectedItem.quantity : 0;
        const canAddMore = getTotalSelectedInPack() < currentPack.size;
        
        cookieItem.innerHTML = `
            <div class="cookie-info">
                <div class="cookie-name">${cookie.name}</div>
                <div class="cookie-details">
                    ${cookie.calories}
                    ${cookie.surcharge ? ` / ${cookie.surcharge}` : ''}
                </div>
            </div>
            <div class="cookie-quantity">
                <button class="quantity-btn" onclick="updateCookieQuantity(${cookie.id}, -1)" ${quantity <= 0 ? 'disabled' : ''}>-</button>
                <span class="quantity-display">${quantity}</span>
                <button class="quantity-btn" onclick="updateCookieQuantity(${cookie.id}, 1)" ${!canAddMore ? 'disabled' : ''}>+</button>
            </div>
        `;
        
        cookieFlavorsContainer.appendChild(cookieItem);
    });
    
    updatePackProgress();
}

// Create a product card element (for pre-made packs)
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;

    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    card.innerHTML = `
        <div class="product-image">
            ${product.emoji}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <div class="product-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updatePackQuantity(${product.id}, -1)">-</button>
                    <span class="quantity-display">${quantity}</span>
                    <button class="quantity-btn" onclick="updatePackQuantity(${product.id}, 1)">+</button>
                </div>
                <button class="add-to-bag-btn" onclick="addPackToBag(${product.id})">
                    Add to Bag
                </button>
            </div>
        </div>
    `;

    return card;
}

// Get total selected cookies in current pack
function getTotalSelectedInPack() {
    return currentPackItems.reduce((sum, item) => sum + item.quantity, 0);
}

// Update cookie quantity in current pack
function updateCookieQuantity(cookieId, change) {
    const cookie = cookieFlavors.find(c => c.id === cookieId);
    const existingItem = currentPackItems.find(item => item.id === cookieId);
    
    if (existingItem) {
        const newQuantity = existingItem.quantity + change;
        if (newQuantity <= 0) {
            // Remove from pack
            currentPackItems = currentPackItems.filter(item => item.id !== cookieId);
        } else {
            // Update quantity
            existingItem.quantity = newQuantity;
        }
    } else if (change > 0) {
        // Add new cookie to pack
        currentPackItems.push({
            id: cookieId,
            name: cookie.name,
            quantity: 1
        });
    }
    
    displayCookieFlavors();
}

// Update pack progress
function updatePackProgress() {
    const totalSelected = getTotalSelectedInPack();
    const selectedCount = document.getElementById('selectedCount');
    const addToBagBtn = document.getElementById('addToBagBtn');
    
    if (selectedCount) {
        selectedCount.textContent = totalSelected;
    }
    
    if (addToBagBtn) {
        const isPackComplete = totalSelected === currentPack.size;
        addToBagBtn.disabled = !isPackComplete;
        
        if (isPackComplete) {
            addToBagBtn.textContent = `Add to Bag - $${currentPack.price.toFixed(2)}`;
        } else {
            const remaining = currentPack.size - totalSelected;
            addToBagBtn.textContent = `Add ${remaining} More`;
        }
    }
}

// Update pack quantity (for pre-made packs)
function updatePackQuantity(productId, change) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        const newQuantity = cartItem.quantity + change;
        if (newQuantity <= 0) {
            // Remove from cart
            cart = cart.filter(item => item.id !== productId);
        } else {
            // Update quantity
            cartItem.quantity = newQuantity;
        }
    } else if (change > 0) {
        // Add new pack to cart
        cart.push({
            id: productId,
            name: product.name,
            emoji: product.emoji,
            price: product.price,
            packSize: product.packSize,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartDisplay();
    displayProducts();
}

// Add completed pack to bag
function addPackToBag() {
    if (getTotalSelectedInPack() !== currentPack.size) {
        return; // Pack not complete
    }
    
    // Create pack with individual cookies
    const packId = `${currentPack.id}_${Date.now()}`; // Unique ID for each pack
    const packItem = {
        id: packId,
        packType: currentPack.id,
        packName: currentPack.name,
        packPrice: currentPack.price,
        packSize: currentPack.size,
        cookies: [...currentPackItems], // Copy the individual cookies
        quantity: 1
    };
    
    cart.push(packItem);
    saveCartToStorage();
    updateCartDisplay();
    
    // Reset for next pack
    currentPack = null;
    currentPackItems = [];
    
    // Go back to pack selection
    backToPackSelection();
}

// Go back to pack selection
function backToPackSelection() {
    currentPack = null;
    currentPackItems = [];
    
    document.getElementById('cookieSelection').style.display = 'none';
    document.getElementById('packSelection').style.display = 'block';
    
    document.getElementById('packSelection').scrollIntoView({ behavior: 'smooth' });
}

// Update quantity for a product
function updateQuantity(productId, change) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (!cartItem) return;
    
    let newQuantity = cartItem.quantity + change;
    newQuantity = Math.max(0, Math.min(selectedBoxSize, newQuantity));
    
    if (newQuantity === 0) {
        // Remove from cart
        cart = cart.filter(item => item.id !== productId);
    } else {
        // Update quantity
        cartItem.quantity = newQuantity;
    }
    
    saveCartToStorage();
    updateCartDisplay();
    displayProducts();
}

// Set specific quantity for a product
function setQuantity(productId, quantity) {
    const product = products.find(p => p.id === productId);
    const numQuantity = parseInt(quantity) || 0;
    const validQuantity = Math.max(0, Math.min(12, numQuantity));
    
    if (validQuantity === 0) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity = validQuantity;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                emoji: product.emoji,
                quantity: validQuantity
            });
        }
    }
    
    saveCartToStorage();
    updateCartDisplay();
    displayProducts();
}

// Add product to cart (legacy function for button clicks)
function addToCart(productId) {
    updateQuantity(productId, 1);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const totalPacks = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart count (total number of packs)
    if (cartCount) {
        cartCount.textContent = totalPacks;
    }
    
    // Update cart sidebar
    updateCartSidebar();
    
    // Update checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        // Enable button when there are items in cart
        const hasItems = cart.length > 0;
        checkoutBtn.disabled = !hasItems;
        
        // Update button text and styling
        if (hasItems) {
            checkoutBtn.textContent = 'Checkout';
            checkoutBtn.className = 'checkout-btn complete';
        } else {
            checkoutBtn.textContent = 'Checkout';
            checkoutBtn.className = 'checkout-btn';
        }
    }
}

// Update progress bar and status
function updateProgress() {
    if (!selectedBoxSize) return;
    
    const totalSelected = getTotalSelected();
    const progressFill = document.getElementById('progressFill');
    const selectedCount = document.getElementById('selectedCount');
    const boxStatus = document.getElementById('boxStatus');
    
    if (progressFill) {
        const percentage = (totalSelected / selectedBoxSize) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    if (selectedCount) {
        selectedCount.textContent = totalSelected;
    }
    
    if (boxStatus) {
        if (totalSelected === 0) {
            boxStatus.textContent = 'Select your cookies';
        } else if (totalSelected < selectedBoxSize) {
            const remaining = selectedBoxSize - totalSelected;
            boxStatus.textContent = `${remaining} more needed`;
        } else if (totalSelected === selectedBoxSize) {
            boxStatus.textContent = 'Box complete!';
        } else {
            boxStatus.textContent = 'Too many cookies selected';
        }
    }
}

// Update cart sidebar content
function updateCartSidebar() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your bag is empty</p>';
        if (totalPrice) totalPrice.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.packPrice * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Create individual cookies list
        let cookiesList = '';
        if (item.cookies && item.cookies.length > 0) {
            cookiesList = '<div class="pack-cookies">';
            item.cookies.forEach(cookie => {
                cookiesList += `<div class="pack-cookie">${cookie.quantity} ${cookie.name}</div>`;
            });
            cookiesList += '</div>';
        }
        
        cartItem.innerHTML = `
            <div class="cart-item-image">📦</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.packName}</div>
                <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                ${cookiesList}
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updatePackQuantity('${item.id}', -1)">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updatePackQuantity('${item.id}', 1)">+</button>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">×</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Update total price
    if (totalPrice) {
        totalPrice.textContent = `$${subtotal.toFixed(2)}`;
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartDisplay();
    displayProducts();
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
}

// Filter products
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('cookies').scrollIntoView({ behavior: 'smooth' });
}

// Go back to box selection
function backToBoxSelection() {
    // Clear current selection
    selectedBoxSize = null;
    boxPrice = 0;
    cart = [];
    
    // Hide cookie selection, show box selection
    document.getElementById('cookieSelection').style.display = 'none';
    document.getElementById('boxSelection').style.display = 'block';
    
    // Hide box info in cart
    const boxInfo = document.getElementById('boxInfo');
    if (boxInfo) {
        boxInfo.style.display = 'none';
    }
    
    // Clear box selection visual state
    document.querySelectorAll('.box-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Save cleared cart first
    saveCartToStorage();
    
    // Update cart display (this will show cart count as 0)
    updateCartDisplay();
    
    // Scroll to box selection
    document.getElementById('boxSelection').scrollIntoView({ behavior: 'smooth' });
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your bag is empty!');
        return;
    }
    
    // Cart data is already saved as 'cookieCart' in localStorage
    // Navigate to checkout page
    window.location.href = 'checkout.html';
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('cookieCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cookieCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Clear cart (for testing)
function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartDisplay();
    displayProducts();
}

// Export cart data for GHL integration
function getCartData() {
    return {
        items: cart,
        totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
        totalValue: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
}
