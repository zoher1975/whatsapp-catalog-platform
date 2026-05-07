/**
 * ═══════════════════════════════════════════════════════
 * SMART PAGES CATALOG PLATFORM — Data Layer
 * Replaces Shopify Liquid template variables
 * In production: fetched from REST API / flat JSON files
 * ═══════════════════════════════════════════════════════
 */

window.PlatformData = {

  // ─── Platform Config ─────────────────────────────────
  platform: {
    name: "Smart Pages Catalog",
    version: "1.0.0",
    currency: "SAR",
    currencySymbol: "﷼",
    defaultTemplate: "jewelry",
    supportedTemplates: ["jewelry", "fashion", "restaurant", "beauty", "services", "realestate"],
  },

  // ─── Active Merchant ─────────────────────────────────
  merchant: {
    id: "merchant-001",
    name: "AmaniRenas",
    slug: "amanirenas",
    tagline: "Authentic Sudanese African Heritage",
    whatsapp: "966500000000",
    whatsappLabel: "+966 50 000 0000",
    logo: null,
    template: "jewelry",
    currency: "SAR",
    currencySymbol: "﷼",
    country: "SA",
    languages: ["en", "ar"],
    socialLinks: {
      instagram: "https://instagram.com/amanirenas",
      facebook:  "https://facebook.com/amanirenas",
      whatsapp:  "https://wa.me/966500000000"
    },
    announcement: "✦ Free shipping on orders above 200 SAR ✦ WhatsApp orders available 24/7 ✦",
    trustItems: [
      { icon: "🚚", label: "Free Shipping over 200 SAR" },
      { icon: "✦",  label: "Authentic Sudanese Heritage" },
      { icon: "💬", label: "WhatsApp Support 24/7" },
      { icon: "🔒", label: "Secure Ordering" }
    ]
  },

  // ─── Collections ─────────────────────────────────────
  collections: [
    {
      id: "col-gold",
      slug: "gold-jewelry",
      title: "Gold Jewelry",
      subtitle: "Heritage Gold",
      icon: "✦",
      theme: "gold",
      productCount: 14,
      featured: true,
      description: "18K and 21K gold pieces inspired by ancient Sudanese craftsmanship"
    },
    {
      id: "col-beauty",
      slug: "beauty",
      title: "Beauty Rituals",
      subtitle: "Natural Beauty",
      icon: "🌿",
      theme: "beauty",
      productCount: 8,
      featured: true,
      description: "Khomra, Dalka, and traditional Sudanese beauty essentials"
    },
    {
      id: "col-fragrance",
      slug: "fragrance",
      title: "Bukhoor & Oud",
      subtitle: "Sudanese Fragrance",
      icon: "🕯",
      theme: "smoke",
      productCount: 6,
      featured: true,
      description: "Handcrafted incense blends and luxury oud fragrances"
    },
    {
      id: "col-silver",
      slug: "silver-jewelry",
      title: "Silver Jewelry",
      subtitle: "Pure Silver",
      icon: "◈",
      theme: "silver",
      productCount: 10,
      featured: false,
      description: "Sterling silver pieces with traditional geometric patterns"
    },
    {
      id: "col-oils",
      slug: "oils",
      title: "Karkar & Sesame Oils",
      subtitle: "Natural Oils",
      icon: "🫙",
      theme: "earth",
      productCount: 5,
      featured: false,
      description: "Pure cold-pressed natural oils from Sudan"
    },
    {
      id: "col-rose",
      slug: "rose-gold",
      title: "Rose Gold",
      subtitle: "Modern Heritage",
      icon: "❋",
      theme: "rose",
      productCount: 7,
      featured: false,
      description: "Rose gold pieces that blend tradition with contemporary style"
    }
  ],

  // ─── Products ─────────────────────────────────────────
  products: [
    {
      id: "prod-001",
      slug: "sudanese-gold-necklace-heritage",
      title: "Heritage Gold Necklace",
      category: "jewelry",
      collection: "col-gold",
      price: 480,
      compareAtPrice: 620,
      currency: "SAR",
      badge: "Bestseller",
      image: null,
      images: [],
      description: "Hand-crafted 21K gold necklace inspired by ancient Nubian royal designs. Each piece is made by skilled artisans using traditional Sudanese goldsmithing techniques passed through generations.",
      tags: ["gold", "necklace", "heritage", "handcrafted"],
      available: true,
      featured: true,
      rating: 4.9,
      reviewCount: 47
    },
    {
      id: "prod-002",
      slug: "khomra-sudanese-scrub",
      title: "Khomra Body Scrub",
      category: "beauty",
      collection: "col-beauty",
      price: 85,
      compareAtPrice: null,
      currency: "SAR",
      badge: "Natural",
      image: null,
      images: [],
      description: "Traditional Sudanese khomra body scrub made from fermented wheat, herbs, and natural clays. Leaves skin smooth, radiant, and deeply nourished.",
      tags: ["beauty", "scrub", "natural", "khomra"],
      available: true,
      featured: true,
      rating: 4.8,
      reviewCount: 32
    },
    {
      id: "prod-003",
      slug: "dalka-beauty-ritual",
      title: "Dalka Beauty Set",
      category: "beauty",
      collection: "col-beauty",
      price: 120,
      compareAtPrice: 150,
      currency: "SAR",
      badge: "New",
      image: null,
      images: [],
      description: "Complete dalka ritual set for traditional Sudanese skin brightening. Includes raw dalka paste, application tools, and instructions in English and Arabic.",
      tags: ["beauty", "dalka", "ritual", "skincare"],
      available: true,
      featured: true,
      rating: 4.7,
      reviewCount: 18
    },
    {
      id: "prod-004",
      slug: "bukhoor-sudanese-blend",
      title: "Sudanese Bukhoor Blend",
      category: "fragrance",
      collection: "col-fragrance",
      price: 95,
      compareAtPrice: null,
      currency: "SAR",
      badge: null,
      image: null,
      images: [],
      description: "Premium handcrafted bukhoor incense blend from Sudan. A rich combination of oud, sandalwood, amber, and rose petals. Burns for 2–3 hours with a warm, enveloping fragrance.",
      tags: ["fragrance", "bukhoor", "incense", "oud"],
      available: true,
      featured: true,
      rating: 4.9,
      reviewCount: 61
    },
    {
      id: "prod-005",
      slug: "karkar-oil-natural",
      title: "Karkar Oil — Pure",
      category: "beauty",
      collection: "col-oils",
      price: 75,
      compareAtPrice: null,
      currency: "SAR",
      badge: null,
      image: null,
      images: [],
      description: "100% pure karkar oil, cold-pressed from sesame seeds grown in Sudan. Used for hair growth, skin moisturizing, and traditional body care rituals.",
      tags: ["oil", "karkar", "natural", "hair"],
      available: true,
      featured: false,
      rating: 4.8,
      reviewCount: 29
    },
    {
      id: "prod-006",
      slug: "gold-bangle-set-traditional",
      title: "Traditional Gold Bangle Set",
      category: "jewelry",
      collection: "col-gold",
      price: 320,
      compareAtPrice: null,
      currency: "SAR",
      badge: null,
      image: null,
      images: [],
      description: "Set of 3 handmade 18K gold bangles with traditional Sudanese geometric engravings. Available in sizes S, M, and L.",
      tags: ["gold", "bangle", "bracelet", "set"],
      available: true,
      featured: true,
      rating: 4.7,
      reviewCount: 22
    },
    {
      id: "prod-007",
      slug: "silver-earrings-nubian",
      title: "Nubian Silver Drop Earrings",
      category: "jewelry",
      collection: "col-silver",
      price: 145,
      compareAtPrice: 180,
      currency: "SAR",
      badge: "Sale",
      image: null,
      images: [],
      description: "Sterling silver dangle earrings with Nubian-inspired filigree work. Lightweight and elegant, suitable for both everyday wear and special occasions.",
      tags: ["silver", "earrings", "nubian", "filigree"],
      available: true,
      featured: false,
      rating: 4.6,
      reviewCount: 15
    },
    {
      id: "prod-008",
      slug: "sesame-oil-cold-pressed",
      title: "Cold-Pressed Sesame Oil",
      category: "beauty",
      collection: "col-oils",
      price: 55,
      compareAtPrice: null,
      currency: "SAR",
      badge: "Organic",
      image: null,
      images: [],
      description: "Premium quality cold-pressed sesame oil sourced directly from Sudanese farms. Rich in antioxidants and vitamins E & K. Multi-use: cooking, skin, and hair.",
      tags: ["oil", "sesame", "organic", "natural"],
      available: true,
      featured: false,
      rating: 4.5,
      reviewCount: 38
    }
  ]

};

// ─── WhatsApp Message Builder ─────────────────────────
window.PlatformWA = {
  buildOrderMessage(product, merchantPhone) {
    const msg = `Hello! 👋 I'd like to order:

*${product.title}*
Price: ${product.currency} ${product.price}

Please confirm availability and payment details. Thank you!`;
    return `https://wa.me/${merchantPhone}?text=${encodeURIComponent(msg)}`;
  },

  buildInquiryMessage(product, merchantPhone) {
    const msg = `Hello! 👋 I'm interested in:

*${product.title}*

Could you tell me more about this product? Thank you!`;
    return `https://wa.me/${merchantPhone}?text=${encodeURIComponent(msg)}`;
  },

  buildCatalogMessage(merchantPhone) {
    const msg = `Hello! 👋 I'd like to browse your full catalog and learn about your products.`;
    return `https://wa.me/${merchantPhone}?text=${encodeURIComponent(msg)}`;
  }
};
