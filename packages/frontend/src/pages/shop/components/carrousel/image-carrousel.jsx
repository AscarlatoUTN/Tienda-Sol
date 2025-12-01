import React, { useState } from "react";
import "./image-carrousel.css";

export default function ImageCarrousel({ fotos = [], alt }) {
    const [index, setIndex] = useState(0);
    const hasMultiple = fotos.length > 1;

    const prev = (e) => {
        e.stopPropagation();
        setIndex((i) => (i - 1 + fotos.length) % fotos.length);
    };

    const next = (e) => {
        e.stopPropagation();
        setIndex((i) => (i + 1) % fotos.length);
    };

    return (
        <div className="image-carousel">
            <img
                src={fotos[index]}
                alt={alt}
                className="product-image"
                onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                }}
            />
            {hasMultiple && (
                <>
                    <button
                        type="button"
                        className="carousel-arrow left"
                        aria-label={`Imagen previa de ${alt}`}
                        onClick={prev}
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className="carousel-arrow right"
                        aria-label={`Siguiente imagen de ${alt}`}
                        onClick={next}
                    >
                        ›
                    </button>
                </>
            )}
        </div>
    );
}