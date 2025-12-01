import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import ProductForm from "./components/product-form/product-form";
import "./product-upload.css";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useLayout } from "../../context/layout-context";
import { UnauthorizedDialog } from "../../components/auth/auth";
import { Typography } from "@mui/material";

export function ProductUpload() {
    const { isLoggedIn, user } = useLayout();
    const navigate = useNavigate();
    const [openUnauthorized, setOpenUnauthorized] = useState(false);
    const { setShowHeader, setShowFooter, setHeaderOptions} = useLayout()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        if (user?.tipo === "COMPRADOR") {
            setOpenUnauthorized(true);
        }
    }, [isLoggedIn, user, navigate]);

    useEffect(() => {
        setShowHeader(true)
        setShowFooter(true)

        setHeaderOptions({
            showSearch: false,
            showCart: true,
            showBackToShop: true,
            showThemeToggle: true,
            showUserMenu: true,
        })
    }, [setShowHeader, setShowFooter, setHeaderOptions])

    const handleUnauthorizedClose = () => {
        setOpenUnauthorized(false);
        navigate("/");
    };

    const isNotBuyer = isLoggedIn && user?.tipo !== "COMPRADOR"

    return (
        <Layout>
            <div className="product-upload-container">
                <div className="product-upload-background">
                    <div className="product-upload-overlay" />
                    <div className="product-upload-content">
                        <div className="product-upload-wrapper">
                            <h1 className="product-upload-title">CARGAR PRODUCTO</h1>
                            <div className="product-upload-card">
                                <div className="product-upload-icon-circle">
                                    <LocalMallIcon className="product-upload-icon" />
                                </div>
                                {isNotBuyer ? (
                                    <ProductForm />
                                ) : (
                                    <Typography variant="body2" color="textSecondary">
                                        Verificando permisos...
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UnauthorizedDialog open={openUnauthorized} onClose={handleUnauthorizedClose} />
        </Layout>
    );
}