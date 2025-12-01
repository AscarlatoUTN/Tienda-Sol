import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    CircularProgress,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from "@mui/material";
import "./checkout-direccion-dialog.css";
import {crearPedido} from "../../../../services/pedidosService";
import {useLayout} from "../../../../context/layout-context";
import {useCart} from "../../../../context/cart-context"
import {useToast} from "../../../../hooks/use-toast"


export default function CheckoutDireccionDialog(
    {open,
    onClose,
        cart,
    itemsPayload,
    }) {
    const [direccion, setDireccion] = useState({
        calle: "",
        altura: 0,
        ciudad: "",
        provincia: "",
        codigoPostal: "",
        pais: ""
    });
    const [moneda, setMoneda] = useState("PESO_ARG");
    const [sending, setSending] = useState(false);
    const { user, isLoggedIn, setHeaderOptions, setShowHeader, setShowFooter } = useLayout();
    const { clearCart, closeCart } = useCart()
    const { toast } = useToast();

    useEffect(() => {
        if (!open) {
            setDireccion({ calle: "", altura: "", ciudad: "", provincia: "", codigoPostal: "", pais: "" });
            setMoneda("PESO_ARG");
            setSending(false);
        }
    }, [open]);

    function handleDireccionChange(field, value) {
        setDireccion((d) => ({ ...d, [field]: value }));
    }

    function handleEnviar() {
        if (!cart || cart.length === 0) {
            window.alert("Carrito vacío");
            onClose?.();
            return;
        }

        const { calle,altura,  ciudad, provincia, codigoPostal, pais } = direccion;
        if (!calle || !altura || !ciudad || !provincia || !codigoPostal || !pais) {
            toast({
                title: "Faltan completar datos",
                description: "No podras completar el pedido hasta que completes todos los campos.",
                variant: "destructive",
            })
            return;
        }

        const pedidoPayload = {
            items: itemsPayload,
            moneda,
            direccionEntrega: {
                ...direccion,
                altura: Number(direccion.altura)
            }
        };

        setSending(true)
        crearPedido(pedidoPayload, user.id)
            .then(() => {
                clearCart()
                closeCart()
                onClose?.()
                toast({
                    title: "Pedido creado",
                    description: "Tu pedido ha sido creado exitosamente.",
                })
            })
            .catch((err) => {
                console.error(err)
                toast({
                    title: "Pedido no se pudo crear",
                    description: "Tu pedido no se pudo crear. Intenta nuevamente más tarde.",
                    variant: "destructive",
                })
            })
            .finally(() => setSending(false))
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Dirección de entrega</DialogTitle>
            <DialogContent dividers className="cod-content">
                <TextField label="Calle" fullWidth margin="normal" value={direccion.calle} onChange={(e) => handleDireccionChange("calle", e.target.value)} />
                <TextField label="Altura" type={"number"} fullWidth margin="normal" value={direccion.altura} onChange={(e) => handleDireccionChange("altura", e.target.value)} />
                <TextField label="Ciudad" fullWidth margin="normal" value={direccion.ciudad} onChange={(e) => handleDireccionChange("ciudad", e.target.value)} />
                <TextField label="Provincia" fullWidth margin="normal" value={direccion.provincia} onChange={(e) => handleDireccionChange("provincia", e.target.value)} />
                <TextField label="Código postal" fullWidth margin="normal" value={direccion.codigoPostal} onChange={(e) => handleDireccionChange("codigoPostal", e.target.value)} />
                <TextField label="País" fullWidth margin="normal" value={direccion.pais} onChange={(e) => handleDireccionChange("pais", e.target.value)} />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="cod-moneda-label">Moneda</InputLabel>
                    <Select labelId="cod-moneda-label" value={moneda} label="Moneda" onChange={(e) => setMoneda(e.target.value)}>
                        <MenuItem value="PESO_ARG">PESO_ARG</MenuItem>
                        <MenuItem value="DOLAR_USA">DOLAR_USA</MenuItem>
                        <MenuItem value="REAL">REAL</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={sending}>Cancelar</Button>
                <Button variant="contained" onClick={handleEnviar} disabled={sending}>
                    {sending ? <CircularProgress size={18} color="inherit" /> : "Enviar pedido"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}