import "./dual-range-slider.css"

export function DualRangeSlider({ min, max, step, value, onChange, ariaLabel }) {
    const [minVal, maxVal] = value

    const handleMinChange = (e) => {
        const newMin = Number.parseInt(e.target.value)
        if (newMin <= maxVal - step) {
            onChange([newMin, maxVal])
        }
    }

    const handleMaxChange = (e) => {
        const newMax = Number.parseInt(e.target.value)
        if (newMax >= minVal + step) {
            onChange([minVal, newMax])
        }
    }

    const minPercent = ((minVal - min) / (max - min)) * 100
    const maxPercent = ((maxVal - min) / (max - min)) * 100

    return (
        <div className="drs-container">
            <div className="drs-track" />

            <div
                className="drs-active"
                style={{
                    left: `${minPercent}%`,
                    right: `${100 - maxPercent}%`,
                }}
            />

            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minVal}
                onChange={handleMinChange}
                aria-label={`${ariaLabel} mínimo`}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={minVal}
                className="drs-range drs-range-min"
                style={{
                    zIndex: minVal > max - 100 ? 5 : 3,
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                    }
                }}
            />

            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxVal}
                onChange={handleMaxChange}
                aria-label={`${ariaLabel} máximo`}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={maxVal}
                className="drs-range drs-range-max"
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                    }
                }}
            />
        </div>
    )
}