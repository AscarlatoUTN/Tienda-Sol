import { Repository } from './repository.js'
import { CredencialModel } from '../schemas/credencialSchema.js'
import {CredencialesInvalidasError} from "../../errors/errors.js";

export class CredencialesRepository extends Repository {
    constructor() {
        super(CredencialModel, CredencialesInvalidasError)
    }

    findByUsername(username) {
        return this.model.findOne({ username: username }).exec();
    }
}
