import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { nome, email, telefone, cargo };
      await api.post('/colaboradores', payload);
      alert('Registro criado com sucesso. Agora você pode fazer login.');
      nav('/login');
    } catch (err) {
      console.error(err);
      alert('Erro ao registrar (verifique o console).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="card auth">
        <div className="brand"><span className="logo">✚</span> <b>Connect</b> ✨</div>
        <p className="sub">Conectando Pessoas, Fortalecendo Equipes</p>
        <h2>Registrar</h2>
        <form onSubmit={handleSubmit} className="form">
          <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
          <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
          <input placeholder="Cargo" value={cargo} onChange={e => setCargo(e.target.value)} />
          <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Criar conta'}</button>
        </form>
        <div className="hint">Já tem conta? <Link to="/login">Entrar</Link></div>
      </div>
    </div>
  );
}
