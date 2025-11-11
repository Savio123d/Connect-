import React, { useState } from "react";
import "../src/style.css";

export default function Feedback() {
  const [aba, setAba] = useState("enviar");
  const [meusFeedbacks, setMeusFeedbacks] = useState([]);
  const [publicos, setPublicos] = useState([]);
  const [sucesso, setSucesso] = useState(false);

  const catToClass = {
    elogio: "verde",
    sugestao: "azul",
    reclamacao: "laranja",
    ocorrencia: "laranja",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.titulo || !data.descricao || !data.tipoUsuario || !data.categoria) {
      alert("Preencha todos os campos antes de enviar.");
      return;
    }

    setMeusFeedbacks((prev) => [data, ...prev]);
    setPublicos((prev) => [data, ...prev]);

    e.target.reset();
    setSucesso(true);
    setTimeout(() => setSucesso(false), 2000);
  };

  const removerFeedback = (index) => {
    setMeusFeedbacks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Connect+</h2>
        <ul>
          <li>
            <a href="#" className="active">💬 Feedback</a>
          </li>
          <li><a href="#">🏠 Início</a></li>
          <li><a href="#">📊 Relatórios</a></li>
          <li><a href="#">👤 Perfil</a></li>
        </ul>
      </aside>

      <main className="main-content">
        <h1>Gerenciar Feedbacks</h1>

        <div className="tabs">
          <button
            onClick={() => setAba("enviar")}
            className={aba === "enviar" ? "active" : ""}
          >
            Enviar Feedback
          </button>
          <button
            onClick={() => setAba("meus")}
            className={aba === "meus" ? "active" : ""}
          >
            Meus Feedbacks
          </button>
          <button
            onClick={() => setAba("publicos")}
            className={aba === "publicos" ? "active" : ""}
          >
            Feedbacks Públicos
          </button>
        </div>

        {aba === "enviar" && (
          <div id="panelEnviar">
            <form id="feedbackForm" onSubmit={handleSubmit}>
              <input type="text" name="titulo" placeholder="Título do feedback" required />
              <textarea name="descricao" placeholder="Descreva seu feedback..." required></textarea>
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
              <button type="submit">Enviar</button>
            </form>
            {sucesso && <div id="success">✅ Enviado com sucesso!</div>}
          </div>
        )}

        {aba === "meus" && (
          <div id="panelMeus">
            <h2>Meus Feedbacks</h2>
            <div className="feedback-list">
              {meusFeedbacks.map((fb, i) => (
                <article key={i} className={`feedback-card ${catToClass[fb.categoria] || "azul"}`}>
                  <h3>{fb.titulo}</h3>
                  <small><strong>Enviado por:</strong> {fb.tipoUsuario}</small>
                  <p>{fb.descricao}</p>
                  <div><small><strong>Categoria:</strong> {fb.categoria}</small></div>
                  <button onClick={() => removerFeedback(i)}>Excluir</button>
                </article>
              ))}
            </div>
          </div>
        )}

        {aba === "publicos" && (
          <div id="panelPublicos">
            <h2>Feedbacks Públicos</h2>
            <div className="feedback-list">
              {publicos.map((fb, i) => (
                <article key={i} className={`feedback-card ${catToClass[fb.categoria] || "azul"}`}>
                  <h3>{fb.titulo}</h3>
                  <small><strong>Enviado por:</strong> {fb.tipoUsuario}</small>
                  <p>{fb.descricao}</p>
                  <div><small><strong>Categoria:</strong> {fb.categoria}</small></div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
