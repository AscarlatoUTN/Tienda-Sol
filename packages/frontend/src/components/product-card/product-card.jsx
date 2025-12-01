import React from "react";
import Button from "../button/button";
import { useLayout } from "../../context/layout-context";
import { useNavigate } from "react-router-dom";
import ImageCarrousel from "../../pages/shop/components/carrousel/image-carrousel";
import "./product-card.css";
import { useCart } from "../../context/cart-context";
import {QuantityControls} from "../quantity-controls/quantity-controls";

export default function ProductCard({ producto, showVendedor = true }) {
    const { isLoggedIn, user } = useLayout();
    const navigate = useNavigate();
    const { cart, addToCart } = useCart();

    const cartItem = cart ? cart.find((i) => i.id === producto.id) : undefined;

    return (
        <article className="product-card">
            <ImageCarrousel fotos={producto.fotos} alt={producto.titulo} />

            <span className="sales-count">
                {producto.cantidadesVendidas} unidades vendidas
            </span>

            <h3 className="product-title">{producto.titulo}</h3>

            <span className="product-description">{producto.descripcion}</span>

            {producto.categorias && producto.categorias.length > 0 && (
                <span className="categories-text">
                    Categorías: <span className="categories-list">
                        {producto.categorias.map(c => c.nombre).join(", ")}
                    </span>
                </span>
            )}

            {
                showVendedor ? (
                    <span className="seller-text">
                        Vendedor: <span className="seller-name">{producto.vendedor.nombre}</span>
                    </span>
                ) : null
            }

            <span className="stock-count">
                Quedan {producto.stock} unidades disponibles
            </span>

            <div className="product-card-footer">
                <div className="product-price">
                    <span className="price">${producto.precio}</span>
                </div>
                {cartItem ? (
                    <div className="quantity-controls-container">
                        <QuantityControls item={cartItem} />
                    </div>
                ) : isLoggedIn && (user?.tipo === "VENDEDOR") ? null : (
                    <Button
                        variant="primary"
                        className="add-button"
                        ariaLabel={`Agregar ${producto.titulo} al carrito`}
                        onClick={() => {
                            isLoggedIn ? addToCart(producto) : navigate("/login");
                        }}
                    >
                        Agregar al carrito
                    </Button>
                )}
             </div>
         </article>
     )
 }