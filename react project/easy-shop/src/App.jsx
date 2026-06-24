import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import CartDrawer from './Components/CartDrawer';
import SignIn from './Pages/SignIn';
import './index.css';

export default function ShopGrid() {
  const [view, setView] = useState('shop');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.products.reduce((acc, product) => {

          const categoryTitle = product.category.charAt(0).toUpperCase() + product.category.slice(1);
          
          let existingCategory = acc.find((cat) => cat.id === product.category);
          
          if (!existingCategory) {
            existingCategory = {
              id: product.category,
              title: categoryTitle,
              products: []
            };
            acc.push(existingCategory);
          }
          
          
          existingCategory.products.push({
            id: product.id,
            name: product.title,
            price: Math.round(product.price * 100),
            img: product.thumbnail,
            link: ""
          });
          
          return acc;
        }, []);

        setCategories(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching live products:", err);
        setLoading(false);
      });
  }, []);

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

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar
        categories={categories}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={(query) => setSearchQuery(query.toLowerCase())}
        onNavigate={(targetView) => setView(targetView)}
        currentView={view}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      {view === 'signin' ? (
        <SignIn onNavigate={(targetView) => setView(targetView)} />
      ) : loading ? (
        <div className="loading-state">
          Loading your store products...
        </div>
      ) : (
        <main className="shop-content">
          {categories.map((category) => {
            const filteredProducts = category.products.filter((product) =>
              product.name.toLowerCase().includes(searchQuery)
            );

            if (filteredProducts.length === 0) return null;

            return (
              <section key={category.id} id={category.id} className="category">
                <h2 className="category-title">{category.title}</h2>
                <div className="grid">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="product c">
                      <img className="pimg" src={product.img} alt={product.name} />
                      <p className="pname">{product.name}</p>
                      <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
                      <div className="btn-group">
                        <button className="buy-btn">Buy</button>
                        <button className="cart-btn" onClick={() => addToCart(product)}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      )}
    </>
  );
}
