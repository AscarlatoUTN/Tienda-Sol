import React from "react";
import "./cambiar-estado-modal.css";
import Button from "../../../../components/button/button";
import Select from "../../../../components/select/select";
import Input from "../../../../components/input/input";
import { Modal } from "@mui/material";
import {cambiarEstadoPedido} from "../../../../services/pedidosService";
import {useLayout} from "../../../../context/layout-context";
import {useToast} from "../../../../hooks/use-toast";
import {estadoLabels} from "../estado-badge/estado-badge";

const ESTADOS = [
    { value: "cancelado", label: "Cancelado" },
    { value: "confirmado", label: "Confirmado" },
    { value: "enPreparacion", label: "En Preparación" },
    { value: "enviado", label: "Enviado" },
    { value: "entregado", label: "Entregado" },
];

export default function CambiarEstadoModal({ pedidoID, open, onClose, refetchPedidos }) {
    const [estado, setEstado] = React.useState("cancelado");
    const [motivo, setMotivo] = React.useState("");

    const { user } = useLayout()
    const { toast } = useToast()

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            nuevoEstado: estado,
            motivo: motivo
        }

        cambiarEstadoPedido(user.id, pedidoID, payload)
            .then(() => {
                refetchPedidos()
                toast({
                    title: "Estado cambiado exitosamente"
                })
                onClose()
            })
            .catch(err => {
                switch (err.response.status) {
                    case 400:
                        toast({
                            title: "Error al cambiar el estado del pedido",
                            description: "Debes incluir un motivo.",
                            variant: "destructive"
                        })
                        break;
                    case 403:
                        toast({
                            title: "Error al cambiar el estado del pedido",
                            description: "No tienes permiso de realizar este cambio.",
                            variant: "destructive"
                        })
                        break;
                    case 422:
                        const anterior = estadoLabels[err.response.data.detalles.anterior];
                        const intentado = estadoLabels[err.response.data.detalles.intentado];
                        toast({
                            title: "Error al cambiar el estado del pedido",
                            description: `No se puede pasar del estado ${anterior} al estado ${intentado}.`,
                            variant: "destructive"
                        })
                        break;
                    default:
                        toast({
                            title: "Error al cambiar el estado del pedido",
                            description: "Error no esperado.",
                            variant: "destructive"
                        })
                        break;
                }
            })
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className="cambiar-estado-modal">
                <h2 className="modal-title">Cambiar estado del pedido</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <label className="modal-label">
                        Nuevo estado
                        <Select
                            options={ESTADOS}
                            value={estado}
                            onChange={setEstado}
                            className="modal-select"
                        />
                    </label>
                    <label className="modal-label">
                        Motivo
                        <Input
                            type="text"
                            value={motivo}
                            onChange={valor => setMotivo(valor)}
                            placeholder="Motivo del cambio"
                            className="modal-input"
                        />
                    </label>
                    <div className="modal-actions">
                        <Button
                            variant="primary"
                            size="md"
                            type="submit"
                        >
                            Enviar
                        </Button>
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}