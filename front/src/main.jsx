import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles.css'; // Importando os estilos

// O BrowserRouter fica aqui, envolvendo toda a aplicação. Este é o único lugar onde ele deve estar.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
