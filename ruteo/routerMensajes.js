import {Router} from 'express'
import { middleInfo, middleLogError } from '../servicio/loggers.js'
import { loadmsg, loadmsg2 } from '../servicio/mensajes.js'

const routerMensajes = Router()

async function socketMensajes(socket,sockets){
    //Carga inicial 
    loadmsg()
    //Agregar nuevo mensajes y persistir
    socket.on("nuevoMensaje",async msg =>{
        console.log("llego mensaje nuevo al servidor",msg)
        await guardarMensaje(msg)
        await loadmsg2()
            
    })
}


export {routerMensajes,socketMensajes}