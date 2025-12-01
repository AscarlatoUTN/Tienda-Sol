import { useToast } from "../../hooks/use-toast"
import { useEffect, useState } from "react"
import "./toaster.css"

export function Toaster() {
    const { toasts, dismiss } = useToast()

    return (
        <div className="toaster-root" aria-live="polite" aria-atomic="true">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
            ))}
        </div>
    )
}

function Toast({ toast, onDismiss }) {
    const [isVisible, setIsVisible] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        const enterTimer = setTimeout(() => setIsVisible(true), 10)
        const autoDismiss = setTimeout(() => {
            handleDismiss()
        }, 5000)

        return () => {
            clearTimeout(autoDismiss)
            clearTimeout(enterTimer)
        }
    }, [])

    const handleDismiss = () => {
        setIsExiting(true)
        setTimeout(() => {
            onDismiss(toast.id)
        }, 300)
    }

    const className = [
        "toast",
        isVisible ? "toast--visible" : "",
        isExiting ? "toast--exiting" : "",
        toast.variant === "destructive" ? "toast--destructive" : "toast--success",
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className={className}
        >
            <div className="toast-content">
                {toast.title && <div className="toast-title">{toast.title}</div>}
                {toast.description && (
                    <div className="toast-desc">{toast.description}</div>
                )}
            </div>
            <button
                className="toast-close"
                onClick={handleDismiss}
                aria-label="Cerrar notificación"
            >
                ×
            </button>
        </div>
    )
}