import React, { forwardRef } from "react"
import "./input.css"

const Input = forwardRef(function Input(
    { value = "", onChange = () => {}, placeholder = "", ariaLabel, type = "text", className = "", ...props },
    ref
) {
    const handleInputChange = (e) => {
        onChange(e.target.value)
    }

    const handleClear = () => onChange("")

    return (
        <div className={`ui-input-wrapper ${className}`}>
            <input
                ref={ref}
                className="ui-input"
                type={type}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                aria-label={ariaLabel}
                {...props}
            />
            {value && (
                <button
                    type="button"
                    className="ui-input-clear"
                    aria-label="Clear input"
                    onClick={handleClear}
                >
                    ×
                </button>
            )}
        </div>
    )
})

export default Input