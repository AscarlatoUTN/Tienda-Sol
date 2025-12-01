import CredencialesService from "../services/credencialesService.js"

export default class CredencialesController {
    static _singleton = null
    static instance() {
        this._singleton ||= new this()
        return this._singleton
    }

    constructor(){
        this.credencialesService = CredencialesService.instance()
    }

    crear(req, res) {
        return this.credencialesService.crear(req.validatedBody)
            .then(credencial => res.status(201).json(credencial))
    }

    validarCredenciales(req, res) {
        return this.credencialesService
            .validarCredencial(req.validatedBody)
            .then(usuario => res.status(200).json(usuario))
    }
}