import "./product-alert.css"

export default function ProductAlert({ alerta }) {
    if (!alerta) return null;
    return (
        <div
            role="alert"
            aria-live="assertive"
            className={`product-upload-alert ${alerta.type === "error" ? "product-upload-alert-error" : "product-upload-alert-success"}`}
        >
            {alerta.msg}
        </div>
    );
}