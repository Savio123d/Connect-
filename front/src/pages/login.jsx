import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get('/colaboradores');
      const usuarios = res.data || [];
      const user = usuarios.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        alert('Usuário não encontrado. Cadastre-se primeiro.');
        return;
      }
      
      localStorage.setItem('user', JSON.stringify(user));
      nav('/dashboard'); // Redireciona para o dashboard após login
    } catch (err) {
      console.error(err);
      alert('Erro ao fazer login (verifique o console).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="card auth">
        <div className="brand"><span className="logo">✚</span> <b>Connect</b> ✨</div>
        <p className="sub">Conectando Pessoas, Fortalecendo Equipes</p>
        <h2>Entrar</h2>
        <form onSubmit={handleLogin} className="form">
          <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        <div className="hint">Não tem conta? <Link to="/register">Registre-se</Link></div>
      </div>
    </div>
  );
}
