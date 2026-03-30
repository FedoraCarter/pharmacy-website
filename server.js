// FADOJOY PHARMACY - Backend Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize empty data files if they don't exist
const initializeFile = (filePath, initialData = []) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    }
};

initializeFile(APPOINTMENTS_FILE);
initializeFile(RESERVATIONS_FILE);
initializeFile(ORDERS_FILE);
initializeFile(REVIEWS_FILE);
initializeFile(CONTACTS_FILE);

// Helper function to read data from file
const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
};

// Helper function to write data to file
const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing to ${filePath}:`, error);
        return false;
    }
};

// Routes

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get pharmacy data
app.get('/api/pharmacy', (req, res) => {
    const pharmacyData = {
        name: "FADOJOY PHARMACY LTD",
        motto: "Your One Stop Shop For All Your Needs",
        address: "Zulahatu Plaza, Gado Nasko Road Kubwa, Abuja",
        phone: ["0803 456 7890", "0902 123 4567"],
        email: "info@fadojoypharmacy.com",
        emergency: "0700 FADOJOY (0700 323 6569)",
        hours: {
            weekdays: "8:00 AM - 9:30 PM",
            sunday: "10:00 AM - 9:00 PM",
            holidays: "10:00 AM - 6:00 PM"
        },
        delivery: {
            standard: 500,
            express: 1500,
            freeThreshold: 10000
        }
    };

    res.json(pharmacyData);
});

// Get drugs data
app.get('/api/drugs', (req, res) => {
    // In a real application, this would come from a database
    const drugs = readData(path.join(__dirname, 'drugs.json')) || getSampleDrugs();
    res.json(drugs);
});

// Get drugs by category
app.get('/api/drugs/category/:category', (req, res) => {
    const category = req.params.category;
    const drugs = readData(path.join(__dirname, 'drugs.json')) || getSampleDrugs();
    const filteredDrugs = category === 'all' ?
        drugs :
        drugs.filter(drug => drug.category === category);
    res.json(filteredDrugs);
});

// Search drugs - FIXED SYNTAX ERROR
app.get('/api/drugs/search', (req, res) => {
    const query = (req.query.q && req.query.q.toLowerCase()) || '';
    const drugs = readData(path.join(__dirname, 'drugs.json')) || getSampleDrugs();

    const filteredDrugs = drugs.filter(drug =>
        drug.name.toLowerCase().includes(query) ||
        drug.description.toLowerCase().includes(query) ||
        drug.manufacturer.toLowerCase().includes(query) ||
        drug.category.toLowerCase().includes(query)
    );

    res.json(filteredDrugs);
});

// Book appointment
app.post('/api/appointments', (req, res) => {
    try {
        const appointment = req.body;

        // Validate required fields
        if (!appointment.name || !appointment.phone || !appointment.date || !appointment.time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Generate appointment ID
        appointment.id = 'APT' + Date.now().toString().slice(-6);
        appointment.status = 'pending';
        appointment.createdAt = new Date().toISOString();

        // Read existing appointments
        const appointments = readData(APPOINTMENTS_FILE);

        // Add new appointment
        appointments.push(appointment);

        // Save to file
        if (writeData(APPOINTMENTS_FILE, appointments)) {
            res.status(201).json({
                success: true,
                message: 'Appointment booked successfully',
                appointmentId: appointment.id,
                appointment: appointment
            });
        } else {
            res.status(500).json({ error: 'Failed to save appointment' });
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get appointments
app.get('/api/appointments', (req, res) => {
    const appointments = readData(APPOINTMENTS_FILE);
    res.json(appointments);
});

// Make reservation
app.post('/api/reservations', (req, res) => {
    try {
        const reservation = req.body;

        // Validate required fields
        if (!reservation.name || !reservation.phone || !reservation.drugId || !reservation.quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Generate reservation ID
        reservation.id = 'RES' + Date.now().toString().slice(-6);
        reservation.status = 'pending';
        reservation.createdAt = new Date().toISOString();

        // Read existing reservations
        const reservations = readData(RESERVATIONS_FILE);

        // Add new reservation
        reservations.push(reservation);

        // Save to file
        if (writeData(RESERVATIONS_FILE, reservations)) {
            res.status(201).json({
                success: true,
                message: 'Reservation created successfully',
                reservationId: reservation.id,
                reservation: reservation
            });
        } else {
            res.status(500).json({ error: 'Failed to save reservation' });
        }
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get reservations
app.get('/api/reservations', (req, res) => {
    const reservations = readData(RESERVATIONS_FILE);
    res.json(reservations);
});

// Place order
app.post('/api/orders', (req, res) => {
    try {
        const order = req.body;

        // Validate required fields
        if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
            return res.status(400).json({ error: 'No items in order' });
        }

        // Generate order ID
        order.id = 'FJ' + Date.now().toString().slice(-8);
        order.status = 'processing';
        order.createdAt = new Date().toISOString();

        // Calculate totals if not provided
        if (!order.subtotal) {
            order.subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }

        if (!order.total) {
            order.total = order.subtotal + (order.deliveryFee || 0);
        }

        // Read existing orders
        const orders = readData(ORDERS_FILE);

        // Add new order
        orders.push(order);

        // Save to file
        if (writeData(ORDERS_FILE, orders)) {
            res.status(201).json({
                success: true,
                message: 'Order placed successfully',
                orderId: order.id,
                order: order
            });
        } else {
            res.status(500).json({ error: 'Failed to save order' });
        }
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get orders
app.get('/api/orders', (req, res) => {
    const orders = readData(ORDERS_FILE);
    res.json(orders);
});

// Submit review
app.post('/api/reviews', (req, res) => {
    try {
        const review = req.body;

        // Validate required fields
        if (!review.name || !review.rating || !review.text) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate rating
        if (review.rating < 1 || review.rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        // Generate review ID
        review.id = Date.now();
        review.date = new Date().toISOString().split('T')[0];
        review.verified = false;

        // Read existing reviews
        const reviews = readData(REVIEWS_FILE);

        // Add new review
        reviews.unshift(review);

        // Save to file
        if (writeData(REVIEWS_FILE, reviews)) {
            res.status(201).json({
                success: true,
                message: 'Review submitted successfully',
                review: review
            });
        } else {
            res.status(500).json({ error: 'Failed to save review' });
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get reviews
app.get('/api/reviews', (req, res) => {
    const reviews = readData(REVIEWS_FILE);
    res.json(reviews);
});

// Submit contact message
app.post('/api/contact', (req, res) => {
    try {
        const contact = req.body;

        // Validate required fields
        if (!contact.name || !contact.email || !contact.message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Generate contact ID
        contact.id = Date.now();
        contact.createdAt = new Date().toISOString();
        contact.status = 'unread';

        // Read existing contacts
        const contacts = readData(CONTACTS_FILE);

        // Add new contact
        contacts.push(contact);

        // Save to file
        if (writeData(CONTACTS_FILE, contacts)) {
            res.status(201).json({
                success: true,
                message: 'Message sent successfully',
                contact: contact
            });
        } else {
            res.status(500).json({ error: 'Failed to save message' });
        }
    } catch (error) {
        console.error('Error submitting contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get contact messages (admin only)
app.get('/api/contact', (req, res) => {
    const contacts = readData(CONTACTS_FILE);
    res.json(contacts);
});

// Get appointment times
app.get('/api/times/appointments', (req, res) => {
    const times = [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
    ];
    res.json(times);
});

// Get pickup times
app.get('/api/times/pickup', (req, res) => {
    const times = [
        "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
        "8:00 PM", "8:30 PM"
    ];
    res.json(times);
});

// Get categories
app.get('/api/categories', (req, res) => {
    const categories = [
        { id: "all", name: "All Medications", icon: "fas fa-star-of-life" },
        { id: "pain", name: "Pain Relief", icon: "fas fa-head-side-virus" },
        { id: "cold", name: "Cold & Flu", icon: "fas fa-lungs-virus" },
        { id: "allergy", name: "Allergy", icon: "fas fa-allergies" },
        { id: "digestive", name: "Digestive Health", icon: "fas fa-stomach" },
        { id: "skin", name: "Skin Care", icon: "fas fa-spa" },
        { id: "vitamins", name: "Vitamins & Supplements", icon: "fas fa-capsules" },
        { id: "antibiotics", name: "Antibiotics", icon: "fas fa-bacteria" },
        { id: "diabetes", name: "Diabetes Care", icon: "fas fa-syringe" },
        { id: "firstaid", name: "First Aid", icon: "fas fa-first-aid" },
        { id: "baby", name: "Baby Care", icon: "fas fa-baby" },
        { id: "women", name: "Women's Health", icon: "fas fa-female" }
    ];
    res.json(categories);
});

// Sample drugs data (fallback)
function getSampleDrugs() {
    return [{
            id: 1,
            name: "Paracetamol (500mg)",
            description: "For relief of mild to moderate pain and fever reduction.",
            price: 350,
            category: "pain",
            type: "otc",
            image: "💊",
            manufacturer: "Emzor Pharmaceuticals",
            stock: 150,
            prescription: false
        },
        {
            id: 2,
            name: "Ibuprofen (400mg)",
            description: "Non-steroidal anti-inflammatory drug for pain and inflammation.",
            price: 850,
            category: "pain",
            type: "otc",
            image: "🩹",
            manufacturer: "Swiss Pharma",
            stock: 95,
            prescription: false
        }
    ];
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`FADOJOY PHARMACY server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});

module.exports = app;