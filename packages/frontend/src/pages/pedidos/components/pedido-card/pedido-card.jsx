import { Card, CardContent, CardHeader, Typography, Divider } from "@mui/material"
import "./pedido-card.css"
import EstadoBadge from "../estado-badge/estado-badge";
import Button from "../../../../components/button/button";
import {useState} from "react";
import CambiarEstadoModal from "../cambiar-estado-modal/cambiar-estado-modal";

export default function PedidoCard({ pedido, refetchPedidos }) {
    const vendedor = pedido.items[0].producto.vendedor.nombre

    const direccion = pedido.direccionEntrega
    const direccionStr = [
        `${direccion.calle} ${direccion.altura}`,
        direccion.piso ? `Piso ${direccion.piso}` : null,
        direccion.departamento ? `Depto. ${direccion.departamento}` : null,
        `${direccion.codigoPostal}, ${direccion.ciudad}, ${direccion.provincia}, ${direccion.pais}`,
    ].filter(Boolean).join(" · ")

    const fecha = new Date(pedido.fechaCreacion)
    const fechaStr = fecha.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
    const horaStr = fecha.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    const total = pedido.items.reduce(
        (acc, item) => acc + item.precioUnitario * item.cantidad,
        0
    )

    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <>
            <Card className="order-card" variant="outlined">
                <CardHeader
                    className="order-card-header"
                    title={
                        <div className="order-header-col">
                            <Typography variant="h6" className="order-title">
                                {fechaStr} · {horaStr}
                            </Typography>
                            <div className="order-estado-row">
                                <EstadoBadge estado={pedido.estado} />
                                <Button
                                    variant="primary"
                                    size="md"
                                    className="order-estado-cambiar-btn"
                                    ariaLabel="Cambiar estado del pedido"
                                    onClick={() => setModalAbierto(true)}
                                >
                                    Cambiar estado
                                </Button>
                            </div>
                        </div>
                    }
                />

                <CardContent className="order-card-content">
                    <div className="order-top">
                        <Typography variant="body2" className="order-vendedor">
                            <span className="order-vendedor-label"><strong>Vendedor:</strong></span>
                            <span className="order-vendedor-nombre">{vendedor}</span>
                        </Typography>
                        <Typography variant="body2" className="order-entrega">
                            <span className="order-entrega-label"><strong>Dirección de entrega:</strong></span>
                            <span className="order-entrega-direccion">{direccionStr}</span>
                        </Typography>
                        {pedido.historialEstados.length > 0 && (
                            <div className="order-historial-wrapper">
                                <Typography variant="body2"><strong>Historial de estados:</strong></Typography>
                                <ul className="order-historial-list">
                                    {pedido.historialEstados.map((h, idx) => (
                                        <li key={idx} className="order-historial-item">
                                            <div className="order-historial-row">
                                                <EstadoBadge estado={h.estado} />
                                                <span className="order-historial-fecha">
                                                    {new Date(h.fecha).toLocaleString("es-ES", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit"
                                                    })}
                                                </span>
                                            </div>
                                            <div className="order-historial-detalle">
                                                <span className="order-historial-usuario"><strong>Usuario:</strong> {h.usuario.nombre}</span>
                                                <span className="order-historial-motivo"><strong>Motivo:</strong> {h.motivo}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="order-bottom">
                        <Divider className="order-divider" />
                        <Typography variant="subtitle1" className="order-productos">Productos</Typography>
                        <div className="order-item-list">
                            {pedido.items.map((item, idx) => (
                                <div key={idx} className="order-item">
                                    <img src={item.producto.fotos[0]}
                                         alt={item.producto.titulo}
                                         width={40} height={40}
                                         className="order-product-img"
                                         onError={(e) => {
                                             e.currentTarget.src = "/placeholder.svg";
                                         }}
                                    />
                                    <span>{item.producto.titulo}</span>
                                    <span>x{item.cantidad}</span>
                                    <span>${item.precioUnitario}</span>
                                    <span className="order-subtotal">${item.cantidad * item.precioUnitario}</span>
                                </div>
                            ))}
                        </div>
                        <Divider className="order-divider" />
                        <Typography variant="subtitle1" className="order-total">
                            <strong>Total:</strong> ${total}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            <CambiarEstadoModal
                pedidoID={pedido.id}
                open={modalAbierto}
                onClose={() => setModalAbierto(false)}
                refetchPedidos={refetchPedidos}
            />
        </>
    )
}