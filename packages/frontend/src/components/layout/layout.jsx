import React from "react"
import { useLayout } from "../../context/layout-context"
import Header from "../header/header"
import Footer from "../footer/footer"

const Layout = ({ children }) => {
    const { showHeader, showFooter } = useLayout()

    return (
        <>
            {showHeader && <Header />}
            <main>{children}</main>
            {showFooter && <Footer />}
        </>
    )
}

export default Layout