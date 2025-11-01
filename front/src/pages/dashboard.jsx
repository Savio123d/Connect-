"use client"

import { useEffect, useState } from "react"
import api from "../api/api"
import DashboardLayout from "../components/DashboardLayout"
import "./dashboard.css"

const NotificationCard = ({ icon, title, description, type }) => (
  <div className="notification-card">
    <div className="notification-header">
      <div className={`notification-icon ${type}`}>{icon}</div>
      <div className="notification-content">
        <h4 className="notification-title">{title}</h4>
        <p className="notification-description">{description}</p>
      </div>
    </div>
  </div>
)

export default function Dashboard() {
  const [colabs, setColabs] = useState([])

  const notifications = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      title: "Novo Recurso Lançado...",
      description: "Saiba mais sobre os últimos recursos lançados.",
      type: "new-resource",
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
      title: "Com Feedback",
      description: "Conectando Pessoas, Fortalecendo Equipes.",
      type: "feedback",
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      title: "Aviso Importante",
      description: "Verifique as atualizações de segurança e melhorias.",
      type: "important",
    },
  ]

  useEffect(() => {
    fetchColabs()
  }, [])

  async function fetchColabs() {
    try {
      const res = await api.get("/colaboradores")
      setColabs(res.data || [])
    } catch (err) {
      console.error("Erro ao buscar colaboradores", err)
    }
  }

  return (
    <DashboardLayout>
      <h1 className="content-title">FEED DE NOTÍCIAS</h1>
      <div className="news-feed-grid">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            icon={notification.icon}
            title={notification.title}
            description={notification.description}
            type={notification.type}
          />
        ))}
      </div>
    </DashboardLayout>
  )
}
