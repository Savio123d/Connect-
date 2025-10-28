"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [funcao, setFuncao] = useState("");
  const [nivel, setNivel] = useState("Colaborador");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        nome: nomeCompleto,
        email,
        cpf,
        senha,
        funcao,
        nivel,
      };
      await api.post("/colaboradores", payload);
      alert("Registro criado com sucesso. Agora você pode fazer login.");
      nav("/login");
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar (verifique o console).");
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

        <h2 className="auth-title">CADASTRE-SE</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            placeholder="Nome Completo"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            required
          />
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
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <input
            className="auth-input"
            placeholder="Criar Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input
            className="auth-input"
            placeholder="Função"
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            required
          />

          <div className="nivel-section">
            <label className="nivel-label">Nível</label>
            <div className="nivel-toggle">
              <button
                type="button"
                className={`nivel-option ${
                  nivel === "Colaborador" ? "active" : ""
                }`}
                onClick={() => setNivel("Colaborador")}
              >
                Colaborador
              </button>
              <button
                type="button"
                className={`nivel-option ${
                  nivel === "Gerente" ? "active" : ""
                }`}
                onClick={() => setNivel("Gerente")}
              >
                Gerente
              </button>
            </div>
          </div>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Criar conta"}
          </button>
        </form>

        <div className="auth-link">
          Já tem uma conta? <Link to="/login">Faça Login</Link>
        </div>
      </div>
    </div>
  );
}
