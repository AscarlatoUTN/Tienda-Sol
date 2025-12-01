import apiClient from "../lib/axios.js"

export function fetchProductos(queryParams) {
    return apiClient
        .get("/productos", {
            params: queryParams
        })
        .then(res => res.data)
}

export function addProducto(producto, userID) {
    return apiClient
        .post("/productos", producto, {
            headers: {
                Authorization: userID
            }
        })
        .then(res => res.data)
        .catch(err => {
            console.error("addProducto error:", err.response?.status, err.response?.data)
            throw err
        })
}