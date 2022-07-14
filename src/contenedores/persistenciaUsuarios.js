import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = config.mongodb.cnxStr;
const client = new MongoClient(uri);

import config from '../config.js'

await client.connect();

async function validarUsuarios(useraValidar){
    console.log("a validar...")
    const database = client.db("users");
    const usuarios = database.collection("users")
    const datos = await usuarios.find({username: `${useraValidar}`}).toArray()
    return datos
}

async function guardarUsuario(usr){
    
    console.log("guardando..")
    const database = client.db("users");
    const users = database.collection("users")
    await users.insertOne(usr)
    
}

async function obtenerUsuarioporUsername(username){
    const database = client.db("users");
    const usuarios = database.collection("users")
    const datos = await usuarios.find({username: `${username}`}).toArray()
    return {username: datos[0].username, password: datos[0].password}
}

export {guardarUsuario,validarUsuarios}