import {CredencialesRepository} from "../persistence/repositories/credencialesRepository.js";
import UsuariosService from "./usuariosService.js";
import {loginMapper} from "../mappers/mappers.js";
import {Credencial} from "../domain/usuarios/Credencial.js";
import CredencialesValidator from "../domain/validators/credencialesValidator.js";

export default class CredencialesService {
    static _singleton = null

    static instance() {
        this._singleton ||= new this()
        return this._singleton
    }

    constructor() {
        this.credencialesRepository = CredencialesRepository.instance()
        this.usuariosService = UsuariosService.instance()
        this.credencialesValidator = CredencialesValidator.instance()
    }

    crear(signinDTO) {
        const credencialACrear = new Credencial(signinDTO.username, signinDTO.password, signinDTO.usuarioId)
        return Promise.resolve()
            .then(() => this.credencialesRepository.create(credencialACrear))
    }

    validarCredencial(loginDTO) {
        const username = loginDTO.username.trim()
        const password = loginDTO.password.trim()

        return this.credencialesRepository.findByUsername(username)
            .then(credenciales => {
                this.credencialesValidator.validarCredenciales(credenciales, password)
                return credenciales
            })
            .then(credenciales => this.usuariosService.obtener(credenciales.usuarioId))
            .then(usuario => loginMapper.toDTO(usuario))
    }
}