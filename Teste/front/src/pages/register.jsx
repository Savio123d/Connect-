"use client";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api"; // O baseURL é /api

export default function Register() {
    // States do formulário
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [funcao, setFuncao] = useState("");
    const [nivel, setNivel] = useState("Colaborador");
    const [idSetor, setIdSetor] = useState(""); // NOVO: State para o setor

    // States de UI
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [allSetores, setAllSetores] = useState([]); // NOVO: Armazena setores da API

    const nav = useNavigate();

    // NOVO: Busca os setores da API quando o componente carrega
    useEffect(() => {
        const fetchSetores = async () => {
            setLoading(true);
            try {
                const res = await api.get("/setores"); // CORRIGIDO: removido /api
                setAllSetores(res.data || []);
            } catch (err) {
                console.error(err);
                setErro("Falha ao carregar setores. O backend está rodando?");
            } finally {
                setLoading(false);
            }
        };
        fetchSetores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro("");
        setSucesso("");

        if (!idSetor) {
            setErro("Por favor, selecione um setor.");
            setLoading(false);
            return;
        }

        try {
            const payload = {
                nome: nomeCompleto,
                email,
                cpf,
                senha,
                funcao,
                nivel,
                idSetor: parseInt(idSetor, 10), // Envia o ID do setor
            };

            // A chamada correta é "/colaboradores", sem /api
            await api.post("/colaboradores", payload);

            setSucesso("Registro criado com sucesso! Redirecionando para login...");
            setTimeout(() => {
                nav("/login");
            }, 2000);

        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                setErro(`Erro ao registrar: ${JSON.stringify(err.response.data)}`);
            } else {
                setErro("Erro ao registrar. Verifique o console.");
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

                <h2 className="auth-title">CADASTRE-SE</h2>

                {erro && <div className="auth-error">{erro}</div>}
                {sucesso && <div className="auth-success">{sucesso}</div>}

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
                        placeholder="Função (ex: Dev Jr, Analista RH)"
                        value={funcao}
                        onChange={(e) => setFuncao(e.target.value)}
                        required
                    />

                    {/* NOVO: Dropdown de Setor */}
                    <select
                        className="auth-input"
                        value={idSetor}
                        onChange={(e) => setIdSetor(e.target.value)}
                        required
                    >
                        <option value="" disabled>Selecione seu Setor</option>
                        {allSetores.map((setor) => (
                            <option key={setor.id} value={setor.id}>
                                {setor.nomeSetor}
                            </option>
                        ))}
                    </select>

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