import { Repository } from './repository.js'
import {ProductoModel} from "../schemas/productoSchema.js";
import {ProductoNoEncontradoError} from "../../errors/errors.js";

export class ProductosRepository extends Repository {

    constructor() {
        super(ProductoModel, ProductoNoEncontradoError)
    }

    find(paginacion, sortParam, filtros) {
        return this.model
            .find(filtros)
            .sort(sortParam)
            .skip(paginacion.offset)
            .limit(paginacion.limit)
            .exec()
    }
}