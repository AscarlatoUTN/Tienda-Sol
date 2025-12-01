import express from "express"
import cors from "cors"
import healthRoutes from "./healthRoutes.js"
import pedidosRoutes from "./pedidosRoutes.js"
import usuariosRoutes from "./usuariosRoutes.js"
import productosRoutes from "./productosRoutes.js"
import notificacionesRoutes from "./notificacionesRoutes.js"
import credencialesRoutes from "./credencialesRoutes.js"
import swaggerRoutes from "./swaggerRoutes.js";
import { generalErrorHandler } from "../middlewares/generalErrorHandler.js";

const app = express()

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (origin.endsWith(".netlify.app") || origin.startsWith("http://localhost")) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

app.use("/health", healthRoutes)
app.use("/pedidos", pedidosRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/productos", productosRoutes)
app.use("/notificaciones", notificacionesRoutes)
app.use("/auth", credencialesRoutes)
app.use("/docs", swaggerRoutes)

app.use(generalErrorHandler)

export default app