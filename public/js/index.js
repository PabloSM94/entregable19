import { buildMensaje, cObjeto } from "./contenedores.js";
import { mostrarProductos, mostrarMensajes } from "./funciones.js";

const socket = io();
const botonEnviar = document.getElementById("botonEnviar")
const enviarMsg = document.getElementById("enviarMsg")
const normalizar = normalizr.normalize
const denormalize = normalizr.denormalize
const schema = normalizr.schema

class Chats {
    constructor(mensajes){
        this.mensajes = {mensajes}
    }
}
const chat = new Chats()
// const chat = {
//     mensajes:[]
// }

let id;

  // Definimos un esquema de usuarios (autores y comentadores)
  const authorSchema = new schema.Entity('authors',{},{ idAttribute: 'id'})
  
  // Definimos un esquema de comentadores
  const mensajesSchema = new schema.Entity('mensaje',{
      author: authorSchema
  },{ idAttribute: 'idmsg'})
  
  // Definimos un esquema de artículos
  const chatSchema = new schema.Entity('mensajes', {
    mensajes: [mensajesSchema],
  },{idAttribute: 'mensajes', mensajes:[]});




socket.on("productos", productos =>{
    mostrarProductos(productos)
})

socket.on("mensajes", mensajes =>{
    const objetoDesnormalizado = denormalize(mensajes.result,chatSchema,mensajes.entities)
    chat.mensajes = Object.values(objetoDesnormalizado)
    mostrarMensajes(objetoDesnormalizado)
})



//Cargar nuevo producto
botonEnviar.addEventListener("click", e=>{
    
    const inputTitle = document.getElementById("inputtitle")
    const inputPrecio = document.getElementById("inputprice")
    const inputThumbnail = document.getElementById("inputthumbnail")

    if (inputTitle.value && inputPrecio.value && inputThumbnail.value){
        const producto = new cObjeto(inputTitle.value,inputPrecio.value,inputThumbnail.value)
        socket.emit("nuevoProducto", producto)
    } else {
        alert("Complete todos los campos")
    }
    
})

//Enviar nuevo mensaje
enviarMsg.addEventListener("click", e=>{
    e.preventDefault()
    //Extracción de datos de formularios
    let mensaje = [];
    const inputemail = document.getElementById("inputemail")
    const inputnombre = document.getElementById("inputnombre")
    const inputapellido = document.getElementById("inputapellido")
    const inputedad = document.getElementById("inputedad")
    const inputalias = document.getElementById("inputalias")
    const inputavatar = document.getElementById("inputavatar")
    const inputmsg = document.getElementById("inputmsg")

    //Creacion de elemento
    if (inputemail.value && inputmsg.value){
        mensaje = new buildMensaje(inputemail.value,inputnombre.value,inputapellido.value,inputedad.value,inputalias.value,inputavatar.value,inputmsg.value)
        const mensajesaOrdenar = JSON.parse(JSON.stringify(chat.mensajes))
        const mensajesOrdenados = mensajesaOrdenar.sort((a,b)=>{
            if (a.idmsg<b.idmsg){
                return 1
            }
            if (a.idmsg>b.idmsg){
                return -1
            }
            if (a.idmsg=b.idmsg){
                return 0
            }
        })
        //Asignacion de id de mensaje
        if (mensajesOrdenados.length !== 0 ){
            mensaje.mensaje.idmsg = mensajesOrdenados[0].idmsg + 1 
        }
        else{
            mensaje.mensaje.idmsg = 1
        }
        //Agrego timestamp al mensaje
        mensaje.mensaje.timestamp = new Date().toLocaleString();
        //Agregar msj a Chat
        chat.mensajes.unshift(mensaje.mensaje)
        const chatNormalizado = normalizar(chat,chatSchema)
        //Emitir mensajes normalizados
        socket.emit("nuevoMensaje", chatNormalizado)
        //Limpiar valor de campo Mensaje
        inputmsg.value = ""
    }else{
        alert("Complete al menos el campo Email y Mensaje")
    }
})


