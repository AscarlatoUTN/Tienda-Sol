import apiClient from "../lib/axios.js";

export function fetchMisNotificaciones(userId, tipo = "todas") {
    return apiClient
        .get(`/usuarios/${encodeURIComponent(userId)}/notificaciones`, {
            params: {tipo: tipo},
            headers: { Authorization: userId },
        })
        .then(res => (Array.isArray(res.data) ? res.data : []))
}

export function marcarNotificacionComoLeida(notificacionId, userId) {
    return apiClient
        .patch(`/notificaciones/${encodeURIComponent(notificacionId)}`, {}, {
            headers: { Authorization: userId },
        })
        .then(res => res.data)
}
