import { Schema, model, Types } from 'mongoose'
import { Credencial } from '../../domain/usuarios/Credencial.js'
import { applyDefaultToJSON } from '../schemasUtils.js'

export const CredencialSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    usuarioId: {
        type: Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

applyDefaultToJSON(CredencialSchema)

CredencialSchema.loadClass(Credencial)

export const CredencialModel = model('Credencial', CredencialSchema, "credenciales")
