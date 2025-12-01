import {CredencialesInvalidasError} from "../../errors/errors.js";

export default class CredencialesValidator {
    static _singleton = null

    static instance() {
        this._singleton ||= new this()
        return this._singleton
    }

    validarCredenciales(credenciales, password) {
        if (!credenciales || credenciales.password !== password) {
            throw new CredencialesInvalidasError();
        }
    }
}