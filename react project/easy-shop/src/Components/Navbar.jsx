export default function Navbar({
  categories,
  cartCount,
  onOpenCart,
  onSearch,
  onNavigate,
  currentView,
}) {
  return (
    <nav className="navbar">
      <button
        type="button"
        className="brand-btn"
        onClick={() => onNavigate('shop')}
        disabled={currentView === 'shop'}
      >
        Easy Shop
      </button>

      <input
        className="search-input"
        type="search"
        placeholder="Search products"
        onChange={(event) => onSearch(event.target.value)}
      />

      <div className="category-links">
        {categories.map((category) => (
          <a key={category.id} href={`#${category.id}`}>
            {category.title}
          </a>
        ))}
      </div>

      <button
        type="button"
        className="nav-btn"
        onClick={() => onNavigate('signin')}
        disabled={currentView === 'signin'}
      >
        Sign In
      </button>

      <button type="button" className="cart-open-btn" onClick={onOpenCart}>
        Cart ({cartCount})
      </button>
    </nav>
  );
}
