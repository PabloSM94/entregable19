//Dotenv
import 'dotenv/config'
import x from 'yargs/yargs'
const yargs = x(process.argv.slice(2))
const argv = yargs
    .alias({
        p: 'port'
    })
    .default({
        port: 8080
    })
    .argv

import { fork } from 'child_process'


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
import { validarUsuarios, guardarUsuario } from './contenedores/persistenciaUsuarios.js'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

//Passport
import passport from 'passport'
import {  Strategy as LocalStrategy} from 'passport-local'




const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = argv.port

app.use(express.urlencoded({extended: true})) //Formularios
app.use(express.json()) //JSON

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.USER_BD}:${process.env.PASS_BD}@clusterpm.2bebn.mongodb.net/sessions`,
        mongoOptions: advancedOptions
    }),
    secret: 'mongoAtlasSecret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie:{
        maxAge: 10000,
        
    }
}))
app.use(express.static("../public"))
app.use('/api/productos-test',router)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


//Registro

async function crearUsuario(datos){
    if(!datos.username){
        throw new Error('falta campo obligatorio username')
    }
    if(!datos.password){
        throw new Error('falta campo obligatorio password')
    }
    const usuario = {
        username: datos.username,
        password: datos.password
    }
    await guardarUsuario(usuario)
}//Creo el usuario y lo guardo en base de datos

passport.use('registro', new LocalStrategy ({
    passReqToCallback: true
},
    async (req,username,password,done)=>{
        console.log(username)
        let datosUsuario;
        try {
            const validate = await validarUsuarios(username)
            console.log(validate)
            if(validate.length === 0){
            console.log("creando")
            datosUsuario = req.body
            await crearUsuario(datosUsuario)
            console.log("usuario creado")
            return done(null,username)
            }else{
                return done(null,false)
            }
            
        }
        catch(error){
            return done("error")
        }
}))
//registro

app.post('/register', passport.authenticate('registro',{
    failureRedirect: '/failRegister',
    successRedirect: '/successRegister',
}))

app.post('/failRegister',(req,res)=>{
    res.json({status: "error", msg:`Registro fallido` })
})
app.post('/successRegister',(req,res)=>{
    console.log(req.body)
    res.json({status:"ok", name: `{username:${req.body.username}`})
})



// app.post('/register',async (req,res)=>{
//     const datosUsuario = req.body
//     const validate = await validarUsuarios(req.body.username)
//     console.log(validate.length)
//     if(validate.length === 0){
//         crearUsuario(datosUsuario)
//         res.json("usuario creado")
//     }
//     else{
//         res.json("Error el usuario ya existe en la base de datos")
//     }

// })

async function autenticar(user,pass){
    const validate = await validarUsuarios(user)
    if(validate.length === 0){
        return({status: "error", msg: "usuario no existe en base de datos"})
    }
    else{
        if (pass === validate[0].password){
            return({status: "ok", msg:"Usuario autenticado"})
        }
        else{
            return({status: "error", msg:"contraseña incorrecta"})
        }
        
        
    }
}

//login-passport estategia

passport.use('login', new LocalStrategy ({passReqToCallback: true}, async (req,username,password,done)=>{
    try{
     const usuario = {username: username , password: password}
     const result = await autenticar(usuario.username,usuario.password)
    if (result.status === "ok"){
        done(null,usuario)
    } else {     
        done(null,false)
    }
    }
    catch{
        done(null,false)
    }
}))

//login


app.get('/login',passport.authenticate('login',{
    failureRedirect: '/failLogin',
    successRedirect: '/successLogin',
}))

app.get('/failLogin', (req,res)=>{
    res.json({status: "error", msg:`Login fallido` })
})

app.get('/successLogin', (req,res)=>{
    res.json({status:"ok", name: `${req.body.username}`})
})


// app.get('/login', async (req, res) => {
//     //console.log(req.query)
//     //Autenticar e inciar sesion
//     const usuario = {username: req.body.username , password: req.body.password}
//     const nombre = usuario.username
//     const result = await autenticar(usuario.username,usuario.password)
//     if (result.status === "ok"){
//         console.log("Usuario autenticado, Sesion inciada")
//         req.session.name = nombre
//         res.json({status:"ok", name: `${req.session.name}`})
//     } else {
//         res.json({status: "error", msg:`${result.msg}` })
//     }
// })
//logout
app.get('/logout', (req,res)=>{
    if (req.isAuthenticated()){
        req.logout()
    }
    res.json(`Usuario deslogeado`)
})
// app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (!err) res.json({status:"ok", msg:"Logout ok!"})
//         else res.json({ status: 'Logout ERROR', body: err })
//     })
// })

const middleware = {
    estaLogeado: function(req,res,next){
        console.log(req.session.name)
        if (req.session.name) return next()
        res.json({status: "error", msg:"usuario sin logear"})
    }
}


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

//----------Variables de entorno--------------
app.get('/info', (req,res)=>{
    let datos = []
    //Argumentos de entrarada
    datos.push({argumentosEntrada: argv})
    //nombre de la plataforma (SO)
    datos.push({nombrePlataforma: process.env.OS})
    //Version de nodejs
    datos.push({nodeJSVersion: process.versions.node})
    //Memoria total reservada (Rss)
    datos.push({memoriaReservada: process.memoryUsage().rss})
    //path de ejecucion
    datos.push({pathEjecucion: process.env.Path})
    //processid
    datos.push({processID: process.pid})
    //Carpeta del proyecto
    datos.push({carpetadeProyecto: process.argv[1]})

    res.send(datos)
})

app.get('/api/randoms', (req,res)=>{
    let cantidad
    if (req.query.cant){
        cantidad = req.query.cant
    }else{
        cantidad = 100000000
    }
    
    const calculo = fork('./random.js')
    
    calculo.on('message', data => {
        if (data=="Listo para recibir"){
            calculo.send(cantidad)
        }
        else{
            res.end(JSON.stringify(data))
        }
        console.log(data)
    })

    

})

