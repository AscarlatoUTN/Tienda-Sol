import React from "react"
import "./filter-sidebar.css"
import Select from "../../../../components/select/select"
import Button from "../../../../components/button/button"
import { DualRangeSlider } from "../dual-range-slider/dual-range-slider"

export default function FiltersSidebar({
                                           vendedores,
                                           pendingSelectedSeller,
                                           setPendingSelectedSeller,
                                           pendingPriceRange,
                                           setPendingPriceRange,
                                           applyFilters,
                                           clearAllFilters,
                                           loading,
                                           sidebarOpen,
                                           setSidebarOpen,
                                       }) {
    return (
        <aside
            id="filters-sidebar"
            className={`sidebar-wrap ${sidebarOpen ? "open" : ""}`}
            role="complementary"
            aria-label="Filtros de productos"
        >
            <div className="filters-row">
                <h2 className="filters-title">Filtros</h2>

                <Button className="small" variant="ghost" ariaLabel="Limpiar todos los filtros" onClick={clearAllFilters}>
                    Limpiar filtros
                </Button>
            </div>

            <div className="sidebar-section">
                <h3 className="section-title">Vendedor</h3>
                <Select
                    options={vendedores}
                    value={pendingSelectedSeller}
                    onChange={(val) => setPendingSelectedSeller(val)}
                    placeholder="Todos los vendedores"
                />
            </div>

            <div className="sidebar-section">
                <h3 className="section-title">Rango de Precio</h3>
                <DualRangeSlider
                    min={0}
                    max={1500}
                    step={10}
                    value={pendingPriceRange}
                    onChange={setPendingPriceRange}
                />
                <p className="price-text">
                    ${pendingPriceRange[0]} - ${pendingPriceRange[1]}
                </p>
            </div>

            <div className="filter-actions">
                <Button
                    variant="primary"
                    ariaLabel={`Aplicar filtros`}
                    onClick={() => { applyFilters(); setSidebarOpen(false) }}
                    disabled={loading}
                >
                    Aplicar
                </Button>
            </div>
        </aside>
    )
}