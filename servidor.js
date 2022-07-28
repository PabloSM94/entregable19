//Express
import express from 'express'
import { Server as HttpServer } from 'http'
//Dotenv
import 'dotenv/config'
import { argv } from './src/env.js'
// Session y cokies
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
//Clusters
import cluster from 'cluster'
//Ruteo
import { routerProductos } from './ruteo/routerProductos.js'
import { routerMensajes } from './ruteo/routerMensajes.js'
import { routerRegistro } from './ruteo/routerRegistro.js'
import { routerLogin } from './ruteo/routerLogin.js'
import { routerInfo } from './ruteo/routerInfo.js'
import { routerMisc } from './ruteo/routerMisc.js'
//Loggers
import { middleInfo, middleWarning, middleLogError } from './servicio/loggers.js'
//Sockets
import {  Server as IOServer } from 'socket.io'
import { socketProductos } from './ruteo/routerProductos.js'
import { socketMensajes } from './ruteo/routerMensajes.js'


//Declaracion de variables
const app = express()
const httpServer = new HttpServer(app)
const PORT = argv.port
const io = new IOServer(httpServer)

//Tratamiento de datos para peticiones
app.use(express.urlencoded({ extended: true })) //Formularios
app.use(express.json()) //JSON

//Creacion de cookies y sesiones
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.USER_BD}:${process.env.PASS_BD}@clusterpm.2bebn.mongodb.net/sessions`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: 'mongoAtlasSecret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 10000,

    }
}))

//Ruteo
app.use(express.static("./public"))
app.use('/api', routerProductos)
app.use('/api/mensajes', routerMensajes)
app.use('/api/registro', routerRegistro)
app.use('/api/logeo', routerLogin)
app.use('/api/info', routerInfo)
app.use('/api/misc', routerMisc)

//Websockets
io.on('connection', async (socket)=>{
    socketMensajes(socket,io.sockets)
    socketProductos(socket,io.sockets)
})


//Iniciar servidor
if (argv.modo === "CLUSTER") {
    if (cluster.isPrimary) {
        for (let i = 0; i < 4; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
        })
    } else {
        const server = httpServer.listen(PORT, () => { console.log("servidor escuchando en el puerto " + server.address().port) })
        server.on("error", error => console.log("Error en servidor" + error))
    }

}
else {
    const server = httpServer.listen(PORT, () => { console.log("servidor escuchando en el puerto " + server.address().port) })
    server.on("error", error => console.log("Error en servidor" + error))
    console.log("servidor creado en modo FORK")
}


app.all('*',
    middleInfo,
    middleWarning,
    (req, res) => {
        res.send("Ruta inexistente")
    })

