import { useEffect, useState } from 'react';
import api from '../api/api';

// Componente de Bloco (Tile)
const Tile = ({ icon, title, color }) => (
  <div className="tile">
    <div className="icon">{icon}</div>
    <div className="title">{title}</div>
    <button className={`btn ${color}`}>Abrir</button>
  </div>
);

export default function Dashboard() {
  const [colabs, setColabs] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cargo: "" });

  // Busca os dados da API assim que o componente é montado
  useEffect(() => {
    fetchColabs();
  }, []);

  // -- FUNÇÕES DE LÓGICA --
  // Todas as funções devem ser declaradas dentro do componente, antes do return.

  async function fetchColabs() {
    try {
      console.log("Buscando colaboradores...");
      const res = await api.get('/colaboradores');
      console.log("Dados recebidos da API:", res.data);
      setColabs(res.data || []);
    } catch (err) {
      console.error('Erro detalhado ao buscar colaboradores', err);
      // Adicione um alerta para o usuário, se desejar
      // alert('Não foi possível carregar os dados. Verifique o console.');
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este colaborador?")) {
      try {
        await api.delete(`/colaboradores/${id}`);
        setColabs(colabs.filter(c => c.id !== id));
      } catch (err) {
        console.error('Erro ao excluir colaborador', err);
      }
    }
  }

  async function handleUpdate() {
    try {
      await api.put(`/colaboradores/${editando}`, form);
      setColabs(colabs.map(c => (c.id === editando ? { ...c, ...form } : c)));
      setEditando(null);
      setForm({ nome: "", email: "", telefone: "", cargo: "" });
    } catch (err) {
      console.error("Erro ao atualizar colaborador", err);
    }
  }

  function logout() {
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirecionamento mais robusto
  }

  // -- RENDERIZAÇÃO DO COMPONENTE --
  return (
    <div className="dash">
      <header>
        <div className="brand"><span className="logo">✚</span> <b>Connect</b> ✨</div>
        <div className="sub">Conectando Pessoas, Fortalecendo Equipes</div>
      </header>

      <h2 className="menu">Menu Principal</h2>

      <div className="grid">
        <Tile icon="📨" title="Enviar Feedback" color="blue" />
        <Tile icon="👁️" title="Ver Feedbacks" color="green" />
        <Tile icon="🕒" title="Histórico Pessoal" color="yellow" />
        <Tile icon="📊" title="Relatórios" color="red" />
      </div>

      <section className="table-section">
        <h3>Colaboradores</h3>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {colabs.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                  <td>{c.telefone}</td>
                  <td>{c.cargo}</td>
                  <td>
                    <button
                      className="btn-action edit"
                      onClick={() => {
                        setEditando(c.id);
                        setForm({ nome: c.nome, email: c.email, telefone: c.telefone, cargo: c.cargo });
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-action delete"
                      onClick={() => handleDelete(c.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {editando && (
        <section className="form-section">
          <h3>Editando Colaborador</h3>
          <div className="edit-form">
            <input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Nome" />
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
            <input value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} placeholder="Telefone" />
            <input value={form.cargo} onChange={e => setForm({ ...form, cargo: e.target.value })} placeholder="Cargo" />
            <button onClick={handleUpdate}>Salvar</button>
            <button onClick={() => setEditando(null)} className="btn-cancel">Cancelar</button>
          </div>
        </section>
      )}

      <footer className="tabs">
        <button className="tab active">Início</button>
        <button className="tab">Feedback</button>
        <button className="tab">Relatórios</button>
        <button className="tab">Perfil</button>
        <button className="tab" onClick={logout}>Sair</button>
      </footer>
    </div>
  );
}
