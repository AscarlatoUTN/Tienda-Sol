import React from "react";
import "./loadable.css";

export default function Loadable({ isLoading, component: Component }) {
    if (isLoading) {
        return (
            <div className="loadable-center" role="status" aria-live="polite" aria-busy="true">
                <svg
                    className="loadable-spinner"
                    width="48"
                    height="48"
                    viewBox="0 0 50 50"
                    aria-hidden="true"
                >
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="#FF9933"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="31.4 31.4"
                    />
                </svg>
            </div>
        );
    }

    return <Component />;
}


