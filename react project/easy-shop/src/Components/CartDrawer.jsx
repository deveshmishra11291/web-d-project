export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove }) {
  if (!isOpen) {
    return null;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="cart-drawer">
      <button type="button" className="close-btn" onClick={onClose}>
        Close
      </button>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-line">
              <p className="cart-line-name">{item.name}</p>
              <p className="cart-line-price">
                Rs {item.price.toLocaleString('en-IN')} x {item.quantity}
              </p>
              <div className="cart-line-actions">
                <button type="button" onClick={() => onUpdateQuantity(item.id, -1)}>
                  -
                </button>
                <button type="button" onClick={() => onUpdateQuantity(item.id, 1)}>
                  +
                </button>
                <button type="button" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className="cart-total">Total: Rs {total.toLocaleString('en-IN')}</p>
        </>
      )}
    </aside>
  );
}
