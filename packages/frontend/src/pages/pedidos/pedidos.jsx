import Layout from "../../components/layout/layout"
import PedidoCard from "./components/pedido-card/pedido-card"
import "./pedidos.css"
import {useEffect, useState} from "react";
import {useLayout} from "../../context/layout-context";
import {fetchPedidos} from "../../services/pedidosService";
import Loadable from "../../components/loadable/loadable";
import { useNavigate } from "react-router-dom";

export default function Pedidos() {
    const { setShowHeader, setShowFooter, setHeaderOptions, user, isLoggedIn } = useLayout()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, user, navigate]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
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

    const [ pedidos, setPedidos ] = useState([])
    const [ loadingPedidos, setLoadingPedidos] = useState(true)
    const [ buscarPedidos, setBuscarPedidos ] = useState(false)

    const refetchPedidos = () => {
        setBuscarPedidos(!buscarPedidos)
    }

    useEffect(() => {
        setLoadingPedidos(true)

        if(!user){
            console.error("Error al obtener el usuario")
            setPedidos([])
            setLoadingPedidos(false)
            return
        }

        fetchPedidos(user.id)
            .then((resp) => {
                const pedidosOrdenados = resp
                    .slice()
                    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))

                setPedidos(pedidosOrdenados)
            })
            .catch((err) => {
                console.error("Error cargando productos", err)
            })
            .finally(() => setLoadingPedidos(false))
    }, [buscarPedidos])

    const contenidoBusqueda = () => {
        if(pedidos.length === 0){
            return (
                <div className="empty-state">
                    <p>No hay pedidos registrados</p>
                </div>
            )
        } else{
            return (
                <div className="orders-grid">
                    {pedidos.map((pedido) => (
                        <PedidoCard Card key={pedido.id} pedido={pedido} refetchPedidos={refetchPedidos} />
                    ))}
                </div>
            )
        }
    }

    return (
        <Layout>
            <div className="orders-page">
                <h1 className="orders-title">Pedidos</h1>
                <div className="orders-container">
                    <Loadable isLoading={loadingPedidos} component={contenidoBusqueda} />
                </div>
            </div>
        </Layout>
    )
}