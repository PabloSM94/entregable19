import ProductosDaoFactory from '../persistencia/daos/productos/ProductosDaoFactory.js'

const productosDao = ProductosDaoFactory.getDao()

async function loadpr(){
    const productos = await productosDao.verProductos()
    return productos
}
async function cargainicial(socket){
    const productos = await loadpr()
    socket.emit("productos", productos)
}
async function cargaconnuevoProd(sockets){
    const productos = await loadpr()
    sockets.emit("productos", productos)
}

export {cargainicial,loadpr,cargaconnuevoProd}