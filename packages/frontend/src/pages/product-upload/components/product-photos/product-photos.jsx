import { Close } from "@mui/icons-material"
import "./product-photos.css"

export default function ProductFotos({ fotos, eliminarFoto }) {
    if (!fotos.length) return null;
    return (
        <div className="product-upload-fotos-container">
            {fotos.map((foto, index) => (
                <div key={index} className="product-upload-foto-preview">
                    <img src={foto || "/placeholder.svg"} alt={`Foto ${index + 1}`} />
                    <button
                        type="button"
                        onClick={() => eliminarFoto(index)}
                        className="product-upload-foto-remove"
                        aria-label={`Eliminar foto ${index + 1}`}
                    >
                        <Close />
                    </button>
                </div>
            ))}
        </div>
    );
}