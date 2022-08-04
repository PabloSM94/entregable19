import { MensajesDao } from './MensajesDao.js'
import { MongoClient } from "mongodb"
import config from '../../../src/config.js';

const uri = config.mongodb.cnxStr;
const client = new MongoClient(uri);

await client.connect();

class MensajesDaoNoSQL extends MensajesDao{
    constructor(){
        super()
    }
    async cargarMensajes(){
        const database = client.db("chat");
        const mensajes = database.collection("mensajes")
        const datos = await mensajes.find().toArray()
        const objetoNormalizado = datos
        return objetoNormalizado
    }
    
    async guardarMensaje(msg){
        
        console.log("guardando..")
        const database = client.db("chat");
        const mensajes = database.collection("mensajes")
        const result = await mensajes.insertOne({msg})
        return msg
        
    }
}

export { MensajesDaoNoSQL }