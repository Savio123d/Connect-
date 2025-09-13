import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";

// Note que o <BrowserRouter> foi removido daqui e agora está no main.jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial redireciona para login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
