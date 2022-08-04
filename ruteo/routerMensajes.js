import {Router} from 'express'
import { middleInfo, middleLogError } from '../servicio/loggers.js'
import { loadmsg, loadmsg2 } from '../servicio/mensajes.js'
import MensajesDaoFactory from "../persistencia/daos/mensajes/MensajesDaoFactory.js"
import MensajesRepo from '../repository/repositoryMensajes.js'

const mensajesDao = MensajesDaoFactory.getDao()
const repoMensajes = new MensajesRepo
const routerMensajes = Router()

routerMensajes.get('/mensajes-test', async(req,res)=>{
    const result = await repoMensajes.cargarMensajes()
    res.json(JSON.stringify(result))
})
routerMensajes.post('/mensajes-test', async(req,res)=>{
    const { body } = req
    const result = await repoMensajes.guardarMensaje(body)
    res.json(`Se guardo el mensaje : ${JSON.stringify(result)}`)
})

async function socketMensajes(socket,sockets){
    //Carga inicial 
    loadmsg(socket)
    //Agregar nuevo mensajes y persistir
    socket.on("nuevoMensaje",async msg =>{
        console.log("llego mensaje nuevo al servidor",msg)
        await repoMensajes.guardarMensaje(msg)
        await loadmsg2(sockets)
            
    })
}


export {routerMensajes,socketMensajes}