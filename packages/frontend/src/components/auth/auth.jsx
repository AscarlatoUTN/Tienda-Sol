import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./auth.css";

export function UnauthorizedDialog({ open, onClose }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="unauthorized-title"
            PaperProps={{ className: "auth-dialog-paper" }}
        >
            <DialogTitle id="unauthorized-title" className="auth-dialog-title">
                <ErrorOutlineIcon color="error" className="auth-dialog-icon" />
                Acceso denegado
            </DialogTitle>
            <DialogContent dividers className="auth-dialog-content">
                <Typography variant="body1" paragraph className="auth-dialog-body">
                    Su cuenta no está autorizada para acceder a esta página.
                </Typography>
                <Typography variant="caption" className="auth-dialog-caption">
                    Error 403 — Access Denied
                </Typography>
            </DialogContent>
            <DialogActions className="auth-dialog-actions">
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="error"
                    className="auth-dialog-btn"
                    autoFocus
                >
                    ACEPTAR
                </Button>
            </DialogActions>
        </Dialog>
    );
}