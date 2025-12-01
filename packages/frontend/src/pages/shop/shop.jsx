import React, { useState, useEffect } from "react"
import "../../globals.css"
import "./shop.css"
import Button from "../../components/button/button"
import Select from "../../components/select/select"
import { useCart } from "../../context/cart-context"
import Layout from "../../components/layout/layout"
import { useLayout } from "../../context/layout-context"

import ProductCard from "../../components/product-card/product-card"
import FiltersSidebar from "./components/filters/filter-sidebar"
import { useShopData } from "../../hooks/use-shop-data.js"
import Pagination from "./components/pagination/Pagination"
import Loadable from "../../components/loadable/loadable";

export function Shop() {
    const [pendingPriceRange, setPendingPriceRange] = useState([0, 1500])
    const [pendingSelectedSeller, setPendingSelectedSeller] = useState("")

    const [appliedPriceRange, setAppliedPriceRange] = useState([0, 1500])
    const [appliedSelectedSeller, setAppliedSelectedSeller] = useState("")

    const [sortBy, setSortBy] = useState("sales-desc")

    const [currentPage, setCurrentPage] = useState(1)
    const limit = 9

    const sortOptions = [
        {value: "price-asc", label: "Precio: Menor a Mayor", order: "asc", orderBy: "precio"},
        {value: "price-desc", label: "Precio: Mayor a Menor", order: "desc", orderBy: "precio"},
        {value: "sales-desc", label: "Más Vendidos", order: "desc", orderBy: "cantidadesVendidas"},
        {value: "sales-asc", label: "Menos Vendidos", order: "asc", orderBy: "cantidadesVendidas"}
    ]

    const {
        setShowHeader,
        setShowFooter,
        setHeaderOptions,
        appliedSearchQuery
    } = useLayout()

    useEffect(() => {
        setShowHeader(true)
        setShowFooter(true)
        setHeaderOptions({
            showSearch: true,
            showCart: true,
            showThemeToggle: true,
            showUserMenu: true
        })
    }, [])

    const clearAllFilters = () => {
        setCurrentPage(1);

        setPendingPriceRange([0, 1500])
        setPendingSelectedSeller("")

        setAppliedPriceRange([0, 1500])
        setAppliedSelectedSeller("")
    }

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 768 : false)

    useEffect(() => {
        const onResize = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            if (!mobile) setSidebarOpen(false)
        }
        onResize()
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    const { productos, vendedores, loading } = useShopData({
        appliedSearchQuery,
        appliedPriceRange,
        appliedSelectedSeller,
        sortBy,
        sortOptions,
        currentPage,
        limit
    })

    const search = (nuevaPagina = 1) => {
        setCurrentPage(nuevaPagina);
        setAppliedPriceRange(pendingPriceRange)
        setAppliedSelectedSeller(pendingSelectedSeller)
        setSidebarOpen(false)
    }

    useEffect(() => {
        setPendingPriceRange([0, 1500]);
        setPendingSelectedSeller("");
        setAppliedPriceRange([0, 1500]);
        setAppliedSelectedSeller("");
        setSortBy("sales-desc");
        setCurrentPage(1);
    }, [appliedSearchQuery]);

    const contenidoBusqueda = () => {

        if (!productos || productos.total === 0) {
            return (
                <div style={{ textAlign: "center", marginTop: "3rem" }}>
                    <p>No se encontraron productos.</p>
                </div>
            );
        }

        return (
            <div className="products-grid">
                {productos.data.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </div>
        );
    };


    return (
        <Layout>
            <div className="shop-root">
                <div className="app-layout">
                    {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

                    <FiltersSidebar
                        vendedores={vendedores}
                        pendingSelectedSeller={pendingSelectedSeller}
                        setPendingSelectedSeller={setPendingSelectedSeller}
                        pendingPriceRange={pendingPriceRange}
                        setPendingPriceRange={setPendingPriceRange}
                        applyFilters={search}
                        clearAllFilters={clearAllFilters}
                        loading={loading}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="shop-main" role="main" aria-label="Lista de productos">
                        <div className="main-topbar">
                            {isMobile && (
                                <Button
                                    variant="icon"
                                    className="sidebar-toggle"
                                    ariaLabel="Mostrar filtros"
                                    aria-controls="filters-sidebar"
                                    aria-expanded={sidebarOpen}
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    ☰
                                </Button>
                            )}

                            <div className="topbar-products-found">
                                <p className="topbar-products-text" aria-live="polite" aria-atomic="true">
                                    {productos.total} productos encontrados
                                </p>
                            </div>

                            <div className="topbar-select">
                                <Select
                                    options={sortOptions}
                                    value={sortBy}
                                    onChange={(val) => setSortBy(val)}
                                    ariaLabel="Ordenar productos por"
                                    className="select-fullwidth"
                                />
                            </div>
                        </div>

                        <Loadable isLoading={loading} component={contenidoBusqueda}/>

                        <Pagination currentPage={currentPage} totalPages={productos.totalPaginas} onPageChange={(nuevaPagina) => search(nuevaPagina)} />
                    </main>
                </div>
            </div>
        </Layout>
    )
}