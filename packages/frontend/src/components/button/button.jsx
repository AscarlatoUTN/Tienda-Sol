import React from "react"
import "./button.css"

export function Button({
                           variant = "primary", // 'primary' | 'icon' | 'ghost' | 'menuitem' | 'link'
                           size = "md", // 'sm' | 'md' | 'lg'
                           onClick,
                           onKeyDown,
                           ariaLabel,
                           children,
                           className = "",
                           ...props
                       }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick && onClick(e)
        }
        onKeyDown && onKeyDown(e)
    }

    const classes = ["btn", `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(" ")

    return (
        <button
            type="button"
            className={classes}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button