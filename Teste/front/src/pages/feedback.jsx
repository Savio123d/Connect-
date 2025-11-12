// Refatorado para usar 2 dropdowns (Setor de Destino > Destinatário)
"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "../components/DashboardLayout"
import api from "../api/api" // O baseURL é /api
import "./feedback.css"

// Função para formatar a data
const formatarData = (data) => {
    if (!data) return "Data indisponível";
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(data).toLocaleDateString("pt-BR", options)
}

export default function Feedback() {
    const [aba, setAba] = useState("enviar")

    // Estados para dados da API
    const [sentFeedbacks, setSentFeedbacks] = useState([])
    const [receivedFeedbacks, setReceivedFeedbacks] = useState([])
    const [allColaboradores, setAllColaboradores] = useState([])
    const [allSetores, setAllSetores] = useState([]); // <-- ADICIONADO DE VOLTA

    // Estados de UI
    const [loading, setLoading] = useState(true)
    const [sucesso, setSucesso] = useState(false)
    const [erro, setErro] = useState("")

    // States do formulário
    const [titulo, setTitulo] = useState("");
    const [selectedSetorId, setSelectedSetorId] = useState(""); // <-- ADICIONADO DE VOLTA
    const [destinatarioId, setDestinatarioId] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [categoria, setCategoria] = useState("");
    const [anonimo, setAnonimo] = useState(false);

    // Dados do usuário logado
    const [user, setUser] = useState(null);

    const catToClass = {
        elogio: "verde",
        sugestao: "azul",
        reclamacao: "laranja",
        ocorrencia: "laranja",
    }

    // Hook principal para carregar todos os dados da página
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setErro("");

            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                setErro("Usuário não logado. Faça login novamente.");
                setLoading(false);
                return;
            }

            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            try {
                // 1. Busca todos os dados em paralelo
                const [resColabs, resSetores, resSent, resReceived] = await Promise.all([
                    api.get("/colaboradores"),
                    api.get("/setores"), // <-- ADICIONADO DE VOLTA
                    api.get(`/feedbacks/sent/${parsedUser.id}`),
                    api.get(`/feedbacks/received/${parsedUser.id}`),
                ]);

                // Filtra para não enviar feedback para si mesmo
                setAllColaboradores(resColabs.data.filter((c) => c.id !== parsedUser.id) || []);
                setAllSetores(resSetores.data || []); // <-- ADICIONADO DE VOLTA
                setSentFeedbacks(resSent.data || []);
                setReceivedFeedbacks(resReceived.data || []);

            } catch (err) {
                console.error("[v3] Erro ao buscar dados:", err);
                setErro("Falha ao carregar dados do servidor. O backend está rodando?");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Roda apenas uma vez

    // Lógica de envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSucesso(false);
        setErro("");

        if (!user) {
            setErro("Sessão expirada. Faça login novamente.");
            return;
        }

        // Validação do formulário
        if (!destinatarioId || !titulo || !mensagem || !categoria) {
            setErro("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const payload = {
            titulo: titulo,
            mensagem: mensagem,
            categoria: categoria,
            idRemetente: user.id,
            idDestinatario: Number.parseInt(destinatarioId, 10),
            anonimo: anonimo,
        };

        try {
            setLoading(true);
            await api.post("/feedbacks", payload);

            setSucesso(true);
            // Limpa o formulário
            setTitulo("");
            setSelectedSetorId(""); // <-- Limpa o setor
            setDestinatarioId("");
            setMensagem("");
            setCategoria("");
            setAnonimo(false);

            // Re-busca os feedbacks enviados
            const resSent = await api.get(`/feedbacks/sent/${user.id}`);
            setSentFeedbacks(resSent.data || []);

            setTimeout(() => setSucesso(false), 3000);
        } catch (err) {
            console.error("[v3] Erro ao enviar feedback:", err);
            setErro("Falha ao enviar feedback.");
        } finally {
            setLoading(false);
        }
    };

    // Lógica para remover feedback
    const removerFeedback = async (feedbackId) => {
        if (!user || !window.confirm("Tem certeza que deseja excluir este feedback?")) {
            return;
        }

        try {
            setLoading(true);
            setErro("");
            await api.delete(`/feedbacks/${feedbackId}/${user.id}`);
            setSentFeedbacks(prev => prev.filter(fb => fb.id !== feedbackId));
        } catch (err) {
            console.error("[v3] Erro ao deletar feedback:", err);
            setErro("Falha ao excluir feedback.");
        } finally {
            setLoading(false);
        }
    };

    // --- LÓGICA DE FILTRO CORRIGIDA ---
    // Filtra os colaboradores com base no 'selectedSetorId'
    const colaboradoresFiltrados = selectedSetorId
        ? allColaboradores.filter((colab) => colab.setor?.id === Number.parseInt(selectedSetorId, 10))
        : [];
    // --- FIM DA LÓGICA ---


    // Componente de Card (renderização)
    const FeedbackCard = ({ fb, isSent }) => (
        <article className={`feedback-card ${catToClass[fb.categoria] || "azul"}`}>
            <div className="card-header">
                <h3>{fb.titulo}</h3>
                {isSent && (
                    <button className="btn-excluir" onClick={() => removerFeedback(fb.id)} disabled={loading}>
                        Excluir
                    </button>
                )}
            </div>
            <small>
                <strong>{isSent ? "Para:" : "De:"}</strong>{" "}
                {isSent ? fb.destinatario?.nome || "N/A" : fb.remetente?.nome || "Anônimo"}
            </small>
            <small>
                <strong>Data:</strong> {formatarData(fb.dataEnvio)}
            </small>
            <p>{fb.mensagem}</p>
            <div className="card-footer">
                <small>
                    <strong>Categoria:</strong> {fb.categoria}
                </small>
            </div>
        </article>
    );

    return (
        <DashboardLayout>
            <h1 className="content-title">Gerenciar Feedbacks</h1>

            <div className="feedback-tabs">
                <button onClick={() => setAba("enviar")} className={aba === "enviar" ? "active" : ""}>
                    Enviar Feedback
                </button>
                <button onClick={() => setAba("meus")} className={aba === "meus" ? "active" : ""}>
                    Enviados
                </button>
                <button onClick={() => setAba("publicos")} className={aba === "publicos" ? "active" : ""}>
                    Recebidos
                </button>
            </div>

            {erro && <div className="feedback-error-message">{erro}</div>}

            {aba === "enviar" && (
                <div id="panelEnviar" className="feedback-panel">
                    <form id="feedbackForm" className="feedback-form" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="titulo"
                            placeholder="Título do feedback"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />

                        {/* --- DROPDOWN 1: SETOR DE DESTINO --- */}
                        <select
                            name="idSetorDestino"
                            required
                            value={selectedSetorId}
                            onChange={(e) => {
                                setSelectedSetorId(e.target.value);
                                setDestinatarioId(""); // Reseta o destinatário ao trocar o setor
                            }}
                            disabled={loading}
                        >
                            <option value="" disabled>1. Selecione o Setor de Destino</option>
                            {allSetores.map((setor) => (
                                <option key={setor.id} value={setor.id}>
                                    {setor.nomeSetor}
                                </option>
                            ))}
                        </select>

                        {/* --- DROPDOWN 2: DESTINATÁRIO (FILTRADO) --- */}
                        <select
                            name="idDestinatario"
                            required
                            value={destinatarioId}
                            onChange={(e) => setDestinatarioId(e.target.value)}
                            disabled={loading || !selectedSetorId} // Desabilita se o setor não foi escolhido
                        >
                            <option value="" disabled>
                                {loading
                                    ? "Carregando..."
                                    : (
                                        !selectedSetorId
                                            ? "2. Primeiro selecione um setor"
                                            : (colaboradoresFiltrados.length > 0 ? "2. Selecione o Destinatário" : "Nenhum colega encontrado neste setor")
                                    )
                                }
                            </option>
                            {colaboradoresFiltrados.map((colab) => (
                                <option key={colab.id} value={colab.id}>
                                    {colab.nome} ({colab.cargo})
                                </option>
                            ))}
                        </select>

                        <textarea
                            name="descricao"
                            rows="5"
                            placeholder="Descreva seu feedback..."
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            required
                        ></textarea>

                        <select
                            name="categoria"
                            required
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="" disabled>Selecione a categoria</option>
                            <option value="elogio">Elogio</option>
                            <option value="sugestao">Sugestão</option>
                            <option value="reclamacao">Reclamação</option>
                            <option value="ocorrencia">Ocorrência</option>
                        </select>

                        <div className="feedback-anonimo-check">
                            <input
                                type="checkbox"
                                name="anonimo"
                                id="anonimo"
                                checked={anonimo}
                                onChange={(e) => setAnonimo(e.target.checked)}
                            />
                            <label htmlFor="anonimo">Enviar anonimamente</label>
                        </div>

                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? "Enviando..." : "Enviar"}
                        </button>
                    </form>
                    {sucesso && <div id="success-message">✅ Enviado com sucesso!</div>}
                </div>
            )}

            {aba === "meus" && (
                <div id="panelMeus" className="feedback-panel">
                    <h2>Feedbacks Enviados</h2>
                    <div className="feedback-list">
                        {loading && <p>Carregando...</p>}
                        {!loading && sentFeedbacks.length === 0 && <p>Você ainda não enviou nenhum feedback.</p>}
                        {!loading && sentFeedbacks.map((fb) => <FeedbackCard key={fb.id} fb={fb} isSent={true} />)}
                    </div>
                </div>
            )}

            {aba === "publicos" && (
                <div id="panelPublicos" className="feedback-panel">
                    <h2>Feedbacks Recebidos</h2>
                    <div className="feedback-list">
                        {loading && <p>Carregando...</p>}
                        {!loading && receivedFeedbacks.length === 0 && <p>Nenhum feedback recebido.</p>}
                        {!loading && receivedFeedbacks.map((fb) => <FeedbackCard key={fb.id} fb={fb} isSent={false} />)}
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}