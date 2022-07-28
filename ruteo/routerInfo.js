import {Router} from 'express'
import { middleInfo, middleLogError } from '../servicio/loggers.js'
import { argv } from '../src/env.js'
//Gzip
// import compression from 'compression'

import os from 'os'
const routerInfo = Router()
const numCPUs = os.cpus().length

// routerInfo.get('/infozip',compression(), (req,res)=>{
//     const {url , method} = req
//     logger.info(`Peticion ${url}, metodo ${method}`)
//     let datos = []
//     //Argumentos de entrarada
//     datos.push({argumentosEntrada: argv})
//     //nombre de la plataforma (SO)
//     datos.push({nombrePlataforma: process.env.OS})
//     //Version de nodejs
//     datos.push({nodeJSVersion: process.versions.node})
//     //Memoria total reservada (Rss)
//     datos.push({memoriaReservada: process.memoryUsage().rss})
//     //path de ejecucion
//     datos.push({pathEjecucion: process.env.Path})
//     //processid
//     datos.push({processID: process.pid})
//     //Carpeta del proyecto
//     datos.push({carpetadeProyecto: process.argv[1]})
    
//     //Numero de procesadores presentes en el servidor
//     datos.push({numerodeProcesadores: numCPUs})
//     console.log(datos)
//     res.send((JSON.stringify(datos)).repeat(1000))
// })

routerInfo.get('/info',
    middleInfo,
    (req,res)=>{
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
    
    //Numero de procesadores presentes en el servidor
    
    datos.push({numerodeProcesadores: numCPUs})

    res.send(datos)
    //res.send((JSON.stringify(datos)).repeat(1000))
})

export {routerInfo}