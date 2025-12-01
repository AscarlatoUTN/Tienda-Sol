import React from "react";
import "../register.css";

export default function RegistroTextInput({value, onChange, placeholder = "", isVisible = true, label = "input-label", options}) {
    return (
        <div className="input-group">
            <label className="input-label">{label}</label>
            {options && options.length > 0 ? (
                    <select
                        className="register-input"
                        value={value}
                        onChange={onChange}
                    >
                        {options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                ):
            <input
                className="register-input"
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />}
        </div>
    )
}