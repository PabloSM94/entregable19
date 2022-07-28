async function loadpr(){
    const productos = await verProductos()
    return productos
}
async function cargainicial(){
    const productos = await loadpr()
    socket.emit("productos", productos)
}
async function cargaconnuevoProd(){
    const productos = await loadpr()
    sockets.emit("productos", productos)
}

export {cargainicial,loadpr,cargaconnuevoProd}