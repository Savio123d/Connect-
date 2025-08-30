import React from 'react'
import ReactDOM from 'react-dom/client'
import "../src/style.css";

// 1. Este é o seu primeiro componente React
function App() {
  return (
    <h1>Olá, Mundo! Bem-vindo ao Connect!</h1>
  )
}

// 2. Aqui, o React pega seu componente <App> e o renderiza dentro da <div id="root"> do seu HTML
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);