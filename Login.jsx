export default function Login({ onLogin }) {
  return (
    <div className="box">
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" />
      <h2>Login</h2>
      <input id="email" placeholder="admin@test.com" />
      <button onClick={() => onLogin(email.value)}>Login</button>
    </div>
  );
}
