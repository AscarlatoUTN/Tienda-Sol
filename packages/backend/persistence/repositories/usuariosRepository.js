import {Repository} from "./repository.js"
import {UsuarioModel} from "../schemas/usuarioSchema.js";
import {UsuarioNoEncontradoError} from "../../errors/errors.js";
import {TipoUsuario} from "../../domain/usuarios/TipoUsuario.js";

export class UsuariosRepository extends Repository{

    constructor() {
        super(UsuarioModel, UsuarioNoEncontradoError)
    }

    findVendedores() {
        return this.model.find({
            tipo: TipoUsuario.VENDEDOR
        }).exec();
    }
}