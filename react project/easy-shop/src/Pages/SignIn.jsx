export default function SignIn({ onNavigate }) {
  return (
    <main className="signin-page">
      <h1>Sign In</h1>
      <button type="button" className="nav-btn" onClick={() => onNavigate('shop')}>
        Back to Shop
      </button>
    </main>
  );
}
