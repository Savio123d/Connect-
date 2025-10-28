"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get("/colaboradores");
      const usuarios = res.data || [];
      const user = usuarios.find(
        (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        alert("Usuário não encontrado. Cadastre-se primeiro.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login (verifique o console).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-name">Connect</span>
          <span className="brand-plus">+</span>
        </div>
        <p className="auth-tagline">Conectando Pessoas, Fortalecendo Equipes</p>

        <h2 className="auth-title">LOGIN</h2>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            className="auth-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "ACESSAR"}
          </button>
        </form>

        <div className="auth-link">
          Não tem uma conta? <Link to="/register">Registrar</Link>
        </div>
      </div>
    </div>
  );
}
