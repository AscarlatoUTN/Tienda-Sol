import { createContext, useContext, useMemo, useState } from "react";

const LayoutContext = createContext(null);

export function LayoutProvider({ children }) {
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    const [headerOptions, setHeaderOptions] = useState({
        showThemeToggle: true,
        showSearch: false,
        showBackToShop: false,
        showCart: false,
        showUserMenu: true,
    });

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userObj = null) => {
        setIsLoggedIn(true);
        setUser(userObj);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    const [pendingSearchQuery, setPendingSearchQuery] = useState("");
    const [appliedSearchQuery, setAppliedSearchQuery] = useState("");

    return (
        <LayoutContext.Provider
            value={
                {
                    showHeader,
                    showFooter,
                    headerOptions,
                    user,
                    isLoggedIn,
                    login,
                    logout,
                    setShowHeader,
                    setShowFooter,
                    setHeaderOptions,
                    setUser,
                    pendingSearchQuery,
                    setPendingSearchQuery,
                    appliedSearchQuery,
                    setAppliedSearchQuery
                }
            }
        >
            {children}
        </LayoutContext.Provider>
    )
}

export function useLayout() {
    const ctx = useContext(LayoutContext);
    if (!ctx) throw new Error("useLayout must be used within <LayoutProvider>");
    return ctx;
}