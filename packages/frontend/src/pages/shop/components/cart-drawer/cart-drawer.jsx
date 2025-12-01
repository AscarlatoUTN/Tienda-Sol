import * as React from "react"
import {
    Drawer,
    IconButton,
    Box,
    Typography,
    Divider, CircularProgress,
} from "@mui/material"
import CloseIcon  from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import DeleteIcon from "@mui/icons-material/Delete"
import { useCart } from "../../../../context/cart-context"
import Button1 from "../../../../components/button/button"

import "./cart-drawer.css"
import {useToast} from "../../../../hooks/use-toast"
import Button from "@mui/material/Button";
import Spinner from "../spinner/spinner";
import {QuantityControls} from "../../../../components/quantity-controls/quantity-controls";
import {useState} from "react";
import CheckoutDireccionDialog from "../checkout-direccion-dialog/checkout-direccion-dialog";

export default function CartDrawer() {
    const {
        cart,
        isCartOpen,
        closeCart,
        getCartTotal,
        isProcessing,
    } = useCart()

    const [isOpenDireccion ,setOpenDireccion] = useState(false)
    const [itemsPayload, setItemsPayload] = useState([])

    const total = getCartTotal()

    const handleOpenDireccion = () => {
        const payload = cart.map((item) => ({
            productoID: item.id,
            cantidad: Number(item.quantity) || 1
        }))
        setItemsPayload(payload)
        setOpenDireccion(true)
    }

    return (
        <Drawer
            anchor="right"
            open={isCartOpen}
            onClose={closeCart}
            PaperProps={{
                className: "cart-drawer-paper",
                sx: {
                    width: 420,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    boxSizing: "border-box",
                    overflow: "visible",
                    bgcolor: "var(--card, #ffffff)",
                    color: "var(--card-foreground, #000000)",
                }
            }}
        >

            <Box className="cart-drawer-header">
                <Typography variant="h6" className="drawer-title">Carrito</Typography>
                <IconButton
                    onClick={closeCart}
                    className="drawer-close-button"
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider />

            <Box
                className="cart-drawer-scroll">
                {(!cart || cart.length === 0) ? (
                    <Typography
                        variant="body1"
                        className="cart-empty-message"
                    >
                        Tu carrito está vacío 🛒
                    </Typography>

                ) : (
                    cart.map((item) => (
                        <Box key={item.id} className="drawer-item">
                            <Box
                                component="img"
                                src={item.fotos[0]}
                                alt={item.titulo}
                                className="drawer-item-image"
                                onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg";
                                }}
                            />

                            <Box className="drawer-item-details">
                                <Typography
                                    variant="body1"
                                    noWrap
                                    className="drawer-item-title"
                                >
                                    {item.titulo}
                                </Typography>
                                <Typography variant="body2" className="drawer-item-price">
                                    ${Number(item.precio).toFixed(2)}
                                    <br />
                                    Subtotal: ${Number(item.precio * item.quantity).toFixed(2)}
                                </Typography>
                            </Box>

                            <QuantityControls item={item} />
                        </Box>

                    ))
                )}
            </Box>

            <Divider />

            <Box className="cart-footer">
                <Typography className="cart-footer-total" variant="h6">
                    <span className="drawer-title">Total</span>
                    <span className="drawer-title">${Number(total || 0).toFixed(2)}</span>
                </Typography>
                <Box mt={2}>
                    <Button1
                        className="buy-button"
                        disabled={!cart || cart.length === 0 || isProcessing}
                        onClick={handleOpenDireccion}
                    >
                        {isProcessing ? (
                            <>
                                <Spinner size={18} color="inherit" />
                                Procesando Compra...
                            </>
                        ) : (
                            "Finalizar compra"
                        )}
                    </Button1>
                </Box>
            </Box>
            <CheckoutDireccionDialog open={isOpenDireccion} cart={cart} onClose={() => setOpenDireccion(false)} itemsPayload={itemsPayload}/>
        </Drawer>
    )
}