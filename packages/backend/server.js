import dotenv from 'dotenv'
import app from "./routes/routes.js"
import {MongoDBClient} from "./database.js";
import PedidosService from "./services/pedidosService.js";
import UsuariosService from "./services/usuariosService.js";

const usuariosService = UsuariosService.instance()
const pedidosService = PedidosService.instance()

usuariosService.setServices(pedidosService)

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })
console.log(`Environment: ${process.env.NODE_ENV}`)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`)
})

MongoDBClient.connect();