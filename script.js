// FADOJOY PHARMACY - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();

    // Set minimum dates for forms
    setMinDates();

    // Populate appointment times
    populateAppointmentTimes();

    // Populate reservation drugs dropdown
    populateReservationDrugs();

    // Populate reservation pickup times
    populatePickupTimes();
});

function initApp() {
    // Initialize DOM elements
    window.drugsContainer = document.getElementById('drugs-container');
    window.cartItemsContainer = document.getElementById('cart-items');
    window.cartTotalElement = document.getElementById('cart-total');
    window.cartSubtotalElement = document.getElementById('cart-subtotal');
    window.deliveryFeeElement = document.getElementById('delivery-fee');
    window.cartCountElement = document.querySelector('.cart-count');
    window.cartModal = document.getElementById('cart-modal');
    window.orderModal = document.getElementById('order-modal');
    window.mobileMenuBtn = document.querySelector('.mobile-menu');
    window.navMenu = document.querySelector('.nav-menu');
    window.reviewsContainer = document.getElementById('reviews-container');
    window.categoriesContainer = document.getElementById('categories-container');

    // Cart and state management
    window.cart = [];
    window.askForReview = true;
    window.currentOrder = null;

    // Display initial data
    displayCategories();
    displayDrugs(drugs);
    displayReviews(sampleReviews);

    // Load saved data
    loadCart();
    loadReviews();
    loadThemePreference();

    // Setup event listeners
    setupEventListeners();
    setupThemeToggle();

    // Update cart display
    updateCartDisplay();
}

function displayCategories() {
    categoriesContainer.innerHTML = '';

    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.onclick = () => filterDrugs(category.id);

        categoryCard.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
        `;

        categoriesContainer.appendChild(categoryCard);
    });
}

function displayDrugs(drugsArray) {
    drugsContainer.innerHTML = '';

    if (drugsArray.length === 0) {
        drugsContainer.innerHTML = `
            <div class="no-drugs" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--gray); margin-bottom: 20px;"></i>
                <h3 style="color: var(--navy-blue); margin-bottom: 10px;">No medications found</h3>
                <p style="color: var(--gray);">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    drugsArray.forEach(drug => {
        const drugCard = document.createElement('div');
        drugCard.className = 'drug-card';

        // Determine badge type
        const badgeType = drug.prescription ? 'prescription' : 'otc';
        const badgeText = drug.prescription ? 'Rx Only' : 'OTC';

        drugCard.innerHTML = `
            <div class="drug-badge ${badgeType}">${badgeText}</div>
            <div class="drug-image">${drug.image}</div>
            <div class="drug-info">
                <h3 class="drug-name">${drug.name}</h3>
                <p class="drug-description">${drug.description}</p>
                <div class="drug-details">
                    <span><i class="fas fa-industry"></i> ${drug.manufacturer}</span>
                    <span><i class="fas fa-box"></i> ${drug.stock} in stock</span>
                </div>
                <div class="drug-price">₦${drug.price.toLocaleString()}</div>
                <div class="drug-actions">
                    <button class="add-to-cart" onclick="addToCart(${drug.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="view-details" onclick="viewDrugDetails(${drug.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
            </div>
        `;

        drugsContainer.appendChild(drugCard);
    });
}

function filterDrugs(categoryId) {
    if (categoryId === 'all') {
        displayDrugs(drugs);
    } else {
        const filteredDrugs = drugs.filter(drug => drug.category === categoryId);
        displayDrugs(filteredDrugs);
    }

    // Scroll to drugs section
    document.getElementById('drugs').scrollIntoView({ behavior: 'smooth' });
}

function searchDrugs() {
    const searchInput = document.getElementById('search-drugs');
    const searchTerm = searchInput.value.toLowerCase();

    if (!searchTerm) {
        displayDrugs(drugs);
        return;
    }

    const filteredDrugs = drugs.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm) ||
        drug.description.toLowerCase().includes(searchTerm) ||
        drug.manufacturer.toLowerCase().includes(searchTerm)
    );

    displayDrugs(filteredDrugs);
}

function sortDrugs() {
    const sortSelect = document.getElementById('sort-drugs');
    const sortValue = sortSelect.value;

    let sortedDrugs = [...drugs];

    switch (sortValue) {
        case 'name':
            sortedDrugs.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedDrugs.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedDrugs.sort((a, b) => b.price - a.price);
            break;
        case 'category':
            sortedDrugs.sort((a, b) => a.category.localeCompare(b.category));
            break;
    }

    displayDrugs(sortedDrugs);
}

function viewDrugDetails(drugId) {
    const drug = drugs.find(d => d.id === drugId);

    const detailsHTML = `
        <h3 style="color: var(--navy-blue); margin-bottom: 15px;">${drug.name}</h3>
        <p style="color: var(--gray); margin-bottom: 15px;">${drug.description}</p>
        <div style="background: var(--light-gray); padding: 15px; border-radius: var(--radius-md); margin-bottom: 15px;">
            <p style="margin-bottom: 8px;"><strong>Manufacturer:</strong> ${drug.manufacturer}</p>
            <p style="margin-bottom: 8px;"><strong>Category:</strong> ${categories.find(c => c.id === drug.category).name}</p>
            <p style="margin-bottom: 8px;"><strong>Dosage:</strong> ${drug.dosage}</p>
            <p style="margin-bottom: 8px;"><strong>Type:</strong> ${drug.prescription ? 'Prescription Required' : 'Over the Counter'}</p>
            <p><strong>In Stock:</strong> ${drug.stock} units</p>
        </div>
        <h4 style="color: var(--accent); font-size: 1.5rem; margin-bottom: 20px;">₦${drug.price.toLocaleString()}</h4>
        <button class="cta-button" onclick="addToCart(${drug.id}); closeModal();" style="width: 100%;">
            <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
    `;

    showModal('Drug Details', detailsHTML);
}

// Cart Functions
function addToCart(drugId) {
    const drug = drugs.find(d => d.id === drugId);

    if (!drug) {
        showNotification('Drug not found', 'error');
        return;
    }

    // Check if drug requires prescription
    if (drug.prescription) {
        const confirmPurchase = confirm(`⚠️ ${drug.name} requires a prescription.\n\nDo you have a valid prescription from a doctor?\n\nIf yes, please bring it when picking up your order.`);
        if (!confirmPurchase) return;
    }

    // Check stock
    if (drug.stock <= 0) {
        showNotification(`${drug.name} is out of stock`, 'error');
        return;
    }

    const existingItem = cart.find(item => item.id === drugId);

    if (existingItem) {
        if (existingItem.quantity >= drug.stock) {
            showNotification(`Only ${drug.stock} units available`, 'warning');
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: drug.id,
            name: drug.name,
            price: drug.price,
            quantity: 1,
            image: drug.image,
            requiresPrescription: drug.prescription
        });
    }

    updateCartDisplay();
    saveCart();
    showNotification(`${drug.name} added to cart`, 'success');
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Update cart modal if open
    if (cartModal.style.display === 'flex') {
        updateCartModal();
    }
}

function updateCartModal() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p id="empty-cart-message" style="text-align: center; padding: 40px; color: var(--gray);">Your cart is empty</p>';
        cartSubtotalElement.textContent = '0';
        deliveryFeeElement.textContent = '0';
        cartTotalElement.textContent = '0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-price">₦${item.price.toLocaleString()} each</p>
                ${item.requiresPrescription ? '<p style="color: var(--danger); font-size: 0.85rem;"><i class="fas fa-prescription"></i> Prescription Required</p>' : ''}
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, -1)">-</button>
                <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})" style="color: var(--danger); border: none; background: none; cursor: pointer; margin-left: 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Calculate delivery fee
    const deliveryOption = document.getElementById('delivery-option').value;
    let deliveryFee = 0;

    if (deliveryOption === 'delivery-standard') {
        deliveryFee = subtotal >= 10000 ? 0 : 500;
    } else if (deliveryOption === 'delivery-express') {
        deliveryFee = 1500;
    }

    const total = subtotal + deliveryFee;

    cartSubtotalElement.textContent = subtotal.toLocaleString();
    deliveryFeeElement.textContent = deliveryFee.toLocaleString();
    cartTotalElement.textContent = total.toLocaleString();

    // Show/hide delivery fee row
    document.getElementById('delivery-fee-row').style.display = deliveryFee > 0 ? 'flex' : 'none';
}

function updateCartItemQuantity(drugId, change) {
    const item = cart.find(item => item.id === drugId);

    if (item) {
        const drug = drugs.find(d => d.id === drugId);

        if (change > 0 && item.quantity >= drug.stock) {
            showNotification(`Only ${drug.stock} units available`, 'warning');
            return;
        }

        item.quantity += change;

        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== drugId);
        }

        updateCartDisplay();
        saveCart();
    }
}

function removeFromCart(drugId) {
    cart = cart.filter(item => item.id !== drugId);
    updateCartDisplay();
    saveCart();
    showNotification('Item removed from cart', 'info');
}

function openCart() {
    cartModal.style.display = 'flex';
    updateCartModal();
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'warning');
        return;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryOption = document.getElementById('delivery-option').value;
    let deliveryFee = 0;
    let deliveryMethod = 'Store Pickup';

    if (deliveryOption === 'delivery-standard') {
        deliveryFee = subtotal >= 10000 ? 0 : 500;
        deliveryMethod = 'Standard Delivery (2-4 hours)';
    } else if (deliveryOption === 'delivery-express') {
        deliveryFee = 1500;
        deliveryMethod = 'Express Delivery (1 hour)';
    }

    const total = subtotal + deliveryFee;

    // Create order
    const orderId = 'FJ' + Date.now().toString().slice(-8);
    const orderDate = new Date().toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    window.currentOrder = {
        id: orderId,
        date: orderDate,
        items: [...cart],
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: total,
        deliveryMethod: deliveryMethod
    };

    // Show order confirmation
    showOrderConfirmation();

    // Clear cart
    cart = [];
    updateCartDisplay();
    saveCart();

    // Close cart modal
    closeCart();
}

function showOrderConfirmation() {
    const order = window.currentOrder;

    const orderDetailsHTML = `
        <div class="order-success">
            <i class="fas fa-check-circle"></i>
            <h2>Order Confirmed!</h2>
            <p id="order-message">Thank you for your order. We're processing it now.</p>
            
            <div class="order-details">
                <h4>Order Details</h4>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Order Date:</strong> ${order.date}</p>
                <p><strong>Delivery Method:</strong> ${order.deliveryMethod}</p>
                <p><strong>Subtotal:</strong> ₦${order.subtotal.toLocaleString()}</p>
                ${order.deliveryFee > 0 ? `<p><strong>Delivery Fee:</strong> ₦${order.deliveryFee.toLocaleString()}</p>` : ''}
                <p><strong>Total:</strong> ₦<strong>${order.total.toLocaleString()}</strong></p>
                
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--light-gray);">
                    <h5 style="margin-bottom: 10px;">Order Items:</h5>
                    ${order.items.map(item => `
                        <p style="margin-bottom: 5px;">
                            ${item.name} x${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}
                        </p>
                    `).join('')}
                </div>
                
                ${order.items.some(item => item.requiresPrescription) ? `
                    <div style="margin-top: 15px; padding: 10px; background: rgba(255, 107, 107, 0.1); border-radius: var(--radius-md);">
                        <p style="color: var(--danger); margin: 0;">
                            <i class="fas fa-exclamation-triangle"></i>
                            <strong>Prescription Required:</strong> Please bring your prescription when picking up.
                        </p>
                    </div>
                ` : ''}
                
                <div style="margin-top: 15px; padding: 10px; background: rgba(74, 144, 226, 0.1); border-radius: var(--radius-md);">
                    <p style="color: var(--navy-blue); margin: 0;">
                        <i class="fas fa-info-circle"></i>
                        <strong>Next Steps:</strong> We'll contact you within 15 minutes to confirm your order.
                    </p>
                </div>
            </div>
            
            <button class="cta-button" onclick="closeOrderModal()" style="margin-top: 20px;">
                Continue Shopping
            </button>
        </div>
    `;
    
    // Update modal content
    const modalContent = orderModal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <span class="close-modal" onclick="closeOrderModal()">&times;</span>
        ${orderDetailsHTML}
    `;
    
    // Show modal
    orderModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Ask for review if enabled
    if (window.askForReview) {
        setTimeout(() => {
            askForReviewAfterOrder();
        }, 2000);
    }
}

function closeOrderModal() {
    orderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function askForReviewAfterOrder() {
    const reviewConfirmed = confirm(`Thank you for your order!\n\nWould you like to leave a review about your experience?\n\n(You can turn this off in the future)`);
    
    if (reviewConfirmed) {
        document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
    } else {
        const disableConfirm = confirm("Would you like to stop seeing this prompt after purchases?");
        if (disableConfirm) {
            window.askForReview = false;
            localStorage.setItem('askForReview', 'false');
        }
    }
}

// Appointment Functions
function populateAppointmentTimes() {
    const timeSelect = document.getElementById('appointment-time');
    timeSelect.innerHTML = '<option value="">Select a time</option>';
    
    appointmentTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

function setMinDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format as YYYY-MM-DD
    const minDate = tomorrow.toISOString().split('T')[0];
    
    // Set for appointment date
    const appointmentDate = document.getElementById('appointment-date');
    if (appointmentDate) {
        appointmentDate.min = minDate;
        appointmentDate.value = minDate;
    }
    
    // Set for reservation pickup date
    const pickupDate = document.getElementById('reservation-pickup-date');
    if (pickupDate) {
        pickupDate.min = minDate;
        pickupDate.value = minDate;
    }
}

function bookAppointment(event) {
    event.preventDefault();
    
    const name = document.getElementById('patient-name').value;
    const phone = document.getElementById('patient-phone').value;
    const email = document.getElementById('patient-email').value;
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const type = document.getElementById('appointment-type').value;
    const reason = document.getElementById('appointment-reason').value;
    
    // Create appointment object
    const appointment = {
        id: 'APT' + Date.now().toString().slice(-6),
        name: name,
        phone: phone,
        email: email,
        date: date,
        time: time,
        type: type,
        reason: reason,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveAppointment(appointment);
    
    // Show success message
    const successHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--success); margin-bottom: 20px;"></i>
            <h3 style="color: var(--navy-blue); margin-bottom: 15px;">Appointment Booked!</h3>
            <p style="color: var(--gray); margin-bottom: 20px;">
                Your appointment has been scheduled for ${date} at ${time}.
            </p>
            <div style="background: var(--off-white); padding: 15px; border-radius: var(--radius-md); text-align: left; margin-bottom: 20px;">
                <p><strong>Appointment ID:</strong> ${appointment.id}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Type:</strong> ${getAppointmentType(type)}</p>
            </div>
            <p style="color: var(--gray); font-size: 0.9rem;">
                We'll call you at ${phone} to confirm your appointment.
            </p>
        </div>
    `;
    
    showModal('Appointment Confirmation', successHTML);
    
    // Reset form
    document.getElementById('appointment-form').reset();
    setMinDates();
    
    // Ask for review if enabled
    if (window.askForReview) {
        setTimeout(() => {
            const reviewConfirmed = confirm("Appointment booked successfully!\n\nWould you like to leave a review after your consultation?\n\n(You can turn this off in the future)");
            
            if (!reviewConfirmed) {
                const disableConfirm = confirm("Would you like to stop seeing this prompt after appointments?");
                if (disableConfirm) {
                    window.askForReview = false;
                    localStorage.setItem('askForReview', 'false');
                }
            }
        }, 1500);
    }
}

function getAppointmentType(type) {
    const types = {
        'consultation': 'General Consultation',
        'prescription': 'Prescription Review',
        'vaccination': 'Vaccination Advice',
        'screening': 'Health Screening',
        'other': 'Other'
    };
    return types[type] || type;
}

// Reservation Functions
function populateReservationDrugs() {
    const drugSelect = document.getElementById('reservation-drug');
    drugSelect.innerHTML = '<option value="">Select drug</option>';
    
    drugs.forEach(drug => {
        const option = document.createElement('option');
        option.value = drug.id;
        option.textContent = `${drug.name} - ₦${drug.price.toLocaleString()} (${drug.stock} in stock)`;
        drugSelect.appendChild(option);
    });
}

function populatePickupTimes() {
    const timeSelect = document.getElementById('reservation-pickup-time');
    timeSelect.innerHTML = '<option value="">Select time</option>';
    
    pickupTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

function makeReservation(event) {
    event.preventDefault();
    
    const name = document.getElementById('reservation-name').value;
    const phone = document.getElementById('reservation-phone').value;
    const drugId = parseInt(document.getElementById('reservation-drug').value);
    const quantity = parseInt(document.getElementById('reservation-quantity').value);
    const pickupDate = document.getElementById('reservation-pickup-date').value;
    const pickupTime = document.getElementById('reservation-pickup-time').value;
    const method = document.getElementById('reservation-method').value;
    
    // Validate drug selection
    if (!drugId) {
        showNotification('Please select a drug', 'error');
        return;
    }
    
    const drug = drugs.find(d => d.id === drugId);
    
    if (!drug) {
        showNotification('Selected drug not found', 'error');
        return;
    }
    
    // Check stock
    if (quantity > drug.stock) {
        showNotification(`Only ${drug.stock} units available`, 'error');
        return;
    }
    
    // Check minimum quantity
    if (quantity < 1) {
        showNotification('Quantity must be at least 1', 'error');
        return;
    }
    
    // Create reservation
    const reservation = {
        id: 'RES' + Date.now().toString().slice(-6),
        name: name,
        phone: phone,
        drugId: drugId,
        drugName: drug.name,
        quantity: quantity,
        total: drug.price * quantity,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        method: method,
        reservationFee: 500,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveReservation(reservation);
    
    // Show success message
    const successHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-box" style="font-size: 4rem; color: var(--success); margin-bottom: 20px;"></i>
            <h3 style="color: var(--navy-blue); margin-bottom: 15px;">Reservation Confirmed!</h3>
            <p style="color: var(--gray); margin-bottom: 20px;">
                Your reservation has been confirmed.
            </p>
            <div style="background: var(--off-white); padding: 15px; border-radius: var(--radius-md); text-align: left; margin-bottom: 20px;">
                <p><strong>Reservation ID:</strong> ${reservation.id}</p>
                <p><strong>Drug:</strong> ${drug.name}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <p><strong>Total:</strong> ₦${reservation.total.toLocaleString()}</p>
                <p><strong>Reservation Fee:</strong> ₦${reservation.reservationFee.toLocaleString()} (deductible)</p>
                <p><strong>Pickup Date:</strong> ${new Date(pickupDate).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Pickup Time:</strong> ${pickupTime}</p>
                <p><strong>Method:</strong> ${method === 'pickup' ? 'In-Store Pickup' : 'Home Delivery'}</p>
            </div>
            <p style="color: var(--gray); font-size: 0.9rem;">
                We'll hold your reservation for 48 hours. Please pick up before ${new Date(new Date(pickupDate).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
            </p>
        </div>
    `;
    
    showModal('Reservation Confirmation', successHTML);
    
    // Reset form
    document.getElementById('reservation-form').reset();
    setMinDates();
}

// Review Functions
function displayReviews(reviewsArray) {
    reviewsContainer.innerHTML = '';
    
    reviewsArray.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        // Create star rating
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += i <= review.rating 
                ? '<i class="fas fa-star"></i>' 
                : '<i class="far fa-star"></i>';
        }
        
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-name">
                    ${review.name}
                    ${review.verified ? '<i class="fas fa-check-circle" style="color: var(--success); font-size: 0.9rem; margin-left: 5px;"></i>' : ''}
                </div>
                <div class="review-rating">${starsHtml}</div>
            </div>
            <p>${review.text}</p>
            <div class="review-date">
                ${new Date(review.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
        `;
        
        reviewsContainer.appendChild(reviewCard);
    });
}

function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById('reviewer-name').value;
    const email = document.getElementById('reviewer-email').value;
    const rating = parseInt(document.getElementById('rating').value);
    const text = document.getElementById('review-text').value;
    
    // Create review
    const review = {
        id: Date.now(),
        name: name,
        email: email,
        rating: rating,
        text: text,
        date: new Date().toISOString().split('T')[0],
        verified: false
    };
    
    // Get existing reviews
    let allReviews = JSON.parse(localStorage.getItem('fadojoyReviews') || '[]');
    allReviews.unshift(review);
    
    // Save to localStorage
    localStorage.setItem('fadojoyReviews', JSON.stringify(allReviews));
    
    // Update display
    displayReviews(allReviews);
    
    // Reset form
    document.getElementById('review-form').reset();
    resetStars();
    
    showNotification('Thank you for your review!', 'success');
}

function resetStars() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    
    ratingInput.value = '5';
    stars.forEach((star, index) => {
        if (index < 5) {
            star.innerHTML = '<i class="far fa-star"></i>';
            star.classList.remove('active');
        }
    });
    stars[4].innerHTML = '<i class="fas fa-star"></i>';
    stars[4].classList.add('active');
}

// Contact Functions
function submitContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // In a real application, this would send to a server
    const contactData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (for demo purposes)
    saveContactMessage(contactData);
    
    // Show success message
    showNotification('Message sent successfully! We\'ll respond within 24 hours.', 'success');
    
    // Reset form
    document.getElementById('contact-form').reset();
}

// Theme Functions
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    themeToggleBtn.addEventListener('click', () => {
        const body = document.body;
        const isDarkMode = body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
}

function showModal(title, content) {
    const modalHTML = `
        <div class="modal" id="temp-modal" style="display: flex;">
            <div class="modal-content">
                <span class="close-modal" onclick="closeTempModal()">&times;</span>
                <h2>${title}</h2>
                ${content}
            </div>
        </div>
    `;
    
    // Create modal
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstChild);
    document.body.style.overflow = 'hidden';
}

function closeTempModal() {
    const modal = document.getElementById('temp-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.parentNode.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function scrollToDrugs() {
    document.getElementById('drugs').scrollIntoView({ behavior: 'smooth' });
}

// Local Storage Functions
function saveCart() {
    localStorage.setItem('fadojoyCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('fadojoyCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem('fadojoyAppointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('fadojoyAppointments', JSON.stringify(appointments));
}

function saveReservation(reservation) {
    let reservations = JSON.parse(localStorage.getItem('fadojoyReservations') || '[]');
    reservations.push(reservation);
    localStorage.setItem('fadojoyReservations', JSON.stringify(reservations));
}

function saveContactMessage(contact) {
    let contacts = JSON.parse(localStorage.getItem('fadojoyContacts') || '[]');
    contacts.push(contact);
    localStorage.setItem('fadojoyContacts', JSON.stringify(contacts));
}

function loadReviews() {
    const savedReviews = localStorage.getItem('fadojoyReviews');
    if (savedReviews) {
        const userReviews = JSON.parse(savedReviews);
        const allReviews = [...userReviews, ...sampleReviews];
        displayReviews(allReviews);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-drugs');
    if (searchInput) {
        searchInput.addEventListener('input', searchDrugs);
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-drugs');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortDrugs);
    }
    
    // Appointment form
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', bookAppointment);
    }
    
    // Reservation form
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', makeReservation);
    }
    
    // Review form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', submitReview);
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContact);
    }
    
    // Rating stars
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Update star display
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.innerHTML = '<i class="fas fa-star"></i>';
                    s.classList.add('active');
                } else {
                    s.innerHTML = '<i class="far fa-star"></i>';
                    s.classList.remove('active');
                }
            });
        });
    });
    
    // Delivery option change
    const deliveryOption = document.getElementById('delivery-option');
    if (deliveryOption) {
        deliveryOption.addEventListener('change', updateCartModal);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            closeCart();
        }
        if (event.target === orderModal) {
            closeOrderModal();
        }
        const tempModal = document.getElementById('temp-modal');
        if (event.target === tempModal) {
            closeTempModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeCart();
            closeOrderModal();
            closeTempModal();
        }
    });
}

// Initialize star ratings
function initStars() {
    resetStars();
}

// Export functions for global use
window.addToCart = addToCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeFromCart = removeFromCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.checkout = checkout;
window.closeOrderModal = closeOrderModal;
window.viewDrugDetails = viewDrugDetails;
window.scrollToDrugs = scrollToDrugs;
window.filterDrugs = filterDrugs;
window.closeTempModal = closeTempModal;