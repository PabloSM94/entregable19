import MensajesDaoFactory from "../persistencia/daos/mensajes/MensajesDaoFactory.js"

const mensajesDao = MensajesDaoFactory.getDao()

async function loadmsg(socket){
    console.log("cargando...")
    const mensajes = await mensajesDao.cargarMensajes()
    socket.emit("mensajes",mensajes)
}

async function loadmsg2(sockets){
    const mensajes = await mensajesDao.cargarMensajes()
    console.log("mensajes actualizados")
    sockets.emit("mensajes",mensajes)
}

export {loadmsg,loadmsg2}