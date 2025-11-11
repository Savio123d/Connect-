import React from "react";
import ReactDOM from "react-dom/client";
import Feedback from "."; // importa o componente que convertemos
import "../src/Feedback"; // importa o CSS do componente

// Renderiza o componente Feedback dentro da div #root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Feedback />
  </React.StrictMode>
);
