// FADOJOY PHARMACY DATA
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

// Categories
const categories = [
    { id: "all", name: "All Medications", icon: "fas fa-star-of-life", description: "Browse our complete range of pharmaceutical products" },
    { id: "pain", name: "Pain Relief", icon: "fas fa-head-side-virus", description: "For headaches, muscle pain, arthritis and more" },
    { id: "cold", name: "Cold & Flu", icon: "fas fa-lungs-virus", description: "Medications to relieve cold and flu symptoms" },
    { id: "allergy", name: "Allergy", icon: "fas fa-allergies", description: "For seasonal allergies, hay fever and reactions" },
    { id: "digestive", name: "Digestive Health", icon: "fas fa-stomach", description: "For heartburn, indigestion, nausea and more" },
    { id: "skin", name: "Skin Care", icon: "fas fa-spa", description: "Creams, ointments and treatments for skin conditions" },
    { id: "vitamins", name: "Vitamins & Supplements", icon: "fas fa-capsules", description: "Essential vitamins and dietary supplements" },
    { id: "antibiotics", name: "Antibiotics", icon: "fas fa-bacteria", description: "Prescription antibiotics for bacterial infections" },
    { id: "diabetes", name: "Diabetes Care", icon: "fas fa-syringe", description: "Diabetes testing and management supplies" },
    { id: "firstaid", name: "First Aid", icon: "fas fa-first-aid", description: "First aid supplies and emergency care" },
    { id: "baby", name: "Baby Care", icon: "fas fa-baby", description: "Products for infant and child care" },
    { id: "women", name: "Women's Health", icon: "fas fa-female", description: "Women's health and wellness products" }
];

// Drugs with REAL Nigerian Prices (based on current market rates)
const drugs = [
    // Pain Relief
    {
        id: 1,
        name: "Paracetamol (500mg)",
        description: "For relief of mild to moderate pain and fever reduction. Effective for headaches, toothaches, and post-immunization fever. Contains 20 tablets.",
        price: 350,
        category: "pain",
        type: "otc",
        image: "💊",
        dosage: "1-2 tablets every 4-6 hours",
        manufacturer: "Emzor Pharmaceuticals",
        stock: 150,
        prescription: false
    },
    {
        id: 2,
        name: "Ibuprofen (400mg)",
        description: "Non-steroidal anti-inflammatory drug (NSAID) used to treat pain, fever, and inflammation. Helps with arthritis and menstrual pain. Contains 30 tablets.",
        price: 850,
        category: "pain",
        type: "otc",
        image: "🩹",
        dosage: "1 tablet every 6-8 hours",
        manufacturer: "Swiss Pharma",
        stock: 95,
        prescription: false
    },
    {
        id: 3,
        name: "Dicloflam (Diclofenac 50mg)",
        description: "Strong anti-inflammatory for arthritis, muscle pain, and post-surgical pain. Provides fast relief from severe pain and inflammation.",
        price: 1200,
        category: "pain",
        type: "prescription",
        image: "💊",
        dosage: "1 tablet twice daily",
        manufacturer: "Novartis",
        stock: 60,
        prescription: true
    },
    {
        id: 4,
        name: "Tramadol (50mg)",
        description: "Prescription pain medication for moderate to severe pain. Requires doctor's prescription. Contains 10 capsules.",
        price: 2500,
        category: "pain",
        type: "prescription",
        image: "💊",
        dosage: "1 capsule every 6 hours",
        manufacturer: "M&B Pharmaceuticals",
        stock: 40,
        prescription: true
    },

    // Cold & Flu
    {
        id: 5,
        name: "Coldcap Extreme",
        description: "Multi-symptom relief for cold and flu. Reduces fever, relieves aches, clears nasal congestion, and suppresses cough. Contains 10 capsules.",
        price: 950,
        category: "cold",
        type: "otc",
        image: "🤧",
        dosage: "1 capsule every 6 hours",
        manufacturer: "Biofem Pharmaceuticals",
        stock: 120,
        prescription: false
    },
    {
        id: 6,
        name: "Benylin Cough Syrup",
        description: "Relieves cough due to minor throat and bronchial irritation. Helps loosen phlegm and thin bronchial secretions. 100ml bottle.",
        price: 1250,
        category: "cold",
        type: "otc",
        image: "🍯",
        dosage: "10ml every 4-6 hours",
        manufacturer: "Johnson & Johnson",
        stock: 80,
        prescription: false
    },
    {
        id: 7,
        name: "Vicks VapoRub",
        description: "Topical decongestant for cough and cold relief. Provides soothing relief from chest congestion and coughing. 50g jar.",
        price: 750,
        category: "cold",
        type: "otc",
        image: "🧴",
        dosage: "Apply to chest and throat",
        manufacturer: "Procter & Gamble",
        stock: 150,
        prescription: false
    },

    // Allergy
    {
        id: 8,
        name: "Cetirizine (10mg)",
        description: "Antihistamine used to treat allergy symptoms such as watery eyes, runny nose, itching eyes/nose, and sneezing. Contains 30 tablets.",
        price: 1200,
        category: "allergy",
        type: "otc",
        image: "🌼",
        dosage: "1 tablet daily",
        manufacturer: "GlaxoSmithKline",
        stock: 110,
        prescription: false
    },
    {
        id: 9,
        name: "Loratadine (10mg)",
        description: "Non-drowsy antihistamine that reduces the effects of natural chemical histamine in the body. Used to treat allergy symptoms. 30 tablets.",
        price: 1500,
        category: "allergy",
        type: "otc",
        image: "🌻",
        dosage: "1 tablet daily",
        manufacturer: "Merck & Co.",
        stock: 95,
        prescription: false
    },
    {
        id: 10,
        name: "Avamys Nasal Spray",
        description: "Nasal corticosteroid spray for seasonal and year-round allergies. Reduces inflammation and allergy symptoms. 120 sprays.",
        price: 4500,
        category: "allergy",
        type: "prescription",
        image: "💨",
        dosage: "2 sprays each nostril daily",
        manufacturer: "GlaxoSmithKline",
        stock: 45,
        prescription: true
    },

    // Digestive Health
    {
        id: 11,
        name: "Omeprazole (20mg)",
        description: "Proton pump inhibitor that decreases the amount of acid produced in the stomach. Treats heartburn and GERD. 28 capsules.",
        price: 1800,
        category: "digestive",
        type: "prescription",
        image: "💊",
        dosage: "1 capsule daily before food",
        manufacturer: "AstraZeneca",
        stock: 75,
        prescription: true
    },
    {
        id: 12,
        name: "Gaviscon Antacid",
        description: "Provides fast relief from heartburn, acid indigestion, and sour stomach by neutralizing stomach acid. 200ml bottle.",
        price: 1350,
        category: "digestive",
        type: "otc",
        image: "💊",
        dosage: "10-20ml after meals",
        manufacturer: "Reckitt Benckiser",
        stock: 90,
        prescription: false
    },
    {
        id: 13,
        name: "Imodium (Loperamide)",
        description: "Anti-diarrheal medication that slows down gut movement. Provides fast relief from diarrhea. 12 capsules.",
        price: 950,
        category: "digestive",
        type: "otc",
        image: "💊",
        dosage: "2 capsules initially, then 1 after each loose stool",
        manufacturer: "Johnson & Johnson",
        stock: 100,
        prescription: false
    },

    // Skin Care
    {
        id: 14,
        name: "Hydrocortisone Cream 1%",
        description: "Topical steroid used to treat inflammation of the skin caused by conditions such as eczema, psoriasis, and allergic reactions. 30g tube.",
        price: 850,
        category: "skin",
        type: "otc",
        image: "🧴",
        dosage: "Apply thin layer 2-3 times daily",
        manufacturer: "Pfizer",
        stock: 120,
        prescription: false
    },
    {
        id: 15,
        name: "Betamethasone Cream",
        description: "Potent topical steroid for severe skin conditions like eczema and psoriasis. Provides strong anti-inflammatory effect. 30g tube.",
        price: 1500,
        category: "skin",
        type: "prescription",
        image: "🧴",
        dosage: "Apply once or twice daily",
        manufacturer: "GlaxoSmithKline",
        stock: 60,
        prescription: true
    },
    {
        id: 16,
        name: "Miconazole Antifungal Cream",
        description: "Treats fungal skin infections such as athlete's foot, jock itch, and ringworm. Provides relief from itching and burning. 30g tube.",
        price: 950,
        category: "skin",
        type: "otc",
        image: "🧴",
        dosage: "Apply twice daily for 2-4 weeks",
        manufacturer: "Bayer",
        stock: 110,
        prescription: false
    },

    // Vitamins & Supplements
    {
        id: 17,
        name: "Vitamin C (1000mg)",
        description: "Essential vitamin for the growth and repair of tissues in all parts of your body. Boosts immune system function. 30 tablets.",
        price: 1250,
        category: "vitamins",
        type: "otc",
        image: "🍊",
        dosage: "1 tablet daily",
        manufacturer: "Nature's Bounty",
        stock: 200,
        prescription: false
    },
    {
        id: 18,
        name: "Multivitamin Complex",
        description: "Daily multivitamin supplement containing essential vitamins and minerals to support overall health and wellbeing. 60 tablets.",
        price: 2500,
        category: "vitamins",
        type: "otc",
        image: "💊",
        dosage: "1 tablet daily",
        manufacturer: "Centrum",
        stock: 150,
        prescription: false
    },
    {
        id: 19,
        name: "Vitamin D3 (5000IU)",
        description: "Essential for bone health, immune function, and mood regulation. Especially important for indoor lifestyles. 60 softgels.",
        price: 1800,
        category: "vitamins",
        type: "otc",
        image: "☀️",
        dosage: "1 softgel daily",
        manufacturer: "Now Foods",
        stock: 95,
        prescription: false
    },

    // Antibiotics
    {
        id: 20,
        name: "Amoxicillin (500mg)",
        description: "Broad-spectrum antibiotic used to treat a variety of bacterial infections. Effective against pneumonia, bronchitis, and ear infections. 21 capsules.",
        price: 2200,
        category: "antibiotics",
        type: "prescription",
        image: "💊",
        dosage: "1 capsule every 8 hours",
        manufacturer: "GlaxoSmithKline",
        stock: 85,
        prescription: true
    },
    {
        id: 21,
        name: "Ciprofloxacin (500mg)",
        description: "Fluoroquinolone antibiotic for urinary tract infections, respiratory infections, and skin infections. Requires prescription. 10 tablets.",
        price: 2800,
        category: "antibiotics",
        type: "prescription",
        image: "💊",
        dosage: "1 tablet twice daily",
        manufacturer: "Bayer",
        stock: 70,
        prescription: true
    },
    {
        id: 22,
        name: "Azithromycin (500mg)",
        description: "Macrolide antibiotic for respiratory infections, skin infections, and sexually transmitted diseases. Convenient once-daily dosing. 3 tablets.",
        price: 3500,
        category: "antibiotics",
        type: "prescription",
        image: "💊",
        dosage: "1 tablet daily for 3 days",
        manufacturer: "Pfizer",
        stock: 55,
        prescription: true
    },

    // Diabetes Care
    {
        id: 23,
        name: "Metformin (500mg)",
        description: "First-line medication for type 2 diabetes. Helps control blood sugar levels and improves insulin sensitivity. 60 tablets.",
        price: 1200,
        category: "diabetes",
        type: "prescription",
        image: "💊",
        dosage: "1 tablet twice daily",
        manufacturer: "Merck & Co.",
        stock: 120,
        prescription: true
    },
    {
        id: 24,
        name: "Glibenclamide (5mg)",
        description: "Sulfonylurea medication that stimulates insulin release from the pancreas. Used for type 2 diabetes management. 30 tablets.",
        price: 950,
        category: "diabetes",
        type: "prescription",
        image: "💊",
        dosage: "1-2 tablets daily",
        manufacturer: "Sanofi",
        stock: 90,
        prescription: true
    },
    {
        id: 25,
        name: "Accu-Chek Test Strips",
        description: "Blood glucose test strips for monitoring blood sugar levels. Compatible with Accu-Chek meters. 50 strips.",
        price: 4500,
        category: "diabetes",
        type: "otc",
        image: "🧪",
        dosage: "As needed for testing",
        manufacturer: "Roche",
        stock: 65,
        prescription: false
    },

    // First Aid
    {
        id: 26,
        name: "Band-Aid Assorted Pack",
        description: "Assorted sizes of adhesive bandages for minor cuts, scrapes, and burns. Water-resistant and flexible. 100 pieces.",
        price: 650,
        category: "firstaid",
        type: "otc",
        image: "🩹",
        dosage: "Apply as needed",
        manufacturer: "Johnson & Johnson",
        stock: 200,
        prescription: false
    },
    {
        id: 27,
        name: "Betadine Antiseptic Solution",
        description: "Antiseptic solution for wound cleaning and prevention of infection. Effective against bacteria, fungi, and viruses. 100ml.",
        price: 850,
        category: "firstaid",
        type: "otc",
        image: "🧴",
        dosage: "Apply to affected area 1-3 times daily",
        manufacturer: "Mundipharma",
        stock: 110,
        prescription: false
    },

    // Baby Care
    {
        id: 28,
        name: "Pampers Diapers (Size 3)",
        description: "Premium baby diapers with superior absorption and leak protection. Comfortable and gentle on baby's skin. 44 pieces.",
        price: 2800,
        category: "baby",
        type: "otc",
        image: "👶",
        dosage: "Change as needed",
        manufacturer: "Procter & Gamble",
        stock: 300,
        prescription: false
    },
    {
        id: 29,
        name: "Baby Johnson's Powder",
        description: "Gentle talc-free powder that helps keep baby's skin dry and comfortable. Prevents diaper rash and irritation. 200g.",
        price: 750,
        category: "baby",
        type: "otc",
        image: "👶",
        dosage: "Apply as needed",
        manufacturer: "Johnson & Johnson",
        stock: 180,
        prescription: false
    },

    // Women's Health
    {
        id: 30,
        name: "Evening Primrose Oil",
        description: "Natural supplement for PMS symptoms, menstrual cramps, and menopausal symptoms. Supports hormonal balance. 60 capsules.",
        price: 3200,
        category: "women",
        type: "otc",
        image: "💊",
        dosage: "1-2 capsules daily",
        manufacturer: "Nature's Way",
        stock: 95,
        prescription: false
    },
    {
        id: 31,
        name: "Feroglobin Liquid",
        description: "Iron supplement with B vitamins for iron deficiency anemia. Especially beneficial for women during pregnancy and menstruation. 200ml.",
        price: 2800,
        category: "women",
        type: "otc",
        image: "🧪",
        dosage: "10ml daily",
        manufacturer: "Vitabiotics",
        stock: 75,
        prescription: false
    }
];

// Sample Reviews
const sampleReviews = [{
        id: 1,
        name: "Amina Mohammed",
        rating: 5,
        text: "Excellent service! The pharmacist took time to explain how to use my child's medication. Delivery was prompt and the staff were very professional.",
        date: "2023-10-15",
        verified: true
    },
    {
        id: 2,
        name: "Chukwu Emeka",
        rating: 4,
        text: "Good variety of medications. Prices are reasonable compared to other pharmacies in Abuja. Will definitely come back for my regular prescriptions.",
        date: "2023-10-10",
        verified: true
    },
    {
        id: 3,
        name: "Fatima Aliyu",
        rating: 5,
        text: "I booked an appointment for a consultation and the pharmacist was very knowledgeable. Solved my issue completely and followed up to check on my progress.",
        date: "2023-10-05",
        verified: true
    },
    {
        id: 4,
        name: "James Okoro",
        rating: 5,
        text: "Emergency delivery service saved me! I needed medication late at night and they delivered within 45 minutes. Lifesavers!",
        date: "2023-09-28",
        verified: true
    },
    {
        id: 5,
        name: "Sarah Johnson",
        rating: 4,
        text: "Great pharmacy with knowledgeable staff. They always have what I need and offer helpful advice. The online ordering system is convenient.",
        date: "2023-09-20",
        verified: true
    },
    {
        id: 6,
        name: "Mohammed Bello",
        rating: 5,
        text: "Best pharmacy in Kubwa! Their prices are fair, and they always have stock of essential medicines. The delivery service is reliable.",
        date: "2023-09-15",
        verified: true
    }
];

// Appointment Times
const appointmentTimes = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
];

// Pickup Times
const pickupTimes = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM"
];