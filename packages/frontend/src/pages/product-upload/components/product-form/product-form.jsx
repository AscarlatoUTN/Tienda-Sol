import { useState } from "react";
import { ShoppingBag, Description, Inventory, Category, Image as ImageIcon, Add } from "@mui/icons-material";
import ProductInput from "../product-input/product-input";
import ProductTags from "../product-tag/product-tag";
import ProductFotos from "../product-photos/product-photos";
import ProductAlert from "../product-alert/product-alert";
import "./product-form.css";
import ProductPrice from "../product-price/product-price";
import { addProducto } from "../../../../services/productosService";
import {useLayout} from "../../../../context/layout-context";

export default function ProductForm() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [moneda, setMoneda] = useState("DOLAR_USA");
    const [stock, setStock] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriaInput, setCategoriaInput] = useState("");
    const [fotos, setFotos] = useState([]);
    const [fotoInput, setFotoInput] = useState("");
    const [alerta, setAlerta] = useState(null);
    const { user } = useLayout()

    const agregarCategoria = () => {
        const cat = categoriaInput.trim();
        if (cat && !categorias.includes(cat)) {
            setCategorias([...categorias, cat]);
            setCategoriaInput("");
        }
    };

    const eliminarCategoria = (index) => {
        setCategorias(categorias.filter((_, i) => i !== index));
    };

    const agregarFoto = () => {
        const url = fotoInput.trim();
        if (url && !fotos.includes(url)) {
            setFotos([...fotos, url]);
            setFotoInput("");
        }
    };

    const eliminarFoto = (index) => {
        setFotos(fotos.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!titulo.trim()) {
            setAlerta({ type: "error", msg: "El título es requerido" });
            return;
        }
        if (!descripcion.trim()) {
            setAlerta({ type: "error", msg: "La descripción es requerida" });
            return;
        }
        if (!precio || Number.parseFloat(precio) <= 0) {
            setAlerta({ type: "error", msg: "El precio debe ser mayor a 0" });
            return;
        }
        if (!stock || Number.parseInt(stock) < 0) {
            setAlerta({ type: "error", msg: "El stock debe ser mayor o igual a 0" });
            return;
        }
        if (categorias.length === 0) {
            setAlerta({ type: "error", msg: "Debe agregar al menos una categoria" });
            return;
        }
        if (fotos.length === 0) {
            setAlerta({ type: "error", msg: "Debe agregar al menos una foto" });
            return;
        }

        const producto = {
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            categorias: categorias,
            precio: Number.parseFloat(precio),
            moneda: moneda,
            stock: Number.parseInt(stock),
            fotos: fotos,
            activo: true,
        }

        addProducto(producto, user.id)
            .then(() => {
                setAlerta({ type: "success", msg: "Producto cargado exitosamente" });
                setTimeout(() => {
                    setTitulo("")
                    setDescripcion("")
                    setPrecio("")
                    setStock("")
                    setCategorias([])
                    setFotos([])
                    setAlerta(null)
                }, 2000)
            })
            .catch(() => {
                setAlerta({ type: "error", msg: "Error al cargar el producto" });
            })
    }

    return (
        <form className="product-upload-form" onSubmit={handleSubmit}>
            <ProductInput
                icon={<ShoppingBag />}
                value={titulo}
                onChange={e => { setTitulo(e.target.value); if (alerta) setAlerta(null); }}
                placeholder="Título del producto"
            />
            <ProductInput
                icon={<Description />}
                value={descripcion}
                onChange={e => { setDescripcion(e.target.value); if (alerta) setAlerta(null); }}
                placeholder="Descripción del producto"
                textarea
            />
            <ProductPrice
                precio={precio}
                moneda={moneda}
                onPrecioChange={e => { setPrecio(e.target.value); if (alerta) setAlerta(null); }}
                onMonedaChange={e => setMoneda(e.target.value)}
            />
            <ProductInput
                icon={<Inventory />}
                value={stock}
                onChange={e => { setStock(e.target.value); if (alerta) setAlerta(null); }}
                placeholder="Stock disponible"
                type="number"
            />
            <ProductInput
                icon={<Category />}
                value={categoriaInput}
                onChange={e => setCategoriaInput(e.target.value)}
                placeholder="Agregar categoría"
                onAdd={agregarCategoria}
                addIcon={<Add />}
            />
            <ProductTags categorias={categorias} eliminarCategoria={eliminarCategoria} />
            <ProductInput
                icon={<ImageIcon />}
                value={fotoInput}
                onChange={e => setFotoInput(e.target.value)}
                placeholder="URL de la foto"
                onAdd={agregarFoto}
                addIcon={<Add />}
                type="url"
            />
            <ProductFotos fotos={fotos} eliminarFoto={eliminarFoto} />
            <button
                type="submit"
                className="product-upload-button"
                onClick={handleSubmit}
            >
                CARGAR PRODUCTO
            </button>
            <ProductAlert alerta={alerta} />
        </form>
    );
}