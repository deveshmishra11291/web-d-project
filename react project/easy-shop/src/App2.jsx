import React, { useState } from 'react';

// 1. Mock Data: Hardcoded product list so you don't need a backend/API
const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 99, category: 'Electronics', image: '🎧' },
  { id: 2, name: 'Smart Watch', price: 149, category: 'Electronics', image: '⌚' },
  { id: 3, name: 'Running Shoes', price: 79, category: 'Apparel', image: '👟' },
  { id: 4, name: 'Leather Wallet', price: 39, category: 'Accessories', image: '💼' },
];

export default function App() {
  // 2. State Management
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 3. Core Functions (The Logic)
  
  // Add item to cart or increment quantity if it already exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove item completely from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update item quantity directly via buttons (+ / -)
  const updateQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + amount;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Automatically removes item if qty drops to 0
    );
  };

  // Calculate Total Price dynamically
  const totalCartPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Filter products based on selected category dropdown
  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div style={styles.container}>
      {/* HEADER NAVBAR */}
      <header style={styles.header}>
        <h2>🚀 QuickShop</h2>
        <div>🛒 Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})</div>
      </header>

      <main style={styles.mainLayout}>
        {/* LEFT COLUMN: PRODUCTS */}
        <section style={styles.productSection}>
          <div style={styles.filterBar}>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={styles.select}
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Apparel">Apparel</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <div style={{ fontSize: '40px' }}>{product.image}</div>
                <h3>{product.name}</h3>
                <p style={styles.priceTag}>${product.price}</p>
                <button style={styles.addBtn} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN: LIVE CART */}
        <aside style={styles.cartSection}>
          <h3>Your Shopping Cart</h3>
          {cart.length === 0 ? (
            <p style={{ color: '#777' }}>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <div>
                    <h4>{item.name}</h4>
                    <small>${item.price} x {item.quantity}</small>
                  </div>
                  <div style={styles.cartActions}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={styles.deleteBtn}>🗑️</button>
                  </div>
                </div>
              ))}
              <hr />
              <div style={styles.totalRow}>
                <h4>Total Amount:</h4>
                <h4>${totalCartPrice}</h4>
              </div>
              <button style={styles.checkoutBtn} onClick={() => alert('Order Placed Successfully!')}>
                Checkout
              </button>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}

// 4. Clean Inline CSS Styles (No external CSS file worries)
const styles = {
  container: { fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh', padding: '0 20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', padding: '10px 0', marginBottom: '20px' },
  mainLayout: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' },
  productSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  filterBar: { marginBottom: '20px' },
  select: { padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' },
  productCard: { border: '1px solid #eee', padding: '15px', borderRadius: '6px', textAlign: 'center', backgroundColor: '#fafafa' },
  priceTag: { fontWeight: 'bold', color: '#2ecc71', margin: '10px 0' },
  addBtn: { backgroundColor: '#3498db', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', width: '100%' },
  cartSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', height: 'fit-content' },
  cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' },
  cartActions: { display: 'flex', alignItems: 'center', gap: '8px' },
  qtyBtn: { width: '25px', height: '25px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', margin: '15px 0' },
  checkoutBtn: { backgroundColor: '#2ecc71', color: '#fff', border: 'none', padding: '10px', width: '100%', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }
};