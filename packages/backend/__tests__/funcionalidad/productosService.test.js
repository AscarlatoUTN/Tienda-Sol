import ProductosService from "../../services/productosService.js"
import { Producto } from '../../domain/productos/Producto.js'
import {describe, it, beforeEach, expect, jest} from '@jest/globals'
import {productosQPMapper,  paginacionMapper, productoMapper} from "../../mappers/mappers.js";
import {Usuario} from "../../domain/usuarios/Usuario.js";
import {TipoUsuario} from "../../domain/usuarios/TipoUsuario.js";
import {ProductoNoEncontradoError} from "../../errors/errors.js";

describe('ProductosService.crear', () => {
    let productosService, vendedor, productoDTO, productoDoc

    beforeEach(() => {
        ProductosService._singleton = null
        productosService = ProductosService.instance()

        productosService.productosRepository = {
            create: jest.fn(doc => Promise.resolve(doc))
        }
        productosService.usuariosService = {
            validarPermisos: jest.fn().mockResolvedValue()
        }
        jest.spyOn(productoMapper, 'fromProductoDTO')
        jest.spyOn(productoMapper, 'toProductoDocument')

        vendedor = new Usuario('VendedorA', 'v@test.com', '123', TipoUsuario.VENDEDOR)
        productoDTO = { titulo: 'P', descripcion: 'D', categorias: [], precio: 10, moneda: 'PESO_ARG', stock: 2, fotos: [], activo: true }
        productoDoc = { any: 'doc' }
        productoMapper.fromProductoDTO.mockReturnValue(new Producto(vendedor, 'P', 'D', [], 10, 'PESO_ARG', 2, [], true))
        productoMapper.toProductoDocument.mockReturnValue(productoDoc)
    })

    it('crea producto con permisos y mapping correcto', () => {
        return productosService.crear(productoDTO, vendedor).then(result => {
            expect(productosService.usuariosService.validarPermisos).toHaveBeenCalledWith(vendedor, TipoUsuario.VENDEDOR)
            expect(productoMapper.fromProductoDTO).toHaveBeenCalledWith(productoDTO, vendedor)
            expect(productoMapper.toProductoDocument).toHaveBeenCalled()
            expect(productosService.productosRepository.create).toHaveBeenCalledWith(productoDoc)
            expect(result).toEqual(productoDoc)
        })
    })
})

describe('ProductosService.existenProductos', () => {
    let productosService

    beforeEach(() => {
        ProductosService._singleton = null
        productosService = ProductosService.instance()
    })

    it('devuelve productos cuando todos existen', () => {
        const ids = ['a', 'b']
        productosService.existeProducto = jest.fn((id, productos) => {
            productos.push({ id })
            return Promise.resolve()
        })
        return productosService.existenProductos(ids).then(result => {
            expect(productosService.existeProducto).toHaveBeenCalledTimes(2)
            expect(result.map(p => p.id)).toEqual(ids)
        })
    })

    it('lanza ProductoNoEncontradoError cuando alguno no existe', () => {
        const ids = ['ok', 'fail', 'ok2']
        productosService.existeProducto = jest.fn((id, productos, idsConError) => {
            if (id === 'fail') idsConError.push(id)
            else productos.push({ id })
            return Promise.resolve()
        })
        return productosService.existenProductos(ids).then(
            () => { throw new Error('Debió lanzar') },
            err => expect(err).toBeInstanceOf(ProductoNoEncontradoError)
        )
    })
})

describe('ProductosService.aumentarStock', () => {
    let productosService, item1, item2

    beforeEach(() => {
        ProductosService._singleton = null
        productosService = ProductosService.instance()
        const prod1 = { aumentarStock: jest.fn(), save: jest.fn().mockResolvedValue({}) }
        const prod2 = { aumentarStock: jest.fn(), save: jest.fn().mockResolvedValue({}) }
        item1 = { producto: prod1, cantidad: 3 }
        item2 = { producto: prod2, cantidad: 1 }
    })

    it('aumenta stock y guarda todos los productos', () => {
        return productosService.aumentarStock([item1, item2]).then(() => {
            expect(item1.producto.aumentarStock).toHaveBeenCalledWith(3)
            expect(item2.producto.aumentarStock).toHaveBeenCalledWith(1)
            expect(item1.producto.save).toHaveBeenCalled()
            expect(item2.producto.save).toHaveBeenCalled()
        })
    })

    it('rechaza si un save falla', () => {
        item2.producto.save.mockRejectedValue(new Error('fail'))
        return productosService.aumentarStock([item1, item2]).then(
            () => { throw new Error('Debió fallar') },
            () => expect(item1.producto.save).toHaveBeenCalled()
        )
    })
})

describe('ProductosService.disminuirStock', () => {
    let productosService, item1, item2

    beforeEach(() => {
        ProductosService._singleton = null
        productosService = ProductosService.instance()
        productosService.productosValidator = { validarProductos: jest.fn() }

        const prod1 = { reducirStock: jest.fn(), save: jest.fn().mockResolvedValue({}) }
        const prod2 = { reducirStock: jest.fn(), save: jest.fn().mockResolvedValue({}) }
        item1 = { producto: prod1, cantidad: 2 }
        item2 = { producto: prod2, cantidad: 5 }
    })

    it('valida, reduce stock y guarda', () => {
        productosService.productosValidator.validarProductos.mockImplementation(() => {})
        return productosService.disminuirStock([item1, item2]).then(() => {
            expect(productosService.productosValidator.validarProductos).toHaveBeenCalledWith([item1, item2])
            expect(item1.producto.reducirStock).toHaveBeenCalledWith(2)
            expect(item2.producto.reducirStock).toHaveBeenCalledWith(5)
            expect(item1.producto.save).toHaveBeenCalled()
            expect(item2.producto.save).toHaveBeenCalled()
        })
    })

    it('si la validación falla, no guarda y rechaza', () => {
        productosService.productosValidator.validarProductos.mockImplementation(() => { throw new Error('invalid') })
        return productosService.disminuirStock([item1, item2]).then(
            () => { throw new Error('Debió fallar') },
            () => {
                expect(item1.producto.save).not.toHaveBeenCalled()
                expect(item2.producto.save).not.toHaveBeenCalled()
            }
        )
    })
})

describe('ProductosService.consultarProductos', () => {
    let productosService, usuariosService, paginacion, muestreo, filtrado, vendedor, productosLeidos;

    beforeEach(() => {
        ProductosService._singleton = null;
        productosService = ProductosService.instance();
        usuariosService = productosService.usuariosService;

        productosService.productosRepository = {
            find: jest.fn(),
            count: jest.fn()
        };

        usuariosService.usuariosRepository = {
            findById: jest.fn()
        };

        jest.spyOn(productosQPMapper, 'sortParamMapper');
        jest.spyOn(productosQPMapper, 'filterMapper');
        jest.spyOn(paginacionMapper, 'toDTO');

        paginacion = { page: 2, limit: 2 };
        muestreo = { order: 'desc', orderBy: 'precio' };
        filtrado = {
            minPrice: 10,
            maxPrice: 50,
            busqueda: 'verde',
            vendedor: 'V1'
        };

        vendedor = new Usuario('VendedorA', 'a@gmail.com', '1234', TipoUsuario.VENDEDOR);
        vendedor.id = 'V1';

        productosLeidos = [
            { id: 2, precio: 30, vendedor: 'V1' },
            { id: 1, precio: 20, vendedor: 'V1' }
        ];

        usuariosService.usuariosRepository.findById.mockResolvedValue(vendedor);
        productosService.productosRepository.find.mockResolvedValue(productosLeidos);
        productosService.productosRepository.count.mockResolvedValue(4);
    });

    it('aplica todos los filtros y pagina correctamente', () => {
        return productosService.consultarProductos(paginacion, muestreo, filtrado).then(result => {

            expect(paginacion.offset).toBe(2);

            expect(productosQPMapper.sortParamMapper).toHaveBeenCalledWith(muestreo);
            expect(productosQPMapper.filterMapper).toHaveBeenCalledWith(filtrado, vendedor);

            const regex = new RegExp(filtrado.busqueda.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
            const filtrosEsperados = {
                vendedor: 'V1',
                $or: [
                    { titulo: regex },
                    { descripcion: regex },
                    { "categorias.nombre": regex }
                ],
                precio: { $gte: 10, $lte: 50 }
            };

            expect(productosService.productosRepository.find)
                .toHaveBeenCalledWith(paginacion, { _id: 1, precio: -1 }, filtrosEsperados);

            expect(productosService.productosRepository.count)
                .toHaveBeenCalledWith(filtrosEsperados);

            expect(paginacionMapper.toDTO)
                .toHaveBeenCalledWith(productosLeidos, 2, 2, 4);

            expect(result).toEqual({
                pagina: 2,
                perPage: 2,
                total: 4,
                totalPaginas: 2,
                data: productosLeidos
            });
        });
    });
});