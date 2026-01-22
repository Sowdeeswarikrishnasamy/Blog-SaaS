import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { loginAPI } from "./services/api";

export default function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const login = (email) =>
    loginAPI(email).then(d => {
      setToken(d.token);
      setRole(d.role);
    });

  const logout = () => {
    setToken("");
    setRole("");
  };

  if (!token) return <Login onLogin={login} />;

  return <Dashboard token={token} role={role} onLogout={logout} />;
}

