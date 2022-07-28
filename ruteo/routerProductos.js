import {Router} from 'express'
import { verProductos, nuevoProducto } from '../persistencia/contenedorProductosFaker.js'
import { cargainicial, cargaconnuevoProd } from '../servicio/productos.js'

const routerProductos = Router()

routerProductos.get('/productos-test', (req,res)=>{
    // console.log("llego peticion")
    async function cargarProductos(){
        const productos = await verProductos()
        res.json(JSON.stringify(productos))
    }
    cargarProductos()
    
})

async function socketProductos(socket, sockets){
    cargainicial()
    socket.on("nuevoProducto",producto =>{
        nuevoProducto(producto)
        cargaconnuevoProd()
              
    })
}

export {routerProductos,socketProductos}