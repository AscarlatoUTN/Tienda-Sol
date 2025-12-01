import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { useLayout } from "../../context/layout-context";
import { useNavigate } from "react-router-dom";
import { fetchMisNotificaciones, marcarNotificacionComoLeida } from "../../services/notificacionesService";
import "./notificaciones.css";

export default function Notificaciones() {
    const { user, isLoggedIn, setHeaderOptions, setShowHeader, setShowFooter } = useLayout();
    const navigate = useNavigate();

    const [filtro, setFiltro] = useState("todas");
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(false);

    const cargar = (tipo) => {
        if (!user?.id) return;
        setLoading(true);
        fetchMisNotificaciones(user.id, tipo)
            .then((data) => {
                const lista = data.slice().sort((a, b) => new Date(b.fechaAlta) - new Date(a.fechaAlta))
                setNotificaciones(lista);
            })
            .catch(() => setNotificaciones([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        setShowHeader(true);
        setShowFooter(true);
        setHeaderOptions({
            showSearch: false,
            showCart: false,
            showBackToShop: true,
            showThemeToggle: true,
            showUserMenu: true,
        });
    }, [setHeaderOptions, setShowHeader, setShowFooter]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        cargar(filtro);
    }, [isLoggedIn, filtro]);

    const onMarcarLeida = (id) => {
        setNotificaciones((prev) => {
            const next = prev.map((n) => (n.id === id ? { ...n, leida: true } : n));
            return filtro === "no_leidas" ? next.filter((n) => n.id !== id) : next;
        });

        marcarNotificacionComoLeida(id, user.id).finally(() => cargar(filtro));
    };

    if (!isLoggedIn) {
        return (
            <Layout>
                <section className="notif-wrap">
                    <div className="notif-loading">Redirigiendo a login…</div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="notif-wrap">
                <header className="notif-header">
                    <h1 className="notif-title">Notificaciones</h1>
                    <div className="notif-filtros">
                        <button
                            className={`nf-btn ${filtro === "todas" ? "active" : ""}`}
                            onClick={() => setFiltro("todas")}
                        >
                            Todas
                        </button>
                        <button
                            className={`nf-btn ${filtro === "no_leidas" ? "active" : ""}`}
                            onClick={() => setFiltro("no_leidas")}
                        >
                            No leídas
                        </button>
                        <button
                            className={`nf-btn ${filtro === "leidas" ? "active" : ""}`}
                            onClick={() => setFiltro("leidas")}
                        >
                            Leídas
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="notif-loading">Cargando…</div>
                ) : notificaciones.length === 0 ? (
                    <div className="notif-empty">No hay notificaciones</div>
                ) : (
                    <ul className="notif-list">
                        {notificaciones.map((n) => {
                            const fechaBase = n.leida && n.fechaLeida ? n.fechaLeida : n.fechaAlta;
                            return (
                                <li key={n.id} className={`notif-item ${n.leida ? "leida" : "nueva"}`}>
                                    <div className="notif-main">
                                        <div className="notif-mensaje">{n.mensaje}</div>
                                        <div className="notif-meta">
                                            <span className="badge">{n.leida ? "Leída" : "Nueva"}</span>
                                            <time className="fecha">{new Date(fechaBase).toLocaleString()}</time>
                                        </div>
                                    </div>
                                    <div className="notif-actions">
                                        {!n.leida && (
                                            <button className="nf-action" onClick={() => onMarcarLeida(n.id)}>
                                                Marcar como leída
                                            </button>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </Layout>
    );
}