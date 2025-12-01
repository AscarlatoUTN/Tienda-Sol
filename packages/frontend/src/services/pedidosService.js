import apiClient from "../lib/axios.js"

export function crearPedido(payloadPedido, userID) {
    return apiClient
        .post("/pedidos", payloadPedido, {
            headers: {
                Authorization: userID
            }
        })
        .then(res => res.data)
}

export function fetchPedidos(userID) {
    return apiClient
        .get(`/usuarios/${encodeURIComponent(userID)}/pedidos`, {
            headers: {
                Authorization: userID
            }
        })
        .then(res => res.data)
}

export function cambiarEstadoPedido(userID, pedidoID, payloadCambioEstado) {
    return apiClient
        .patch(`/pedidos/${encodeURIComponent(pedidoID)}`, payloadCambioEstado, {
            headers: {
                Authorization: userID
            }
        })
        .then(res => res.data)
}