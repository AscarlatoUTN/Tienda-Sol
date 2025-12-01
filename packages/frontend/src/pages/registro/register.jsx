import React, { useState, useEffect } from "react";
import { useLayout } from "../../context/layout-context";
import Layout from "../../components/layout/layout";
import { useNavigate } from "react-router-dom";
import "./register.css";
import {crearUsuario} from "../../services/usuariosService";
import Loadable from "../../components/loadable/loadable";
import RegistroTextInput from "./components/registro-text-input";


export function Register(){
    const [nombre, setNombre] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [tipo, setTipo] = useState("COMPRADOR");
    const [alerta, setAlerta] = useState(null);
    const [loading, setLoading] = useState(false);

    const { setShowHeader, setShowFooter, setHeaderOptions } = useLayout();
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
        e.preventDefault();
        const n = nombre.trim();
        const u = username.trim();
        const p = password.trim()
        const em = email.trim();
        const t = telefono.trim();
        const tp = tipo.toUpperCase();

        if (!n || !u || !em || !t || !tp) {
            setAlerta({ type: "error", msg: "Debe completar todos los campos" });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(em)) {
            setAlerta({ type: "error", msg: "Email inválido" });
            return;
        }

        setLoading(true);
        setAlerta(null);
        crearUsuario({ nombre: n, username: u, password: p, email: em, telefono: t, tipo: tp })
            .then(() => {
                setAlerta({ type: "success", msg: "Registro exitoso" });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/login");
                }, 3000);
            })
            .catch((err) => {
                const msg = err?.response?.data?.message || err.message || "Error de red";
                setAlerta({ type: "error", msg });
                setLoading(false);
            })
            .finally(() => setLoading(false))
    };

    const SubmitButtonContent = () => <span>Registrarse</span>;



    return (
        <Layout>
            <div className="register-container">
                <div className="register-background">
                    <div className="register-overlay" />
                    <div className="register-content">
                        <div className="register-wrapper">
                            <h1 className="register-title">REGISTRARSE</h1>

                            <div className="register-card">
                                <form
                                    className="register-form"
                                    onSubmit={handleSubmit}
                                >
                                    <RegistroTextInput
                                        value={nombre}
                                        onChange={(e) => {
                                            setNombre(e.target.value)
                                            if (alerta) setAlerta(null)}}
                                        placeholder="Nombre completo"
                                        label="Nombre"
                                    />
                                    <RegistroTextInput
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                            if (alerta) setAlerta(null)}}
                                        placeholder="Username"
                                        label="Username"
                                    />
                                    <RegistroTextInput
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            if (alerta) setAlerta(null)}}
                                        placeholder="Contraseña"
                                        label="Contraseña"
                                    />
                                    <RegistroTextInput
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            if (alerta) setAlerta(null)}}
                                        placeholder="Email"
                                        label="Email"
                                        type="email"
                                    />
                                    <RegistroTextInput
                                        value={telefono}
                                        onChange={(e) => {
                                            setTelefono(e.target.value)
                                            if (alerta) setAlerta(null)}}
                                        placeholder="1112345678"
                                        label="Telefono"
                                        type="tel"
                                    />
                                    <RegistroTextInput
                                        label="Tipo"
                                        value={tipo}
                                        onChange={(e) => { setTipo(e.target.value); if (alerta) setAlerta(null); }}
                                        options={[
                                            { value: "COMPRADOR", label: "Comprador" },
                                            { value: "ADMIN", label: "Admin" },
                                            { value: "VENDEDOR", label: "Vendedor" }
                                        ]}
                                    />

                                    <button type="submit" className="register-button" disabled={loading}>
                                        <Loadable isLoading={loading} component={SubmitButtonContent}/>
                                    </button>

                                </form>
                            {alerta && (
                                <div
                                    role="alert"
                                    aria-live="assertive"
                                    className={`alert ${alerta.type === "error" ? "alert-error" : "alert-success"}`}
                                >
                                    {alerta.msg}
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}