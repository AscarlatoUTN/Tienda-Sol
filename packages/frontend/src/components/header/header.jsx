import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useLayout } from "../../context/layout-context";
import { useCart } from "../../context/cart-context";
import Button from "../button/button";
import { useTheme } from "next-themes";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
    const navigate = useNavigate();

    const {
        headerOptions,
        isLoggedIn,
        logout,
        pendingSearchQuery,
        setPendingSearchQuery,
        setAppliedSearchQuery,
        user
    } = useLayout();

    const {
        showSearch = false,
        showCart = false,
        showUserMenu = false,
        showBackToShop = false,
        onUserClick,
    } = headerOptions || {};

    let cartCount = 0;
    let openCart = () => {};
    let clearCart = () => {};

    try {
        const cartCtx = useCart();
        cartCount = cartCtx?.getCartCount?.() || 0;
        openCart = cartCtx?.openCart || (() => {});
        clearCart = cartCtx?.clearCart || (() => {});
    } catch (_) {}

    const [localUserOpen, setLocalUserOpen] = useState(false);
    const toggleLocalUser = () => setLocalUserOpen((v) => !v);
    const closeLocalUser = () => setLocalUserOpen(false);

    const handleUserClick = onUserClick || toggleLocalUser;

    const { theme, setTheme } = useTheme();

    const goToLogin = () => {
        navigate("/login");
        setLocalUserOpen(false);
    };

    const goToProductUpload = () => {
        navigate("/product");
        setLocalUserOpen(false);
    }

    const goToOrders = () => {
        navigate("/mis-pedidos");
        setLocalUserOpen(false);
    }

    const goToProducts = () => {
        navigate("/mis-productos");
        setLocalUserOpen(false);
    }

    const goToShop = () => {
        navigate("/shop");
        setLocalUserOpen(false);
    }

    const doLogout = () => {
        logout();
        setLocalUserOpen(false);
        clearCart();
        navigate("/");
    };

    const handleSearchSubmit = (e) => {
        e?.preventDefault();
        setAppliedSearchQuery(pendingSearchQuery);
    };

    const isComprador = user?.tipo === "COMPRADOR"

    return (
        <header className="app-header" role="banner">
            <div className="header-inner">
                <div className="brand">
                    <Link to="/" className="brand-main" aria-label="Ir a la tienda">
                        <img
                            src={theme === "dark" ? "/logo_dark.png" : "/logo.png"}
                            alt="Tienda Sol logo"
                            className="header-logo"
                        />
                        <h1 className="site-title">
                            Tienda Sol
                        </h1>
                    </Link>
                </div>

                {showSearch && (
                    <form
                        className="hdr-search"
                        onSubmit={handleSearchSubmit}
                    >
                        <div className="hdr-search-input-wrap">
                            <input
                                placeholder="Buscar productos..."
                                aria-label="Buscar productos"
                                className="hdr-search-input"
                                value={pendingSearchQuery}
                                onChange={(e) => setPendingSearchQuery(e.target.value)}
                            />
                            <Button
                                variant="icon"
                                type="submit"
                                aria-label="Buscar"
                                className="hdr-search-button"
                            >
                                <SearchIcon />
                            </Button>
                        </div>
                    </form>
                )}


                {showBackToShop &&
                    <div className="header-back-to-shop">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={goToShop}
                            ariaLabel="Ir a la tienda"
                            className="hdr-cta-button"
                        >
                            Volver a la tienda
                        </Button>
                    </div>
                }

                <div className="header-controls">
                    <Button
                        variant="icon"
                        ariaLabel="Cambiar tema"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        🌗
                    </Button>

                    {isLoggedIn && (
                        <Button
                            variant="icon"
                            ariaLabel="Notificaciones"
                            title="Notificaciones"
                            onClick={() => navigate("/notificaciones")}
                        >
                            🔔
                        </Button>
                    )}

                    {showCart && (
                        <Button
                            variant="ghost"
                            onClick={openCart}
                            ariaLabel={`Carrito de compras con ${cartCount} productos`}
                        >
                            🛒 {cartCount}
                        </Button>
                    )}

                    {showUserMenu && (
                        <div className="hdr-user-wrap">
                            <Button
                                variant="icon"
                                ariaLabel="Abrir menú de usuario"
                                aria-expanded={localUserOpen}
                                aria-haspopup="true"
                                onClick={handleUserClick}
                                onBlur={() => setTimeout(closeLocalUser, 150)}
                            >
                                👤
                            </Button>

                            {onUserClick
                                ? null
                                : localUserOpen && (
                                <div role="menu" className="hdr-user-dropdown">
                                    {!isLoggedIn ? (
                                        <button role="menuitem" className="hdr-user-item" onClick={goToLogin}>
                                            Iniciar sesión
                                        </button>
                                    ) : (
                                        <>
                                            {
                                                !isComprador ? (
                                                <>
                                                    <button role="menuitem" className="hdr-user-item" onClick={goToProductUpload}>
                                                        Subir producto
                                                    </button>
                                                    <button role="menuitem" className="hdr-user-item" onClick={goToProducts}>
                                                        Mis productos
                                                    </button>
                                                </>
                                                ) : null
                                            }
                                            <button role="menuitem" className="hdr-user-item" onClick={goToOrders}>
                                                Pedidos
                                            </button>
                                            <button role="menuitem" className="hdr-user-item" onClick={doLogout}>
                                                Cerrar sesión
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}