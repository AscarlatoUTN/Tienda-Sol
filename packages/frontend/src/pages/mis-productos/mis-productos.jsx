import Layout from "../../components/layout/layout"
import ProductCard from "../../components/product-card/product-card"
import "./mis-productos.css"
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {useLayout} from "../../context/layout-context";
import {fetchProductos} from "../../services/productosService";
import Loadable from "../../components/loadable/loadable";
import {UnauthorizedDialog} from "../../components/auth/auth";
import {Typography} from "@mui/material";

export default function MisProductos() {
    const { setShowHeader, setShowFooter, setHeaderOptions, user, isLoggedIn } = useLayout()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        if (user?.tipo === "COMPRADOR") {
            setOpenUnauthorized(true);
        }
    }, [isLoggedIn, user, navigate]);

    useEffect(() => {
        setShowHeader(true)
        setShowFooter(true)
        setHeaderOptions({
            showSearch: false,
            showCart: false,
            showBackToShop: true,
            showThemeToggle: true,
            showUserMenu: true
        })
    }, [])

    const [ productos, setProductos ] = useState([])
    const [ loadingProductos, setLoadingProductos] = useState(true)
    const [ openUnauthorized, setOpenUnauthorized ] = useState(false)

    const isNotBuyer = isLoggedIn && user?.tipo !== "COMPRADOR"

    const handleUnauthorizedClose = () => {
        setOpenUnauthorized(false);
        navigate("/");
    };

    useEffect(() => {
        setLoadingProductos(true)

        if(!user){
            console.error("Error al obtener el usuario")
            setProductos([])
            setLoadingProductos(false)
            return
        }

        const queryParams = {
            vendedor: user.tipo === "VENDEDOR" ? user.id : undefined,
            order: "desc",
            orderBy: "cantidadesVendidas",
            page: 1,
            limit: 0
        }

        fetchProductos(queryParams)
            .then((resp) => setProductos(resp))
            .catch((err) => {
                console.error("Error cargando productos", err)
            })
            .finally(() => setLoadingProductos(false))
    }, [])

    const productosData = productos.data || []

    const productosActivos = productosData.filter(p => p.activo)
    const productosInactivos = productosData.filter(p => !p.activo)

    const contenidoBusqueda = () => {
        if(productosData.length === 0){
            return (
                <div className="empty-state">
                    <p>No hay productos para ver</p>
                </div>
            )
        } else{
            return (
                <>
                    <h2 className="productos-subtitle">Productos Activos</h2>
                    <div className="productos-grid">
                        {productosActivos.length > 0
                            ? productosActivos.map(producto => (
                                <ProductCard key={producto.id} producto={producto} showVendedor={false} />
                            ))
                            : <span className="empty-state">No hay productos activos.</span>
                        }
                    </div>
                    <h2 className="productos-subtitle inactivos">Productos Inactivos</h2>
                    <div className="productos-grid">
                        {productosInactivos.length > 0
                            ? productosInactivos.map(producto => (
                                <ProductCard key={producto.id} producto={producto} showVendedor={false} />
                            ))
                            : <span className="empty-state">No hay productos inactivos.</span>
                        }
                    </div>
                </>
            )
        }
    }

    return (
        <Layout>
            <div className="mis-productos-page">
                <h1 className="productos-title">Mis Productos</h1>
                <div className="productos-list">
                    {isNotBuyer ? (
                        <Loadable isLoading={loadingProductos} component={contenidoBusqueda} />
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Verificando permisos...
                        </Typography>
                    )}
                </div>
            </div>
            <UnauthorizedDialog open={openUnauthorized} onClose={handleUnauthorizedClose} />
        </Layout>
    )
}