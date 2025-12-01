import { CartProvider } from "./context/cart-context"
import { ThemeProvider } from "next-themes"
import { Toaster } from "./components/toaster/toaster"
import { Shop } from "./pages/shop/shop"
import { Home } from "./pages/home/home"
import { Login } from "./pages/login/login"
import { Register }  from "./pages/registro/register"
import { ProductUpload } from "./pages/product-upload/product-upload";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CartDrawer from "./pages/shop/components/cart-drawer/cart-drawer"
import Notificaciones from "./pages/notifications/notificaciones";
import React from "react";
import {LayoutProvider} from "./context/layout-context";
import Pedidos from "./pages/pedidos/pedidos";
import MisProductos from "./pages/mis-productos/mis-productos";

export default function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LayoutProvider>
                <CartProvider>
                    <CartDrawer />
                    <BrowserRouter>
                        <div className="app-root">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/shop" element={<Shop />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/product" element={<ProductUpload />} />
                                <Route path="/notificaciones" element={<Notificaciones />} />
                                <Route path="/registro" element={<Register />} />
                                <Route path="/mis-pedidos" element={<Pedidos />} />
                                <Route path="/mis-productos" element={<MisProductos />} />
                            </Routes>
                            <Toaster />
                        </div>
                    </BrowserRouter>
                </CartProvider>
            </LayoutProvider>
        </ThemeProvider>
    )
}