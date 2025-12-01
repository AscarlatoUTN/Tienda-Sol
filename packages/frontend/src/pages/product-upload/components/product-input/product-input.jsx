import "./product-input.css";

export default function ProductInput({ icon, value, onChange, placeholder, type = "text", textarea, onAdd, addIcon }) {
    return (
        <div className={`product-upload-input-group${textarea ? " product-upload-textarea-group" : ""}`}>
            {icon && <span className="product-upload-input-icon">{icon}</span>}
            {textarea ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="product-upload-textarea"
                    rows={3}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="product-upload-input"
                />
            )}
            {onAdd && (
                <button
                    type="button"
                    onClick={onAdd}
                    className="product-upload-add-button"
                    aria-label={placeholder}
                >
                    {addIcon}
                </button>
            )}
        </div>
    );
}