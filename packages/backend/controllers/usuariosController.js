import UsuariosService from "../services/usuariosService.js"

export default class UsuariosController {
    static _singleton = null
    static instance() {
        this._singleton ||= new this()
        return this._singleton
    }

    constructor() {
        this.usuariosService = UsuariosService.instance()
    }

    crear(req, res) {
        return this.usuariosService.crear(req.validatedBody)
            .then(usuario => res.status(201).json(usuario))
    }

    consultarHistorialPedidos(req, res) {
        return this.usuariosService.consultarHistorialPedidos(req.user, req.validatedID)
            .then(pedidos => res.status(200).json(pedidos))
    }

    obtenerNotificaciones(req, res){
        return this.usuariosService.obtenerNotificaciones(req.user, req.validatedQuery.tipo, req.validatedID)
            .then(notificaciones => res.status(200).json(notificaciones))
    }

    obtenerVendedores(req, res) {
        return this.usuariosService.obtenerVendedores()
            .then(usuarios => res.status(200).json(usuarios))
    }
}