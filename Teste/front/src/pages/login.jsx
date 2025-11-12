"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api"; // O baseURL é /api

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(""); // Estado para feedback de erro
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro(""); // Limpa erros anteriores

        try {
            // LÓGICA CORRIGIDA:
            // 1. Envia email e senha para o backend
            // A chamada correta é para "/auth/login", sem /api extra
            const res = await api.post("/auth/login", { email, senha });

            // 2. Se o backend retornar 200 OK (res.data é ColaboradorResponseDTO)
            localStorage.setItem("user", JSON.stringify(res.data));
            nav("/dashboard");

        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                setErro("Email ou senha inválidos.");
            } else {
                setErro("Erro ao conectar ao servidor. Tente novamente.");
            }
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

                {/* Mostra o erro na tela */}
                {erro && <div className="auth-error">{erro}</div>}

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