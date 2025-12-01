import React, { useEffect } from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/button/button'
import Layout from '../../components/layout/layout'
import { useLayout } from '../../context/layout-context'

export function Home() {
    const navigate = useNavigate()
    const { setShowHeader, setShowFooter, setHeaderOptions} = useLayout()

    useEffect(() => {
        setShowHeader(true)
        setShowFooter(true)

        setHeaderOptions({
            showSearch: false,
            showCart: true,
            showBackToShop: false,
            showThemeToggle: true,
            showUserMenu: true,
        })
    }, [setShowHeader, setShowFooter, setHeaderOptions])

    return (
        <Layout>
            <div className="home-container">
                <div className="main-banner-section">
                    <div className="main-banner-overlay"></div>

                    <div className="main-banner-content">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20para%20Tienda%20Sol%202%20grande-zGcclVafC07qh00GJPLTbWnIkkob8D.png"
                            alt="Tienda Sol Logo"
                            className="logo"
                        />

                        <h1 className="main-banner-title">Bienvenido a Tienda Sol</h1>
                        <p className="main-banner-subtitle">
                            Tu tienda de confianza donde cada compra brilla como el sol
                        </p>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/shop')}
                            ariaLabel="Ir a la tienda"
                            className="cta-button"
                        >
                            Explorar Productos
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}