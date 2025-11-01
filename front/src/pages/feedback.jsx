"use client"

import { useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import "./feedback.css"

export default function Feedback() {
  const [aba, setAba] = useState("enviar")
  const [meusFeedbacks, setMeusFeedbacks] = useState([])
  const [publicos, setPublicos] = useState([])
  const [sucesso, setSucesso] = useState(false)

  // Mapeia categoria para a classe CSS (para cores)
  const catToClass = {
    elogio: "verde",
    sugestao: "azul",
    reclamacao: "laranja",
    ocorrencia: "laranja",
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    if (!data.titulo || !data.descricao || !data.tipoUsuario || !data.categoria) {
      console.error("Preencha todos os campos")
      return
    }

    setMeusFeedbacks((prev) => [data, ...prev])
    setPublicos((prev) => [data, ...prev])

    e.target.reset()
    setSucesso(true)
    setTimeout(() => setSucesso(false), 2000)
  }

  const removerFeedback = (index) => {
    setMeusFeedbacks((prev) => prev.filter((_, i) => i !== index))
    setPublicos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <DashboardLayout>
      <h1 className="content-title">Gerenciar Feedbacks</h1>

      <div className="feedback-tabs">
        <button onClick={() => setAba("enviar")} className={aba === "enviar" ? "active" : ""}>
          Enviar Feedback
        </button>
        <button onClick={() => setAba("meus")} className={aba === "meus" ? "active" : ""}>
          Meus Feedbacks
        </button>
        <button onClick={() => setAba("publicos")} className={aba === "publicos" ? "active" : ""}>
          Feedbacks Públicos
        </button>
      </div>

      {/* Painel de Enviar Feedback */}
      {aba === "enviar" && (
        <div id="panelEnviar" className="feedback-panel">
          <form id="feedbackForm" className="feedback-form" onSubmit={handleSubmit}>
            <input type="text" name="titulo" placeholder="Título do feedback" required />
            <textarea name="descricao" rows="5" placeholder="Descreva seu feedback..." required></textarea>
            <select name="tipoUsuario" required>
              <option value="">Selecione o tipo de usuário</option>
              <option>Empregado</option>
              <option>Colaborador</option>
              <option>RH</option>
              <option>Chefe de setor</option>
              <option>Acionista</option>
              <option>Dono</option>
            </select>
            <select name="categoria" required>
              <option value="">Selecione a categoria</option>
              <option value="elogio">Elogio</option>
              <option value="sugestao">Sugestão</option>
              <option value="reclamacao">Reclamação</option>
              <option value="ocorrencia">Ocorrência</option>
            </select>
            <button type="submit" className="btn-submit">
              Enviar
            </button>
          </form>
          {sucesso && <div id="success-message">✅ Enviado com sucesso!</div>}
        </div>
      )}

      {/* Painel Meus Feedbacks */}
      {aba === "meus" && (
        <div id="panelMeus" className="feedback-panel">
          <h2>Meus Feedbacks</h2>
          <div className="feedback-list">
            {meusFeedbacks.length === 0 && <p>Você ainda não enviou nenhum feedback.</p>}
            {meusFeedbacks.map((fb, i) => (
              <article key={i} className={`feedback-card ${catToClass[fb.categoria] || "azul"}`}>
                <div className="card-header">
                  <h3>{fb.titulo}</h3>
                  <button className="btn-excluir" onClick={() => removerFeedback(i)}>
                    Excluir
                  </button>
                </div>
                <small>
                  <strong>Enviado por:</strong> {fb.tipoUsuario}
                </small>
                <p>{fb.descricao}</p>
                <div className="card-footer">
                  <small>
                    <strong>Categoria:</strong> {fb.categoria}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Painel Feedbacks Públicos */}
      {aba === "publicos" && (
        <div id="panelPublicos" className="feedback-panel">
          <h2>Feedbacks Públicos</h2>
          <div className="feedback-list">
            {publicos.length === 0 && <p>Nenhum feedback público disponível.</p>}
            {publicos.map((fb, i) => (
              <article key={i} className={`feedback-card ${catToClass[fb.categoria] || "azul"}`}>
                <div className="card-header">
                  <h3>{fb.titulo}</h3>
                </div>
                <small>
                  <strong>Enviado por:</strong> {fb.tipoUsuario}
                </small>
                <p>{fb.descricao}</p>
                <div className="card-footer">
                  <small>
                    <strong>Categoria:</strong> {fb.categoria}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
