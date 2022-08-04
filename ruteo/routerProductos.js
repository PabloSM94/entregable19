import {Router} from 'express'
import ProductosDaoFactory from '../persistencia/daos/productos/ProductosDaoFactory.js'
import { cargainicial, cargaconnuevoProd } from '../servicio/productos.js'

const productosDao = ProductosDaoFactory.getDao()
const routerProductos = Router()

routerProductos.get('/productos-test', async (req,res)=>{
    // console.log("llego peticion")
    
    const productos = await productosDao.verProductos()
    res.json(JSON.stringify(productos))
    
    // async function cargarProductos(){
    //     const productos = await verProductos()
    //     res.json(JSON.stringify(productos))
    // }
    // cargarProductos()
    
})

async function socketProductos(socket, sockets){
    cargainicial(socket)
    socket.on("nuevoProducto",producto =>{
        productosDao.nuevoProducto(producto)
        cargaconnuevoProd(sockets)
              
    })
}

export {routerProductos,socketProductos}