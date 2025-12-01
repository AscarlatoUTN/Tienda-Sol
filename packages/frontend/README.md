# Tienda Sol - Documentación Frontend (Vite + React)

## 📋 Descripción
Aplicación frontend de ejemplo para e-commerce construida con Vite, React (v19) y JavaScript. Incluye búsqueda, filtrado, carrito, modo oscuro y características de accesibilidad.

## 🎯 Componentes principales

### 1. Layout (`src/shop.jsx`)
- Propósito: Componente de layout raíz.
- Características:
    - Configuración de fuentes (Inter, JetBrains Mono)
    - Providers: ThemeProvider y CartProvider
    - Componente Toaster para notificaciones
- Uso: Importado y usado en `src/main.jsx` como wrapper raíz de la app.

### 2. Página principal (`src/shop.jsx`)
- Propósito: Página principal de la tienda.
- Funcionalidades:
    - Header con búsqueda, conmutador de tema, carrito y menú de usuario
    - Sidebar con filtros (categorías, vendedor, rango de precio)
    - Grid de productos con ordenamiento
    - Búsqueda en tiempo real y filtrado múltiple
- Variables de estado principales: `searchQuery`, `selectedCategories`, `priceRange`, `selectedSeller`, `sortBy`.

### 3. Cart Context (`src/context/cart-context.jsx`)
- Propósito: Gestión global del carrito
- API:
    - `addToCart(product)`
    - `removeFromCart(id)`
    - `updateQuantity(id, qty)`
    - `clearCart()`
    - `getCartCount()`
    - `getCartTotal()`
- Uso: `const { addToCart, getCartCount } = useCart()`

## 🎨 Diseño / CSS

### `src/styles/globals.css` (Tailwind v4)
Variables viven en `src/styles/globals.css` y Tailwind está configurado para Vite (PostCSS + Tailwind). Ejemplo de variables:

`:root {
--background: ...;
--foreground: ...;
--card: ...;
--primary: ...;
--border: ...;
}`

`.dark {
/* valores modo oscuro */
}`

Importar `src/styles/globals.css` en `src/main.jsx`.

### Notas Tailwind + Vite
- Asegurar que `tailwind.config.cjs` tenga rutas `content` correctas (por ejemplo `./src/**/*.{js,jsx,ts,tsx}`).
- Usar configuración PostCSS compatible con Vite.
- Importar directivas de Tailwind en `src/styles/globals.css` (`@tailwind base; @tailwind components; @tailwind utilities;`).

## 🔧 Funcionalidades (sin cambios)

- Búsqueda en nombre, categoría y descripción (insensible a mayúsculas, en tiempo real).
- Filtros: checkboxes multi-categoría, dropdown de vendedor único, slider dual de precio.
- Opciones de orden: Featured, Precio asc/desc, Más/menos vendidos.
- Carrito con notificaciones tipo toast y persistencia en `localStorage`.
- Conmutador de modo oscuro con persistencia y transiciones suaves.

## ♿ Accesibilidad

- Etiquetas ARIA en elementos interactivos.
- Navegación por teclado (Enter/Space para activar, Esc para cerrar, orden Tab).
- Roles ARIA adecuados y regiones en vivo (`aria-live="polite"` para contador del carrito).
- Estilos de foco visibles.

## 🔌 Integración con backend

`lib/axios.js` sigue siendo el cliente API. URL base vía variable de entorno: `VITE_API_URL` o fallback `http://localhost:3001/api`.

Endpoints esperados:
- `GET /products`
- `GET /products/:id`
- `GET /products?category=X`
- `GET /sellers`
- `POST /cart`
- `GET /cart`
- `DELETE /cart/:id`

## 🚀 Empezar (Vite)

### Instalación
`npm install`

### Desarrollo
`npm run dev`  \# inicia el servidor de desarrollo de Vite

### Build
`npm run build`  \# build con Vite

### Scripts recomendados en `package.json`
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 🔍 Requisitos No Funcionales y Calidad

### 1\. Usabilidad
- Navegación intuitiva: header con logo, búsqueda, carrito y perfil.
- Filtros accesibles: multi-check para categorías, selector de vendedor y slider de precio con opción de limpiar.
- Feedback visual: CTA claros (\`Explorar Productos\`, \`Agregar\`, \`Confirmar\`).
- Búsqueda prominente y usable por teclado.

### 2\. Diseño Visual / Interfaz
- Identidad coherente: tema solar con paleta cálida.
- Jerarquía clara: títulos, descripciones y precios destacables.
- Diseño responsivo: grid adaptable de productos.
- Tipografía y contraste optimizados.

### 3\. Rendimiento
- Placeholders para carga de imágenes.
- Paginación implícita en listados.
- Filtrado y búsqueda en tiempo real sin recarga completa.

### 4\. Seguridad
- Flujos de autenticación (login).
- Enlaces a políticas de privacidad y sección Legal.
- Manejo seguro de sesiones y datos sensibles (backend requerido).

### 5\. Accesibilidad
- Toggle oscuro/claro visible.
- Iconografía reconocible y labels ARIA en elementos interactivos.
- Productos estructurados con título, descripción, vendedor y precio.

### 6\. Fiabilidad
- Canal de soporte: Centro de Ayuda, Contacto y FAQ.
- Transparencia: información de vendedores y métricas visible.
- Consistencia de navegación con header y footer persistentes.

### 7\. Mantenibilidad
- Estructura modular (componentes, context, hooks).
- Sistema de categorías organizado.
- Secciones empresariales separadas (Sobre Nosotros, Blog, Carreras).

### 8\. Escalabilidad
- Filtros y rango de precios configurables.
- Dropdown de vendedores extensible.
- Ordenamiento flexible (destacados, precio, ventas).

### 9\. Experiencia de Usuario (UX)
- Landing con mensaje claro de valor.
- Contador de carrito visible y accesible.
- Ficha de producto completa con precio, vendedor, descripción y valoraciones.
- CTAs efectivos y consistentes.

### 10\. Compatibilidad
- Interfaz adaptable a distintos tamaños de pantalla.
- Iconografía estándar para compatibilidad visual.
- Recomendación: probar en dispositivos y navegadores principales.

## 🚀 Documentación Deployment
### Backend (Render)

- Es autodeployable, cada vez que pusheas un commit, se actualiza.
- Suele tardar 1 min en actualizarse, fijarse bien los logs de eventos que hay.

### Frontend (Netlify)

- Deploy manual, pues el automatico es pago.
- Pasos para deploy:
    1. Pararse en la carpeta de front
    2. Ejecutar `npm run build`
    3. Copiar la carpeta dist que genere.
    4. En netlify, ir a proyectos → Agregar proyecto → Manual deploy
    5. Arrastrar/cargar la carpeta.
    6. Se autogenera una URL en la que podes ver la pagina e interactuar.
- Volver a crear y actualizar el dist cada vez que lo quieras actualizar en netlify.