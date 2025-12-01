import {Router} from 'express'
import ProductosController from "../controllers/productosController.js";
import {
    productoSchema,
    productosQPSchema,
    validarBody,
    validarQueryParams
} from "../middlewares/zodValidations.js";
import {autentificar} from "../middlewares/authentication.js";

const router = Router()
const controller = ProductosController.instance()

router.route("/")
    .post(
        autentificar(),
        validarBody(productoSchema),
        (req, res) => controller.crear(req, res)
    )
    .get(
        validarQueryParams(productosQPSchema),
        (req, res) => controller.consultarProductos(req, res)
    )

export default router