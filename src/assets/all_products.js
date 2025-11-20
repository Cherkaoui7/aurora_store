
export const all_products = [
  // --- MEN PRODUCTS ---
  { 
    id: 'm1', 
    category: 'Men',
    title: 'Classic Cotton Tee', 
    price: 35.00, 
    rating: 4, 
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    description: "A timeless classic. Made from 100% organic cotton, this tee is breathable, soft, and durable.",
    sizes: ["S", "M", "L", "XL"]
  },
  { 
    id: 'm2', 
    category: 'Men',
    title: 'Denim Jacket', 
    price: 120.00, 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80',
    description: "Vintage-inspired denim jacket with a relaxed fit. Perfect for layering.",
    sizes: ["M", "L", "XL"]
  },
  { 
    id: 'm3', 
    category: 'Men',
    title: 'Slim Fit Chinos', 
    price: 85.00, 
    rating: 4, 
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    description: "Tailored chinos that offer both comfort and style for any occasion.",
    sizes: ["30", "32", "34", "36"]
  },
  { 
    id: 'm4', 
    category: 'Men',
    title: 'Oxford Button-Down', 
    price: 70.00, 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: "Crisp, clean, and classic. The essential Oxford shirt.",
    sizes: ["S", "M", "L", "XL"]
  },
  { 
    id: 'm5', 
    category: 'Men',
    title: 'Casual Hoodie', 
    price: 60.00, 
    rating: 4, 
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: "Premium fleece hoodie for maximum comfort.",
    sizes: ["M", "L", "XL"]
  },
  { 
    id: 'm6', 
    category: 'Men',
    title: 'Swim Trunks', 
    price: 45.00, 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1616340306660-285339a028f2?auto=format&fit=crop&w=800&q=80',
    description: "Quick-dry fabric with a modern fit for the beach.",
    sizes: ["S", "M", "L"]
  },

  // --- WOMEN PRODUCTS ---
  { 
    id: 'w1', 
    category: 'Women',
    title: 'Summer Floral Dress', 
    price: 75.00, 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    description: "Lightweight and breathable floral dress, perfect for summer days.",
    sizes: ["S", "M", "L"]
  },
  { 
    id: 'w2', 
    category: 'Women',
    title: 'High-Waist Jeans', 
    price: 98.00, 
    rating: 4, 
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    description: "Flattering high-waist fit with durable denim fabric.",
    sizes: ["26", "28", "30", "32"]
  },
  { 
    id: 'w3', 
    category: 'Women',
    title: 'Silk Blouse', 
    price: 110.00, 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80', 
    description: "Elegant silk blouse suitable for office or evening wear.",
    sizes: ["XS", "S", "M", "L"]
  },
  { 
    id: 'w4', 
    category: 'Women',
    title: 'Knit Cardigan', 
    price: 65.00, 
    rating: 4, 
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    description: "Soft knit cardigan for chilly evenings.",
    sizes: ["One Size"]
  },
  { id: 'w5', title: 'Midi Skirt', price: 55.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?skirt' },
  { id: 'w6', title: 'Activewear Set', price: 80.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?activewear' },

  // --- ACCESSORIES ---
  { 
    id: 'a1', 
    category: 'Accessories',
    title: 'Minimalist Backpack', 
    price: 89.00, 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: "Durable, water-resistant, and designed for the modern commuter.",
    sizes: ["One Size"]
  },
  { 
    id: 'a2', 
    category: 'Accessories',
    title: 'Canvas Sneakers', 
    price: 65.00, 
    rating: 4, 
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    description: "Low-top canvas sneakers with vulcanized rubber sole.",
    sizes: ["US 7", "US 8", "US 9", "US 10"]
  },
  
  { id: 'a3', title: 'Leather Crossbody Bag', price: 110.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?leather bag' },
  { id: 'a4', title: 'Modern Sunglasses', price: 45.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?sunglasses' },
  { id: 'a5', title: 'Classic Watch', price: 150.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?watch' },
  { id: 'a6', title: 'Baseball Cap', price: 30.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?cap' },

  // --- NEW ARRIVALS ---
  { 
    id: 101, 
    category: 'New',
    title: 'Lightweight Linen Shirt', 
    price: 68.00, 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: "Breathable linen for the ultimate summer comfort.",
    sizes: ["S", "M", "L", "XL"]
  },
  { id: 102, category: 'New', title: 'High-Waist Trousers', price: 95.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?trousers' },
  { id: 103, category: 'New', title: 'Woven Straw Hat', price: 42.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?straw hat' },
  { id: 104, category: 'New', title: 'Slip-on Loafers', price: 115.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?loafers' },
];