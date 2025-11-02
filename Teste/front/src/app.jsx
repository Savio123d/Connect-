import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";
import Feedback from "./pages/feedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial redireciona para login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 2. Adiciona nova rota para a página de feedback */}
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
