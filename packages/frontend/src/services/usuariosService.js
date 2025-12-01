import apiClient from "../lib/axios.js"

export function validarCredenciales(username, password) {
    const nombre = username.trim();
    const pass = String(password);

    return apiClient
        .post("/auth/login", { username: nombre, password: pass })
        .then(res => res.data)
}

export function fetchVendedores() {
    return apiClient
        .get("/usuarios")
        .then(res => res.data)
}

export function crearUsuario(payload) {
    return apiClient
        .post("/usuarios", payload)
        .then(res => {
            const payloadNuevo = { username: payload.username, password: payload.password, usuarioId: res.data.id }
            return apiClient.post("/auth/signin", payloadNuevo)
        })
        .then(res => res.data);
}