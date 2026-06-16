const products = [
  {
    id: "silk-gold",
    name: "Kanchipuram Gold Silk Saree",
    category: "Silk Sarees",
    price: 8999,
    image: "https://tse3.mm.bing.net/th/id/OIP.erOnXfVur0adgOKfqgVw2wHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "A lustrous festive silk saree with rich zari accents for weddings and grand celebrations."
  },
  {
    id: "silk-maroon",
    name: "Maroon Temple Border Silk Saree",
    category: "Silk Sarees",
    price: 9499,
    image: "https://images.pexels.com/photos/27575174/pexels-photo-27575174.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "A radiant silk drape with a traditional temple border and an heirloom finish."
  },
  {
    id: "cotton-green",
    name: "Handloom Cotton Green Saree",
    category: "Cotton Sarees",
    price: 3499,
    image: "https://assets0.mirraw.com/images/11531348/AS-20BC1665(2)_zoom.jpg?1684848107",
    description: "Breathable handloom cotton for graceful everyday wear and elegant daytime events."
  },
  {
    id: "cotton-indigo",
    name: "Indigo Woven Cotton Saree",
    category: "Cotton Sarees",
    price: 2899,
    image: "https://th.bing.com/th/id/R.210fcf84c2769fe2580112a461ab7794?rik=5XMathW1%2f%2f%2fBlA&riu=http%3a%2f%2f5.imimg.com%2fdata5%2fANDROID%2fDefault%2f2023%2f1%2fWQ%2fFN%2fQB%2f129769159%2fproduct-jpeg-1000x1000.jpg&ehk=2nQ2uaPgEZuFuv1pcKa%2bEgDOQTMpsm25IZIWtbqzUb0%3d&risl=&pid=ImgRaw&r=0",
    description: "A soft cotton weave with a calm indigo tone and subtle border detailing."
  },
  {
    id: "banarasi-red",
    name: "Banarasi Zari Royale Saree",
    category: "Banarasi Sarees",
    price: 12499,
    image: "https://sareewave.com/cdn/shop/files/AYN4004ROYALBLUE-5.jpg?v=1706176595",
    description: "Royal Banarasi artistry with opulent zari work for reception-ready styling."
  },
  {
    id: "banarasi-rose",
    name: "Rose Banarasi Brocade Saree",
    category: "Banarasi Sarees",
    price: 10999,
    image: "https://media.urbanwomania.com/wp-content/uploads/2024/01/Rose-Pink-Georgette-Silk-Banarasi-Saree-with-Meenakari.webp",
    description: "A brocade-rich Banarasi saree with soft rose tones and heritage woven motifs."
  },
  {
    id: "mysore-temple",
    name: "Mysore Silk Temple Gold Saree",
    category: "Mysore Silk Sarees",
    price: 7299,
    image: "https://images.pexels.com/photos/12006825/pexels-photo-12006825.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "Refined southern grace in a smooth Mysore silk drape with a polished glow."
  },
  {
    id: "mysore-emerald",
    name: "Emerald Mysore Silk Saree",
    category: "Mysore Silk Sarees",
    price: 8199,
    image: "https://tse2.mm.bing.net/th/id/OIP.qw5Cik5a0npmoAV8Da8NGAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "A jewel-toned Mysore silk saree made for festive evenings and temple visits."
  },
  {
    id: "georgette-pink",
    name: "Rose Georgette Party Saree",
    category: "Georgette Sarees",
    price: 5899,
    image: "https://i.pinimg.com/originals/ff/26/bf/ff26bf26abd7c05c10b9e46c40e84fb6.jpg",
    description: "A flowy georgette party saree with a soft fall and occasion-ready elegance."
  },
  {
    id: "georgette-champagne",
    name: "Champagne Georgette Saree",
    category: "Georgette Sarees",
    price: 6299,
    image: "https://tse3.mm.bing.net/th/id/OIP.h0K35SumLiNjh7hZUtH3AgHaKf?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "A light georgette drape with champagne shimmer and effortless movement."
  },
  {
    id: "designer-ruby",
    name: "Ruby Designer Bridal Saree",
    category: "Designer Sarees",
    price: 9999,
    image: "https://manyavar.scene7.com/is/image/manyavar/SB16047_422-WINE_401.5868_25-12-2024-16-14:650x900",
    description: "A statement designer saree with bridal-inspired details and a rich ruby mood."
  },
  {
    id: "designer-pearl",
    name: "Pearl Embellished Designer Saree",
    category: "Designer Sarees",
    price: 11499,
    image: "https://assets0.mirraw.com/images/10074402/1006_(3)_zoom.jpg?1647776442",
    description: "An embellished designer saree with polished pearl-like detailing for receptions."
  },
  {
    id: "linen-sunrise",
    name: "Sunrise Linen Saree",
    category: "Linen Sarees",
    price: 4599,
    image: "https://images.pexels.com/photos/29426609/pexels-photo-29426609.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "A crisp linen drape with warm festive tones and easy everyday refinement."
  },
  {
    id: "organza-ivory",
    name: "Ivory Organza Floral Saree",
    category: "Organza Sarees",
    price: 6899,
    image: "https://images.pexels.com/photos/17040015/pexels-photo-17040015.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "A delicate organza saree with floral charm for brunches, engagements, and celebrations."
  },
  {
    id: "chiffon-coral",
    name: "Coral Chiffon Saree",
    category: "Chiffon Sarees",
    price: 3999,
    image: "https://images.pexels.com/photos/19967777/pexels-photo-19967777.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "A breezy chiffon saree with a coral hue and a graceful, lightweight drape."
  }
];

const storeKeys = {
  users: "siriSareesUsers",
  currentUser: "siriSareesCurrentUser",
  wishlist: "siriSareesWishlist",
  cart: "siriSareesCart"
};

const productExtras = {
  "silk-gold": {
    rating: 4.6,
    reviewsCount: 184,
    discount: "18% off",
    offer: "Extra Rs. 500 off on prepaid orders",
    highlights: ["Pure silk blend", "Rich zari border", "Blouse piece included", "Wedding and festive wear"],
    specifications: {
      Fabric: "Silk blend",
      Pattern: "Zari woven",
      "Saree Length": "5.5 m",
      "Blouse Length": "0.8 m",
      Occasion: "Wedding, Festive",
      Care: "Dry clean only"
    },
    info: "This Kanchipuram-inspired saree is designed with a luminous gold finish, detailed zari work, and a structured festive drape.",
    reviews: [
      { name: "Anusha R.", rating: 5, text: "The border looks premium and the saree feels perfect for a wedding event." },
      { name: "Meena K.", rating: 4, text: "Beautiful color and finishing. Delivery packaging was neat." }
    ]
  },
  "silk-maroon": {
    rating: 4.5,
    reviewsCount: 142,
    discount: "16% off",
    offer: "Free shipping on this saree",
    highlights: ["Temple border design", "Smooth silk texture", "Traditional festive look", "Blouse piece included"]
  },
  "cotton-green": {
    rating: 4.4,
    reviewsCount: 96,
    discount: "12% off",
    offer: "Buy 2 cotton sarees and save more",
    highlights: ["Breathable handloom cotton", "Soft daily wear drape", "Lightweight finish", "Easy daytime styling"]
  },
  "cotton-indigo": {
    rating: 4.3,
    reviewsCount: 78,
    discount: "10% off",
    offer: "Special price for new customers",
    highlights: ["Indigo woven body", "Comfortable cotton", "Subtle border detail", "Everyday ethnic wear"]
  },
  "banarasi-red": {
    rating: 4.7,
    reviewsCount: 211,
    discount: "21% off",
    offer: "Extra Rs. 750 off on checkout",
    highlights: ["Brocade woven finish", "Heavy zari work", "Reception-ready styling", "Blouse piece included"]
  },
  "banarasi-rose": {
    rating: 4.5,
    reviewsCount: 134,
    discount: "17% off",
    offer: "Festive offer applied",
    highlights: ["Rose brocade motifs", "Soft festive shade", "Heritage Banarasi style", "Elegant pallu"]
  },
  "mysore-temple": {
    rating: 4.4,
    reviewsCount: 88,
    discount: "14% off",
    offer: "Free delivery",
    highlights: ["Smooth Mysore silk feel", "Temple-inspired border", "Polished glow", "Occasion-ready drape"]
  },
  "mysore-emerald": {
    rating: 4.6,
    reviewsCount: 117,
    discount: "15% off",
    offer: "Bank offer available",
    highlights: ["Emerald festive shade", "Soft silk finish", "Graceful southern styling", "Blouse piece included"]
  },
  "georgette-pink": {
    rating: 4.2,
    reviewsCount: 65,
    discount: "11% off",
    offer: "Party wear special price",
    highlights: ["Flowy georgette fall", "Soft rose shade", "Lightweight drape", "Evening wear styling"]
  },
  "georgette-champagne": {
    rating: 4.3,
    reviewsCount: 74,
    discount: "13% off",
    offer: "Limited-time collection price",
    highlights: ["Champagne shimmer", "Soft georgette texture", "Fluid drape", "Party-ready finish"]
  },
  "designer-ruby": {
    rating: 4.7,
    reviewsCount: 153,
    discount: "19% off",
    offer: "Bridal collection deal",
    highlights: ["Designer bridal look", "Rich ruby tone", "Statement border", "Premium occasion wear"]
  },
  "designer-pearl": {
    rating: 4.6,
    reviewsCount: 129,
    discount: "18% off",
    offer: "Extra savings at checkout",
    highlights: ["Pearl-style embellishment", "Reception-ready finish", "Elegant designer pallu", "Blouse piece included"]
  }
};

const defaultSpecifications = {
  Fabric: "Premium saree fabric",
  Pattern: "Woven and embellished",
  "Saree Length": "5.5 m",
  "Blouse Length": "0.8 m",
  Occasion: "Festive, Casual, Party",
  Care: "Dry clean recommended"
};

products.forEach((product, index) => {
  const extra = productExtras[product.id] || {};
  product.rating = extra.rating || Number((4.2 + (index % 5) * 0.1).toFixed(1));
  product.reviewsCount = extra.reviewsCount || 48 + index * 9;
  product.discount = extra.discount || "10% off";
  product.offer = extra.offer || "Special Siri Saree Divine price";
  product.highlights = extra.highlights || [
    "Premium fabric selection",
    "Blouse piece included",
    "Elegant occasion wear",
    "Carefully packed delivery"
  ];
  product.specifications = { ...defaultSpecifications, ...(extra.specifications || {}) };
  product.info = extra.info || `${product.description} It is chosen for graceful styling, reliable comfort, and a premium Siri Saree Divine boutique finish.`;
  product.reviews = extra.reviews || [
    { name: "Lakshmi P.", rating: 5, text: "The saree looks elegant in person and the fabric finish is very good." },
    { name: "Divya S.", rating: 4, text: "Good value for the price. The color and packing were impressive." }
  ];
});

function readStore(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function productById(id) {
  return products.find((product) => product.id === id);
}

function ratingStars(rating) {
  return Array.from({ length: 5 }, (_, index) => (
    index < Math.round(rating) ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>'
  )).join("");
}

function productGallery(product) {
  const supportingImages = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .concat(products.filter((item) => item.id !== product.id && item.category !== product.category))
    .map((item) => item.image);
  return [product.image, ...supportingImages].slice(0, 4);
}

function relatedProducts(product, limit = 4) {
  const sameCategory = products.filter((item) => item.category === product.category && item.id !== product.id);
  const fallback = products.filter((item) => item.id !== product.id && !sameCategory.includes(item));
  return [...sameCategory, ...fallback].slice(0, limit);
}
