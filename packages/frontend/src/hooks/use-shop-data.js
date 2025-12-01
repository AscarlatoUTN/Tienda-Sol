import { useEffect, useState } from "react"
import { fetchProductos } from "../services/productosService.js"
import { fetchVendedores } from "../services/usuariosService.js"

export function useShopData({ appliedSearchQuery, appliedPriceRange, appliedSelectedSeller, sortBy, sortOptions, currentPage, limit }) {
    const [productos, setProductos] = useState({
        pagina: 1,
        perPage: 0,
        total: 0,
        totalPaginas: 0,
        data: []
    })
    const [vendedores, setVendedores] = useState([])
    const [loadingProductos, setLoadingProductos] = useState(true)
    const [loadingVendedores, setLoadingVendedores] = useState(true)

    useEffect(() => {
        setLoadingVendedores(true)
        fetchVendedores()
            .then((resp) => {
                const options = resp.map(vendedor => ({ value: vendedor.id, label: vendedor.nombre }))
                setVendedores(options)
            })
            .catch((err) => console.error("Error cargando vendedores", err))
            .finally(() => setLoadingVendedores(false))
    }, [])

    useEffect(() => {
        setLoadingProductos(true)
        const selectedSort = sortOptions.find(opt => opt.value === sortBy)
        const vendedor = vendedores.find(opt => opt.value === appliedSelectedSeller)

        const queryParams = {
            busqueda: appliedSearchQuery,
            isActive: true,
            minPrice: appliedPriceRange[0],
            maxPrice: appliedPriceRange[1],
            vendedor: vendedor?.value || undefined,
            order: selectedSort?.order,
            orderBy: selectedSort?.orderBy,
            page: currentPage,
            limit: limit
        }

        fetchProductos(queryParams)
            .then((resp) => setProductos(resp))
            .catch((err) => {
                setProductos({
                    pagina: 1,
                    perPage: 0,
                    total: 0,
                    totalPaginas: 0,
                    data: []
                })
                console.error("Error cargando productos", err)
            })
            .finally(() => setLoadingProductos(false))
    }, [appliedSearchQuery, appliedPriceRange, appliedSelectedSeller, sortBy, currentPage])

    const loading = loadingProductos || loadingVendedores

    return { productos, vendedores, loading }
}