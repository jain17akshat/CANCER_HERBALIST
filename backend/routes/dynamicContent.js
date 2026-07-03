const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PRODUCTS_FILE     = path.join(DATA_DIR, 'products.json');
const BLOGS_FILE        = path.join(DATA_DIR, 'blogs.json');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');

// Helper to read JSON safely
const readData = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data || '[]');
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return [];
};

// Helper to write JSON safely
const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
};

// Simple admin auth check
const checkAdmin = (req, res, next) => {
  const key = req.query.key || req.headers['x-admin-key'];
  const adminSecret = process.env.ADMIN_SECRET || 'ch-admin-2024';
  if (key !== adminSecret) {
    return res.status(401).json({ success: false, error: 'Unauthorized.' });
  }
  next();
};

/* ── PRODUCTS API ──────────────────────────────────────────────── */
router.get('/dynamic-products', (req, res) => {
  const dynamic = readData(PRODUCTS_FILE);
  res.json({ success: true, products: dynamic });
});

router.post('/dynamic-products', checkAdmin, (req, res) => {
  const newProduct = req.body;
  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ success: false, error: 'Product name and price are required.' });
  }

  const list = readData(PRODUCTS_FILE);
  // Auto increment ID (starting from 100 to avoid clash with hardcoded IDs 1-19)
  const nextId = list.length > 0 ? Math.max(...list.map(p => p.id)) + 1 : 100;
  
  const product = {
    id: nextId,
    name: newProduct.name,
    category: newProduct.category || 'Other',
    price: Number(newProduct.price),
    originalPrice: Number(newProduct.originalPrice || newProduct.price),
    rating: Number(newProduct.rating || 5),
    reviews: Number(newProduct.reviews || 0),
    images: Array.isArray(newProduct.images) ? newProduct.images : [],
    color: newProduct.color || '#1a6e52',
    icon: newProduct.icon || '🌿',
    badge: newProduct.badge || null,
    tagline: newProduct.tagline || '',
    description: newProduct.description || '',
    benefits: Array.isArray(newProduct.benefits) ? newProduct.benefits : [],
    ingredients: newProduct.ingredients || '',
    dosage: newProduct.dosage || '',
    size: newProduct.size || '',
    inStock: newProduct.inStock !== false,
  };

  list.push(product);
  if (writeData(PRODUCTS_FILE, list)) {
    // Dynamically update the backend server-side priceList validator to support checkout of this product
    try {
      const priceListPath = path.join(__dirname, 'priceList.js');
      if (fs.existsSync(priceListPath)) {
        let content = fs.readFileSync(priceListPath, 'utf8');
        // Inject price dynamically to PRODUCT_PRICES if we can
        const match = content.match(/const PRODUCT_PRICES = \{([\s\S]*?)\};/);
        if (match) {
          const pricesBody = match[1];
          const newPricesBody = `${pricesBody}\n  ${product.id}: ${product.price}, // Added dynamically`;
          content = content.replace(/const PRODUCT_PRICES = \{([\s\S]*?)\};/, `const PRODUCT_PRICES = {${newPricesBody}\n};`);
          fs.writeFileSync(priceListPath, content, 'utf8');
          console.log(`[dynamicContent] Updated priceList.js with product ID ${product.id}`);
        }
      }
    } catch (e) {
      console.warn('[dynamicContent] Failed to append price to priceList.js:', e.message);
    }
    res.json({ success: true, product });
  } else {
    res.status(500).json({ success: false, error: 'Failed to write to file.' });
  }
});

/* ── BLOGS API ────────────────────────────────────────────────── */
router.get('/dynamic-blogs', (req, res) => {
  const dynamic = readData(BLOGS_FILE);
  res.json({ success: true, blogs: dynamic });
});

router.post('/dynamic-blogs', checkAdmin, (req, res) => {
  const newBlog = req.body;
  if (!newBlog.title || !newBlog.excerpt) {
    return res.status(400).json({ success: false, error: 'Title and excerpt are required.' });
  }

  const list = readData(BLOGS_FILE);
  const nextId = list.length > 0 ? Math.max(...list.map(b => b.id)) + 1 : 100;

  const blog = {
    id: nextId,
    title: newBlog.title,
    image: newBlog.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    category: newBlog.category || 'Other',
    author: newBlog.author || 'By Dr. Herbalist',
    readTime: newBlog.readTime || '5 min read',
    date: newBlog.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    excerpt: newBlog.excerpt,
    content: newBlog.content || '', // Full detail text
  };

  list.push(blog);
  if (writeData(BLOGS_FILE, list)) {
    res.json({ success: true, blog });
  } else {
    res.status(500).json({ success: false, error: 'Failed to write to file.' });
  }
});

/* ── TESTIMONIALS API ─────────────────────────────────────────── */
router.get('/dynamic-testimonials', (req, res) => {
  const dynamic = readData(TESTIMONIALS_FILE);
  res.json({ success: true, testimonials: dynamic });
});

router.post('/dynamic-testimonials', checkAdmin, (req, res) => {
  const newTestimonial = req.body;
  if (!newTestimonial.name || !newTestimonial.text) {
    return res.status(400).json({ success: false, error: 'Name and testimonial text are required.' });
  }

  const list = readData(TESTIMONIALS_FILE);
  
  const testimonial = {
    name: newTestimonial.name,
    location: newTestimonial.location || 'India',
    rating: Number(newTestimonial.rating || 5),
    text: newTestimonial.text,
    date: newTestimonial.date || 'Recent',
  };

  list.push(testimonial);
  if (writeData(TESTIMONIALS_FILE, list)) {
    res.json({ success: true, testimonial });
  } else {
    res.status(500).json({ success: false, error: 'Failed to write to file.' });
  }
});

module.exports = router;
// Force reload: 2026-07-03
