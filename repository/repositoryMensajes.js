import MensajesDaoFactory from "../persistencia/daos/mensajes/MensajesDaoFactory.js";
import { buildMensaje } from '../public/js/contenedores.js'

const mensajesDao = MensajesDaoFactory.getDao()

export default class MensajesRepo{
    constructor(){
        this.dao = mensajesDao
    }

    async guardarMensaje(msj){
        const nuevoMensaje = await new buildMensaje(msj.id,msj.nombre,msj.text)
        const dto = nuevoMensaje.mensaje()
        const dtoGuardado = await this.dao.guardarMensaje(dto)
        return dtoGuardado
    }

    async cargarMensajes(){
        const result = await this.dao.cargarMensajes("mensajes")
        return result
    }
}