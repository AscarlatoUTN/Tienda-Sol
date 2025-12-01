import { describe, it, expect, jest } from '@jest/globals'
import request from 'supertest'

jest.mock('../../routes/swaggerRoutes.js', () => {
  const { Router } = jest.requireActual('express')
  return { __esModule: true, default: Router() }
})

jest.mock('../../services/productosService.js', () => {
  const Actual = jest.requireActual('../../services/productosService.js').default
  const { Producto } = jest.requireActual('../../domain/productos/Producto.js')

  return {
    __esModule: true,
    default: class ProductosServiceMock extends Actual {
      static _singleton = null
      static instance () {
        this._singleton ||= new ProductosServiceMock()
        return this._singleton
      }

      buscarProductos (ids) {
        return Promise.resolve(
          ids.map(id => {
            const p = new Producto(
              { id: 'vend123' },
              `Producto ${id}`,
              'Descripcion mock',
              ['cat1'],
              500,
              'PESO_ARG',
              20,
              ['https://example.com/foto.png'],
              true
            )
            p.id = id
            p._id = id
            p.save = jest.fn().mockResolvedValue(p)
            return p
          })
        )
      }

      disminuirStock (items) {
        return Promise.resolve(items)
      }
    }
  }
})

jest.mock('../../persistence/repositories/pedidosRepository.js', () => {
  const { PedidosRepository } = jest.requireActual('../../persistence/repositories/pedidosRepository.js')
  return {
    PedidosRepository: {
      instance: () => ({
        create: jest.fn().mockImplementation(pedidoDoc => {
          return Promise.resolve({
            pedidoID: '123456789012345678901234',
            ...pedidoDoc
          })
        })
      })
    }
  }
})

jest.mock('../../persistence/repositories/usuariosRepository.js', () => {
    const { Usuario } = jest.requireActual('../../domain/usuarios/Usuario.js')

    return {
        UsuariosRepository: {
            instance: () => ({
                findById: jest.fn(id => {
                    const usuario = new Usuario(
                        'Mock User',
                        'mock@user.com',
                        undefined,
                        'COMPRADOR'
                    )
                    usuario.id = id
                    return Promise.resolve(usuario)
                })
            })
        }
    }
})

jest.mock('../../services/notificacionesService.js', () => {
  const Actual = jest.requireActual('../../services/notificacionesService.js').default
  return {
    __esModule: true,
    default: class NotificacionesServiceMock extends Actual {
      static _singleton = null
      static instance () {
        this._singleton ||= new NotificacionesServiceMock()
        return this._singleton
      }

      notificarNuevoPedido () {
        return Promise.resolve()
      }
    }
  }
})

import app from '../../routes/routes.js'

describe('POST /pedidos (integración crear pedido)', () => {
  it('crea un pedido correctamente con datos válidos', async () => {
    const payload = {
      items: [
        { productoID: '507f1f77bcf86cd799439012', cantidad: 3 },
        { productoID: '507f1f77bcf86cd799439013', cantidad: 1 }
      ],
      moneda: 'PESO_ARG',
      direccionEntrega: {
        calle: 'Calle Falsa',
        altura: 742,
        piso: 1,
        departamento: 'A',
        codigoPostal: 'C1001ABC',
        ciudad: 'Buenos Aires',
        provincia: 'Buenos Aires',
        pais: 'Argentina',
        lat: -34.6037,
        lon: -58.3816
      }
    }

    const res = await request(app)
      .post('/pedidos')
      .set('Authorization', '507f1f77bcf86cd799439011')
      .send(payload)

    console.log('Respuesta:', res.body)

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('pedidoID', '123456789012345678901234')
    expect(res.body.direccionEntrega.pais).toBe("Argentina")
  })
})
