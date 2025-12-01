import { Close } from "@mui/icons-material";
import "./product-tag.css";

export default function ProductTags({ categorias, eliminarCategoria }) {
    if (!categorias.length) return null;
    return (
        <div className="product-upload-tags-container">
            {categorias.map((cat, index) => (
                <span key={index} className="product-upload-tag">
                    {cat}
                    <button
                        type="button"
                        onClick={() => eliminarCategoria(index)}
                        className="product-upload-tag-remove"
                        aria-label={`Eliminar ${cat}`}
                    >
                        <Close fontSize="small" />
                    </button>
                </span>
            ))}
        </div>
    );
}