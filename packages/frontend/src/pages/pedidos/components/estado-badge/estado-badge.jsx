import "./estado-badge.css"

export const estadoLabels = {
    cancelado: "Cancelado",
    entregado: "Entregado",
    enviado: "Enviado",
    enPreparacion: "En Preparación",
    confirmado: "Confirmado",
    pendiente: "Pendiente",
}

export default function EstadoBadge({ estado }) {
    return (
        <span className={`estado-badge estado-${estado}`}>
            {estadoLabels[estado] || estado}
        </span>
    )
}
