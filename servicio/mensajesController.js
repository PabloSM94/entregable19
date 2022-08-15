import MensajesRepo from '../repository/repositoryMensajes.js'

const repoMensajes = new MensajesRepo

async function cargarMensajes(){
    
    const result = await repoMensajes.cargarMensajes()
    return({mensajes: JSON.stringify(result)})
}

async function guardarMensaje(datos){
    const result = await repoMensajes.guardarMensaje(datos.datos)
    return (result)
}

export {cargarMensajes,guardarMensaje}