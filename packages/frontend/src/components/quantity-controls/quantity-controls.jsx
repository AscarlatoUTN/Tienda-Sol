import {Box, IconButton, Typography} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {useCart} from "../../context/cart-context";
import './quantity-controls.css';

export function QuantityControls({item}){

    const {
        cart,
        updateQuantity
    } = useCart()

    const increaseQty = (id) => {
        const item = cart.find((item) => item.id === id)
        if (item && item.quantity < item.stock) updateQuantity(id, item.quantity + 1)
    }

    const decreaseQty = (id) => {
        const item = cart.find((item) => item.id === id)
        updateQuantity(id, item.quantity - 1)
    }

    const removeItem = (id) => updateQuantity(id, 0)

    return (
        <Box className="item-controls">
            <IconButton
                size="small"
                onClick={() => decreaseQty(item.id)}
                aria-label={`Disminuir cantidad de ${item.titulo}`}
                className="icon-decrease"
            >
                <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography
                variant="body1"
                className="item-qty"
            >
                {item.quantity}
            </Typography>

            <IconButton
                size="small"
                onClick={() => increaseQty(item.id)}
                aria-label={`Aumentar cantidad de ${item.titulo}`}
                className={`icon-increase${item.quantity >= item.stock ? " icon-increase-max" : ""}`}
                disabled={item.quantity >= item.stock}
            >
                <AddIcon fontSize="small" />
            </IconButton>

            <IconButton
                size="small"
                onClick={() => removeItem(item.id)}
                className="icon-remove"
                aria-label={`Borrar item ${item.titulo}`}
            >
                <DeleteIcon fontSize="small" color="inherit" />
            </IconButton>
        </Box>
    )
}