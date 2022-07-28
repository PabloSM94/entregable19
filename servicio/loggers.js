//Loggers
import winston from 'winston'

const logger = winston.createLogger({
    transports : [
        new winston.transports.Console({level:'info'}),
        new winston.transports.File({ filename:'warn.log', level:'warn'}),
        new winston.transports.File({ filename:'error.log', level:'error'})
    ]
})

async function middleInfo(req,res,next){
    logger.info(`Peticion a ruta ${req.url} , mediante el metodo ${req.method}`)
    next()
}
async function middleLogError(req,res,next){
        logger.error(`ERROR! ${req.url}`)
        next()    
}

async function middleWarning(req,res,next){
    logger.error(`Alerta! URL: ${req.url} inexistente`)
    next()    
}

export {middleInfo,middleLogError,middleWarning}
