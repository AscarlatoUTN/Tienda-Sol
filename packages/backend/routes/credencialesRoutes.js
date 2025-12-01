import CredencialesController from "../controllers/credencialesController.js"
import {Router} from 'express'
import {loginSchema, registerSchema, validarBody} from "../middlewares/zodValidations.js";

const router = Router()
const controller = CredencialesController.instance()

router.route("/login")
    .post(
        validarBody(loginSchema),
        (req, res) => controller.validarCredenciales(req, res)
    )

router.route("/signin")
    .post(validarBody(registerSchema), (req, res) => controller.crear(req, res))

export default router