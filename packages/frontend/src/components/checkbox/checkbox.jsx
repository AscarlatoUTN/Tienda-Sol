import React from "react"
import "./checkbox.css"

export default function Checkbox({ checked = false, onChange = () => {}, ariaLabel, children, className = "" }) {
    const handleChange = (e) => {
        const isChecked = e.target.checked
        onChange(isChecked)
    }

    return (
        <label className={`ui-checkbox ${className}`}>
            <input
                type="checkbox"
                className="ui-checkbox-input"
                checked={checked}
                onChange={handleChange}
                aria-label={ariaLabel}
            />
            <span className="ui-checkbox-box" aria-hidden>
        {checked && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M4 12l4 4 12-12" />
            </svg>
        )}
      </span>
            <span className="ui-checkbox-label-text">{children}</span>
        </label>
    )
}