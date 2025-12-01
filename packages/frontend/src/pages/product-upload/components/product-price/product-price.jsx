import { AttachMoney } from "@mui/icons-material"
import "./product-price.css"

export default function ProductPrice({ precio, moneda, onPrecioChange, onMonedaChange }) {
    return (
        <div className="product-upload-price-group">
      <span className="product-upload-input-icon">
        <AttachMoney />
      </span>
            <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={onPrecioChange}
                className="product-upload-price-input"
                min="0"
                step="1"
            />
            <select value={moneda} onChange={onMonedaChange} className="product-upload-currency-select">
                <option value="PESO_ARG">ARS $</option>
                <option value="DOLAR_USA">USD $</option>
                <option value="REAL">BRL R$</option>
            </select>
        </div>
    )
}