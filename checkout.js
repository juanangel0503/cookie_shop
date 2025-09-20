// Checkout page functionality
let checkoutCart = [];

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutCart();
    
    // If cart is empty, add some test data for demonstration
    if (checkoutCart.length === 0) {
        checkoutCart = [{
            id: 'test_6pack_1',
            packType: '6pack',
            packName: '6-Pack',
            packPrice: 24.99,
            packSize: 6,
            cookies: [
                { id: 1, name: "Grandma's Chocolate Chip", quantity: 2 },
                { id: 2, name: "Vanilla Sugar Cookie", quantity: 1 },
                { id: 3, name: "Oatmeal Raisin", quantity: 3 }
            ],
            quantity: 1
        }];
    }
    
    displayOrderSummary();
    setupFormValidation();
    setupFormSubmission();
});

// Load cart data from localStorage
function loadCheckoutCart() {
    const savedCart = localStorage.getItem('cookieCart');
    if (savedCart) {
        checkoutCart = JSON.parse(savedCart);
    } else {
        // If no cart data, redirect back to shop
        window.location.href = 'index.html';
    }
}

// Display order summary
function displayOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    
    if (checkoutCart.length === 0) {
        orderSummary.innerHTML = '<p>No items in your order.</p>';
        return;
    }
    
    orderSummary.innerHTML = '';
    let totalItemCount = 0;
    let totalPrice = 0;
    
    checkoutCart.forEach(item => {
        totalItemCount += item.quantity;
        totalPrice += (item.packPrice * item.quantity);
        
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        
        // Create individual cookies list
        let cookiesList = '';
        if (item.cookies && item.cookies.length > 0) {
            cookiesList = '<div class="pack-cookies-detail">';
            item.cookies.forEach(cookie => {
                cookiesList += `<div class="pack-cookie-detail">• ${cookie.quantity} ${cookie.name}</div>`;
            });
            cookiesList += '</div>';
        }
        
        summaryItem.innerHTML = `
            <div class="item-details">
                <div class="item-emoji">📦</div>
                <div class="item-info">
                    <h4>${item.packName}</h4>
                    <p>$${item.packPrice.toFixed(2)} per pack</p>
                    ${cookiesList}
                </div>
            </div>
            <div class="item-total">
                ${item.quantity} × $${item.packPrice.toFixed(2)} = $${(item.packPrice * item.quantity).toFixed(2)}
            </div>
        `;
        orderSummary.appendChild(summaryItem);
    });
    
    // Update the order breakdown display
    const subtotalElement = document.getElementById('subtotal');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (subtotalElement) {
        subtotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
    
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('orderForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Validate individual field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if field is empty
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.field-error');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('orderForm');
    const submitBtn = document.getElementById('submitOrderBtn');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            submitOrder();
        }
    });
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('orderForm');
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Submit order
async function submitOrder() {
    const submitBtn = document.getElementById('submitOrderBtn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Processing Order...';
    
    try {
        // Collect form data
        const formData = collectFormData();
        
        // Create order object
        const order = {
            ...formData,
            items: checkoutCart,
            orderDate: new Date().toISOString(),
            orderNumber: generateOrderNumber(),
            totalItems: checkoutCart.reduce((sum, item) => sum + item.quantity, 0),
            totalValue: checkoutCart.reduce((sum, item) => sum + (item.packPrice * item.quantity), 0)
        };
        
        // Submit to GHL (simulated)
        const result = await submitToGHL(order);
        
        if (result.success) {
            // Show success message
            showSuccessMessage(order);
            
            // Clear cart
            localStorage.removeItem('cookieCart');
            localStorage.removeItem('checkoutCart');
            
            // Redirect to success page or show confirmation
            setTimeout(() => {
                showOrderConfirmation(order);
            }, 2000);
        } else {
            throw new Error(result.message || 'Failed to submit order');
        }
        
    } catch (error) {
        console.error('Order submission error:', error);
        showErrorMessage('Failed to submit order. Please try again.');
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Collect form data
function collectFormData() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    
    return {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        deliveryAddress: formData.get('deliveryAddress'),
        city: formData.get('city'),
        zipCode: formData.get('zipCode'),
        deliveryDate: formData.get('deliveryDate'),
        specialInstructions: formData.get('specialInstructions')
    };
}

// Generate order number
function generateOrderNumber() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `HEB-${timestamp}-${random}`.toUpperCase();
}

// Submit to GHL (simulated)
async function submitToGHL(order) {
    // This would integrate with actual GHL API
    // For demo purposes, we'll simulate the API call
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful submission
            console.log('Order submitted to GHL:', order);
            resolve({
                success: true,
                orderId: order.orderNumber,
                message: 'Order submitted successfully'
            });
        }, 2000);
    });
}

// Show success message
function showSuccessMessage(order) {
    const message = document.createElement('div');
    message.className = 'message success';
    message.innerHTML = `
        <h3>🎉 Order Submitted Successfully!</h3>
        <p>Your order #${order.orderNumber} has been received.</p>
        <p>We'll send you an invoice shortly and prepare your delicious cookies!</p>
    `;
    
    const container = document.querySelector('.checkout-container');
    container.insertBefore(message, container.firstChild);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show error message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message error';
    errorDiv.textContent = message;
    
    const container = document.querySelector('.checkout-container');
    container.insertBefore(errorDiv, container.firstChild);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show order confirmation
function showOrderConfirmation(order) {
    const confirmationHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation - Happily Ever Bakers</title>
            <link rel="stylesheet" href="styles.css">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body>
            <header class="header">
                <div class="container">
                    <div class="logo">
                        <h1>🍪 Happily Ever Bakers</h1>
                    </div>
                </div>
            </header>
            
            <div style="max-width: 800px; margin: 0 auto; padding: 2rem; margin-top: 100px; text-align: center;">
                <div style="background: white; border-radius: 15px; padding: 3rem; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                    <h1 style="color: #8B4513; margin-bottom: 1rem;">🎉 Order Confirmed!</h1>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem;">Thank you for your order, ${order.firstName}!</p>
                    
                    <div style="background: #f8f9fa; padding: 2rem; border-radius: 10px; margin: 2rem 0;">
                        <h3 style="color: #8B4513; margin-bottom: 1rem;">Order Details</h3>
                        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                        <p><strong>Total Items:</strong> ${order.totalItems}</p>
                        <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div style="margin: 2rem 0;">
                        <h3 style="color: #8B4513; margin-bottom: 1rem;">What's Next?</h3>
                        <p>📧 You'll receive an email confirmation shortly</p>
                        <p>💰 We'll send you an invoice for payment</p>
                        <p>🍪 Your cookies will be freshly baked and delivered</p>
                    </div>
                    
                    <a href="index.html" style="display: inline-block; background: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; margin-top: 2rem;">
                        Back to Cookie Shop
                    </a>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Open confirmation in new window
    const confirmationWindow = window.open('', '_blank');
    confirmationWindow.document.write(confirmationHTML);
    confirmationWindow.document.close();
}
