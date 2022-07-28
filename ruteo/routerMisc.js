import {Router} from 'express'
import { middleInfo, middleLogError } from '../servicio/loggers.js'

const routerMisc = Router()

routerMisc.get('/randoms', 
    middleInfo,
    (req,res)=>{
    let cantidad
    if (req.query.cant){
        cantidad = req.query.cant
    }else{
        cantidad = 100000000
    }
    
    //Desactivado el modo child process -- Si se ejecuta el servidor en modo FORK puede bloquearse.
    
    // const calculo = fork('./random.js')
    
    // calculo.on('message', data => {
    //     if (data=="Listo para recibir"){
    //         calculo.send(cantidad)
    //     }
    //     else{
    //         res.end(JSON.stringify(data))
    //     }
    //     console.log(data)
    // })

    let miarray = Array.from({length: cantidad}, () => Math.floor(Math.random() * 10))
    // console.log(miarray)
    let repetidos = {};
    miarray.forEach(function(numero){
    repetidos[numero] = (repetidos[numero] || 0) + 1;
    })
    res.send(repetidos)

})


export {routerMisc}