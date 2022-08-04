import { MensajesDao } from './MensajesDao.js'
import { knex2 } from '../../../public/js/crearTabla.js'

class MensajesDaoSQL extends MensajesDao{
    constructor(){
        super()
    }
    async cargarMensajes(tabla){
        let mensajes = []
        await knex2.from(`${tabla}`).select("*")
            .then((rows)=>{
                for (const row of rows){
                    mensajes.push(row)
                }
            return 
            })
        return mensajes
    }
    
    async guardarMensaje(msg){
        msg.fecha = new Date().toLocaleString();
        console.log(msg);
        await knex2('mensajes').insert(msg)
                .then(()=>{
                    console.log("mensaje guardado")
                })
    }
}

export { MensajesDaoSQL }