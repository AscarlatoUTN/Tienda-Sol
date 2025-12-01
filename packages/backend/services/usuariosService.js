import {UsuariosRepository} from "../persistence/repositories/usuariosRepository.js"
import {CredencialesRepository} from "../persistence/repositories/credencialesRepository.js"
import UsuariosValidator from "../domain/validators/usuariosValidator.js"
import {usuarioMapper} from "../mappers/mappers.js";
import NotificacionesService from "./notificacionesService.js";
import {TipoUsuario} from "../domain/usuarios/TipoUsuario.js";

export default class UsuariosService {
    static _singleton = null
    static instance() {
        this._singleton ||= new this()
        return this._singleton
    }

    constructor() {
        this.usuariosRepository = UsuariosRepository.instance()
        this.usuarioValidator = UsuariosValidator.instance()
        this.notificacionesService = NotificacionesService.instance()
        this.credencialesRepository = CredencialesRepository.instance()
    }

    /**
     * Inyecta las dependencias de servicios requeridas después de la construcción,
     * con el fin de evitar dependencias circulares entre servicios.
     *
     * @param {PedidosService} pedidosService - Servicio de pedidos a asociar.
     */
    setServices(pedidosService) {
        this.pedidosService = pedidosService
    }

    crear(usuarioDTO) {
        const nuevoUsuario = usuarioMapper.fromUsuarioDTO(usuarioDTO)
        return Promise.resolve()
            .then(() => this.usuariosRepository.create(nuevoUsuario))
    }

    consultarHistorialPedidos(usuario, pathID) {
        return this.validarPermisos(usuario, TipoUsuario.COMPRADOR, pathID)
            .then(() => this.pedidosService.consultarHistorialPedidos(usuario))
    }

    obtener(usuarioID) {
        return this.usuariosRepository.findById(usuarioID)
    }

    validarPermisos(usuario, tipoUsuario = null, pathID = null) {
        return Promise.resolve()
            .then(() => this.usuarioValidator.validarPermisos(usuario, tipoUsuario, pathID))
    }

    obtenerNotificaciones(usuario, filtro, pathID){
        return this.validarPermisos(usuario, null, pathID)
            .then(() => this.notificacionesService.obtenerNotificaciones(usuario, filtro))
    }

    obtenerVendedores(){
        return this.usuariosRepository.findVendedores()
    }
}