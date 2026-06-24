import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Truck,
  X,
} from 'lucide-react';
import './styles.css';

const products = [
  {
    id: 1,
    name: 'Nomad Weekender Duffel',
    category: 'Travel',
    price: 89,
    rating: 4.8,
    badge: 'Best seller',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Linen Utility Jacket',
    category: 'Apparel',
    price: 126,
    rating: 4.7,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Ceramic Pour Over Set',
    category: 'Home',
    price: 64,
    rating: 4.9,
    badge: 'Limited',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Everyday Knit Sneakers',
    category: 'Footwear',
    price: 112,
    rating: 4.6,
    badge: 'Free ship',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Walnut Desk Organizer',
    category: 'Home',
    price: 48,
    rating: 4.5,
    badge: 'Handmade',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Alpine Thermal Bottle',
    category: 'Travel',
    price: 34,
    rating: 4.7,
    badge: 'Popular',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
  },
];

const categories = ['All', ...new Set(products.map((product) => product.category))];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesQuery = product.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, quantity]) => {
      const product = products.find((item) => item.id === Number(id));
      return { ...product, quantity };
    });
  }, [cart]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(productId) {
    setCart((current) => ({ ...current, [productId]: (current[productId] || 0) + 1 }));
    setCartOpen(true);
  }

  function updateQuantity(productId, amount) {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) + amount;
      const nextCart = { ...current };
      if (nextQuantity <= 0) {
        delete nextCart[productId];
      } else {
        nextCart[productId] = nextQuantity;
      }
      return nextCart;
    });
  }

  return (
    <main>
      <header className="site-header">
        <button className="icon-button menu-button" aria-label="Open navigation">
          <Menu size={21} />
        </button>
        <a className="brand" href="/">
          MarketLane
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#new">New</a>
          <a href="#shop">Shop</a>
          <a href="#deals">Deals</a>
          <a href="#story">Story</a>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart">
          <ShoppingBag size={20} />
          <span>{cartCount}</span>
        </button>
      </header>

      <section className="hero" id="new">
        <div className="hero-copy">
          <span className="eyebrow">Spring essentials</span>
          <h1>Useful goods for brighter everyday rituals.</h1>
          <p>
            A curated storefront inspired by modern ecommerce experiences, built with React and
            ready to customize.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#shop">
              Shop collection
            </a>
            <a className="secondary-link" href="#deals">
              Today&apos;s offers
            </a>
          </div>
        </div>
      </section>

      <section className="trust-row" aria-label="Store benefits">
        <div>
          <Truck size={20} />
          <span>Free delivery over $75</span>
        </div>
        <div>
          <PackageCheck size={20} />
          <span>30 day returns</span>
        </div>
        <div>
          <Heart size={20} />
          <span>Curated small brands</span>
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Featured collection</span>
            <h2>Shop the edit</h2>
          </div>
          <div className="search-box">
            <Search size={18} />
            <input
              aria-label="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
            />
          </div>
        </div>

        <div className="filter-bar" aria-label="Product categories">
          <SlidersHorizontal size={18} />
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span>{product.badge}</span>
              </div>
              <div className="product-info">
                <div>
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                <div className="rating">
                  <Star size={16} fill="currentColor" />
                  {product.rating}
                </div>
              </div>
              <div className="product-footer">
                <strong>${product.price}</strong>
                <button onClick={() => addToCart(product.id)}>
                  <Plus size={17} />
                  Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className={`cart-panel ${cartOpen ? 'open' : ''}`} aria-hidden={!cartOpen}>
        <div className="cart-header">
          <div>
            <span className="eyebrow">Your bag</span>
            <h2>{cartCount} item{cartCount === 1 ? '' : 's'}</h2>
          </div>
          <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={34} />
            <p>Your bag is empty.</p>
          </div>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className="quantity">
                    <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                      <Minus size={15} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <div>
            <span>Subtotal</span>
            <strong>${subtotal}</strong>
          </div>
          <button disabled={cartItems.length === 0}>Checkout</button>
        </div>
      </aside>
      {cartOpen && <button className="scrim" aria-label="Close cart" onClick={() => setCartOpen(false)} />}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
