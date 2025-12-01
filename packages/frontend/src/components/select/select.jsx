import React from "react"
import "./select.css"

export default function Select({
                                   options = [], // array of { value, label }
                                   value = "",
                                   onChange,
                                   placeholder = null,
                                   ariaLabel,
                                   size = "md", // 'sm' | 'md' | 'lg'
                                   className = "",
                                   children,
                                   ...props
                               }) {
    return (
        <div className={`select select--${size} ${className}`.trim()}>
            <select
                className="select__native"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value, e)}
                aria-label={ariaLabel}
                {...props}
            >
                {placeholder !== null && <option value="">{placeholder}</option>}
                {options.map((opt) =>
                    typeof opt === "string" ? (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ) : (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    )
                )}
                {children}
            </select>
            <span className="select__icon" aria-hidden>
        ▾
      </span>
        </div>
    )
}