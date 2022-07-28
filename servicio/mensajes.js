async function loadmsg(){
    console.log("cargando...")
    const mensajes = await cargarMensajes()
    socket.emit("mensajes",mensajes)
}

async function loadmsg2(){
    const mensajes = await cargarMensajes()
    console.log("mensajes actualizados")
    sockets.emit("mensajes",mensajes)
}

export {loadmsg,loadmsg2}