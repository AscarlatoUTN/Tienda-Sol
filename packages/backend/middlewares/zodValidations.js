import {z} from "zod"

export const idSchema = z.string().regex(/^[a-fA-F0-9]{24}$/)

export function validarPathID() {
    return (req, res, next) => {
        idSchema.parseAsync(req.params.id)
            .then(resultID => req.validatedID = resultID)
            .then(() => next())
            .catch(err => {
                next(err)
            })
    }
}

export function validarQueryParams(qpSchema) {
    return (req, res, next) => {
        qpSchema.parseAsync(req.query)
            .then(resultQuery => req.validatedQuery = resultQuery)
            .then(() => next())
            .catch(err => {
                next(err)
            })
    }
}

export function validarBody(bodySchema) {
    return (req, res, next) => {
        bodySchema.parseAsync(req.body)
            .then(resultBody => req.validatedBody = resultBody)
            .then(() => next())
            .catch(err => {
                next(err)
            })
    }
}

const direccionEntregaSchema = z.object({
    calle: z.string().min(1),
    altura: z.number().int().min(1),
    piso: z.number().int().min(1).optional(),
    departamento: z.string().min(1).optional(),
    codigoPostal: z.string().min(1),
    ciudad: z.string().min(1),
    provincia: z.string().min(1),
    pais: z.string().min(1),
    lat: z.number().min(-90).max(90).optional(),
    lon: z.number().min(-180).max(180).optional()
})

export const pedidoSchema = z.object({
    items: z.array(z.object(
        {
            productoID: idSchema,
            cantidad: z.number().min(1)
        })),
    moneda: z.enum(['PESO_ARG', 'DOLAR_USA', 'REAL']),
    direccionEntrega: direccionEntregaSchema
})

export const cambioEstadoSchema = z.object({
    nuevoEstado: z.enum(['cancelado', 'entregado', 'enviado', 'enPreparacion', 'confirmado', 'pendiente']),
    motivo: z.string().min(1)
})

export const usuarioSchema = z.object({
    nombre: z.string().min(1),
    email: z.email(),
    telefono: z.string().regex(/^\+?\d{7,15}$/).optional(),
    tipo: z.enum(['ADMIN', 'COMPRADOR', 'VENDEDOR'])
})

export const productoSchema = z.object({
    titulo: z.string().min(1),
    descripcion: z.string().min(1),
    categorias: z.array(z.string().min(1)).min(1),
    precio: z.number().min(0),
    moneda: z.enum(['PESO_ARG', 'DOLAR_USA', 'REAL']),
    stock: z.number().min(0),
    fotos: z.array(z.url()).min(1),
    activo: z.boolean()
})

export const notificacionQPSchema = z.object({
    tipo: z.enum(['leidas', 'no_leidas', 'todas']).default('todas')
})

export const productosQPSchema = z.object({
    page: z.preprocess(
            val => val === undefined ? undefined : Number(val),
            z.number().int().min(1).default(1)
    ),
    limit: z.preprocess(
        val => val === undefined ? undefined : Number(val),
        z.number().int().min(0).max(100).default(9)
    ),
    orderBy: z.enum(['precio', 'cantidadesVendidas']).default('cantidadesVendidas'),
    order: z.enum(['asc', 'desc']).default('desc'),
    busqueda: z.string().optional(),
    vendedor: idSchema.optional(),
    minPrice: z.preprocess(
        v => v === undefined ? undefined : Number(v),
        z.number().int().min(0).optional()
    ),
    maxPrice: z.preprocess(
        v => v === undefined ? undefined : Number(v),
        z.number().int().min(0).optional()
    ),
    isActive: z.preprocess(
        val => {
            if (val === undefined) return undefined;
            if (typeof val === 'string') {
                if (val === 'true') return true;
                if (val === 'false') return false;
                return undefined;
            }
            return typeof val === 'boolean' ? val : undefined;
        },
        z.boolean().optional()
    )

});

export const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
})

export const registerSchema = z.object({
    password: z.string().min(6),
    username: z.string().min(1),
    usuarioId: idSchema
})