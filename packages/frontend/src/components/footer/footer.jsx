import React from "react"
import "./footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section footer-brand">
                    <h2 className="footer-title">Tienda Sol</h2>
                    <p className="footer-subtitle">Tu tienda online de confianza</p>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Compañía</h3>
                    <p>Sobre Nosotros</p>
                    <p>Carreras</p>
                    <p>Blog</p>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Soporte</h3>
                    <p>Centro de Ayuda</p>
                    <p>Contacto</p>
                    <p>FAQ</p>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Legal</h3>
                    <p>Términos y Condiciones</p>
                    <p>Privacidad</p>
                    <p>Cookies</p>
                </div>
            </div>

            <div className="footer-divider"></div>
            <div className="footer-bottom">
                © 2024 Tienda Sol. Todos los derechos reservados.
            </div>
        </footer>
    )
}

export default Footer