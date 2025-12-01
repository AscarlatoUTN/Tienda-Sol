import React from "react"
import { CircularProgress } from "@mui/material"
import "./spinner.css"

export default function Spinner({
    centered = true,
    size = 40,
    thickness = 4,
    className = "",
    message = null,
    ariaLabel = "Cargando"
    }) {
    const baseClass = centered ? "spinner-center" : "spinner-inline"
    return (
        <div className={`${baseClass} ${className}`} role="status" aria-label={ariaLabel}>
            <CircularProgress size={size} thickness={thickness} />
            {message && <span className="spinner-message">{message}</span>}
        </div>
    )
}