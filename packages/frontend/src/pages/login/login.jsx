import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PersonOutline, LockOutlined } from "@mui/icons-material";
import "./login.css";
import { useLayout } from "../../context/layout-context";
import Layout from "../../components/layout/layout";
import { useNavigate } from "react-router-dom";
import { validarCredenciales } from "../../services/usuariosService";

export function Login(){
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [alerta, setAlerta] = useState(null);
    const [loading, setLoading] = useState(false);

    const { setShowHeader, setShowFooter, setHeaderOptions, login } = useLayout();
    const navigate = useNavigate();

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
    }, [setShowHeader, setShowFooter, setHeaderOptions]);

    const handleSubmit = (e) => {
        e?.preventDefault();

        const userTrim = usuario.trim();
        const passTrim = contrasena.trim();

        if (!userTrim || !passTrim) {
            setAlerta({ type: "error", msg: "Debe ingresar usuario y contraseña" });
            setUsuario("");
            setContrasena("");
            return;
        }

        setLoading(true);

        validarCredenciales(userTrim, passTrim)
            .then((result) => {
                login(result);
                setAlerta({ type: "success", msg: "Sesión iniciada con éxito" });
                setTimeout(() => navigate("/shop"), 600);
            })
            .catch(err => {
                setAlerta({ type: "error", msg: "Usuario o contraseña incorrectos" });
                setUsuario("");
                setContrasena("");
            })
            .finally(() => setLoading(false));
    };

    return (
        <Layout>
            <div className="login-container">
                <div className="login-background">
                    <div className="login-overlay" />
                    <div className="login-content">
                        <div className="login-wrapper">
                            <h1 className="login-title">INICIAR SESIÓN</h1>

                            <div className="login-card">
                                <div className="avatar-circle">
                                    <PersonOutline className="avatar-icon" />
                                </div>

                                <form
                                    className="login-form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="input-group">
                                        <PersonOutline className="input-icon" />
                                        <input
                                            type="text"
                                            placeholder="Usuario"
                                            value={usuario}
                                            onChange={(e) => {
                                                setUsuario(e.target.value);
                                                if (alerta) setAlerta(null);
                                            }}
                                            className="login-input"
                                        />
                                    </div>

                                    <div className="input-group">
                                        <LockOutlined className="input-icon" />
                                        <input
                                            type="password"
                                            placeholder="Contraseña"
                                            value={contrasena}
                                            onChange={(e) => {
                                                setContrasena(e.target.value);
                                                if (alerta) setAlerta(null);
                                            }}
                                            className="login-input"
                                        />
                                    </div>

                                    <button type="submit" className="login-button" disabled={loading}>
                                        {loading ? "Ingresando..." : "CONFIRMAR"}
                                    </button>

                                    {alerta && (
                                        <div
                                            role="alert"
                                            aria-live="assertive"
                                            className={`alert ${alerta.type === "error" ? "alert-error" : "alert-success"}`}
                                        >
                                            {alerta.msg}
                                        </div>
                                    )}
                                </form>
                                <p className="login-register-text">
                                    ¿No tienes una cuenta?{" "}
                                    <Link to="/registro" className="login-register-link">
                                        Regístrate
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}