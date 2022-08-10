import { Router } from 'express'
//Passport
import passport from 'passport'
import {  Strategy as LocalStrategy} from 'passport-local'
import { middleInfo, middleLogError } from '../servicio/loggers.js'

//TEMPORAL---------------------------------------------------------------
import { validarUsuarios } from '../persistencia/persistenciaUsuarios.js'
import { crearUsuario } from '../servicio/usuarios.js'
//TEMPORAL---------------------------------------------------------------
const routerRegistro = Router()

//Uso de passport
routerRegistro.use(passport.initialize())
routerRegistro.use(passport.session())

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

//Estrategia de registro
passport.use('registro', new LocalStrategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        let datosUsuario;
        try {
            const validate = await validarUsuarios(username)
            if (validate.length === 0) {
                console.log("creando")
                datosUsuario = req.body
                await crearUsuario(datosUsuario)
                console.log("usuario creado")
                return done(null, username)
            } else {
                return done(null, false)
            }

        }
        catch (error) {
            return done("error")
        }
    }))

//Rutas
routerRegistro.post('/register', 
    middleInfo, 
    passport.authenticate('registro', {
        failureRedirect: '/api/registro/failRegister',
        successRedirect: '/api/registro/successRegister',
    })
)

routerRegistro.get('/failRegister',
    middleLogError,
    (req, res) => {
        res.json({ status: "error", msg: `Registro fallido` })
    }
)
routerRegistro.get('/successRegister', 
    (req, res) => {
        res.json({ status: "ok", name: `username:${req.body.username}` })
    }
)

export { routerRegistro }