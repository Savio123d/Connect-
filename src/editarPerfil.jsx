import React, { useState, useRef } from "react";
import "./perfil.css";

export default function Perfil() {
  const [fotoPreview, setFotoPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);
  const [progressText, setProgressText] = useState("Salvando...");
  const [progressSuccess, setProgressSuccess] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const intervalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setProgressVisible(true);
    setProgress(0);
    setProgressSuccess(false);
    setProgressText("Salvando...");

    let progressValue = 0;

    intervalRef.current = setInterval(() => {
      progressValue += 5;
      setProgress(progressValue);

      if (progressValue === 100) {
        clearInterval(intervalRef.current);

        setTimeout(() => {
          setProgressSuccess(true);
          setProgressText("Concluído!");
        }, 400);

        setTimeout(() => {
          setProgressVisible(false);
          showToast();
        }, 1500);
      }
    }, 150);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const resetForm = () => {
    document.getElementById("perfilForm").reset();
  };

  return (
    <div className="perfil-container">
      <h2>Edição de Perfil do Colaborador</h2>
      <form id="perfilForm" onSubmit={handleSubmit}>
        <div className="foto-container">
          <img
            src={fotoPreview || "https://via.placeholder.com/100"}
            alt="Foto de Perfil"
            className="foto-preview"
          />
          <input type="file" onChange={handleFotoChange} />
        </div>

        <input type="text" placeholder="Nome Completo" required />
        <input type="email" placeholder="E-mail" required />
        <input type="tel" placeholder="Telefone" required />
        <input type="text" placeholder="Cargo" required />
        <input type="date" placeholder="Data de Nascimento" required />
        <input type="text" placeholder="Matrícula" required />

        <div className="buttons">
          <button type="submit" className="btn-salvar">
            Salvar Alterações
          </button>
          <button type="button" onClick={resetForm} className="btn-cancelar">
            Cancelar
          </button>
        </div>
      </form>

      {progressVisible && (
        <div id="progressBar" className="progress-bar">
          <div
            id="progress"
            className={`progress ${progressSuccess ? "progress-success" : ""}`}
            style={{ width: `${progress}%` }}
          ></div>
          <span id="progressText">{progressText}</span>
        </div>
      )}

      {toastVisible && (
        <div id="toast" className="toast show">
          Informações salvas com sucesso!
        </div>
      )}
    </div>
  );
}
