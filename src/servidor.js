import express from 'express'
import fs from 'fs'
import {  Server as HttpServer  } from 'http'
import {  Server as IOServer } from 'socket.io'
//Base de datos
import { cargarMensajes, guardarMensaje } from './contenedores/contenedorMensajesnoSQL.js'
import { verProductos,nuevoProducto } from './contenedores/contenedorProductosFaker.js'
import router from './router/routerProductos.js'


// Session y cokies
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080

app.use(express.urlencoded({extended: true})) //Formularios
app.use(express.json()) //JSON


app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://pablosm94:coderhouse@clusterpm.2bebn.mongodb.net/sessions',
        mongoOptions: advancedOptions
    }),
    secret: 'mongoAtlasSecret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie:{
        maxAge: 60000,
        
    }
}))

const middleware = {
    estaLogeado: function(req,res,next){
        console.log(req.session.name)
        if (req.session.name) return next()
        res.json({status: "error", msg:"usuario sin logear"})
    }
}

app.use(express.static("../public"))
app.use('/api/productos-test',router)

const contador = 0;
app.get('/login', (req, res) => {
    console.log(req.query)
    const nombre = (req.query).name
    console.log(nombre)
    if (nombre){
        req.session.name = nombre
        res.json({status:"ok", name: `${req.session.name}`})
    } else {
        res.json({status: "error", msg:"Error!" })
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.json({status:"ok", msg:"Logout ok!"})
        else res.json({ status: 'Logout ERROR', body: err })
    })
})

app.get('/log', middleware.estaLogeado , (req,res)=>{
    res.json({status:"ok", name: `${req.session.name}`})
})

// let productos = []; //Cambiar persistencia a MariaDB / MySQL
// let mensajes = [];  //Cambiar persistencia a SQLite3

const server = httpServer.listen(PORT, ()=>{console.log("servidor escuchando en el puerto "+ server.address().port)})

server.on("error", error => console.log("Error en servidor"+error))


io.on('connection', (socket)=>{

    console.log(`Se conecto el usuario: ${socket.id}`)
//-----------------------------------------Mensajes
    async function loadmsg(){
        console.log("cargando...")
        const mensajes = await cargarMensajes()
        socket.emit("mensajes",mensajes)
    }

    async function loadmsg2(){
        const mensajes = await cargarMensajes()
        console.log("mensajes actualizados")
        io.sockets.emit("mensajes",mensajes)
    }
    //Carga inicial 
    loadmsg()
    //Agregar nuevo mensajes y persistir
    socket.on("nuevoMensaje",async msg =>{
        console.log("llego mensaje nuevo al servidor",msg)
        await guardarMensaje(msg)
        await loadmsg2()
            
    })
//-------------------------------------------Productos


    async function loadpr(){
        const productos = await verProductos()
        return productos
    }
    
    //Carga incial de productos
    async function cargainicial(){
        const productos = await loadpr()
        socket.emit("productos", productos)
    }
    async function cargaconnuevoProd(){
        const productos = await loadpr()
        io.sockets.emit("productos", productos)
    }
    cargainicial()

    socket.on("nuevoProducto",producto =>{
        nuevoProducto(producto)
        cargaconnuevoProd()
              
    })


})

//////////////////////////--- Base de datos
