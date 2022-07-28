import {Router} from 'express'
//Passport
import passport from 'passport'
import {  Strategy as LocalStrategy} from 'passport-local'
import { middleInfo, middleLogError } from '../servicio/loggers.js'
import { middlewareLog } from '../servicio/middlewares.js'

import { autenticar } from '../servicio/usuarios.js'

const routerLogin = Router()

//Uso de passport
routerLogin.use(passport.initialize())
routerLogin.use(passport.session())

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

//Estrategia de login
passport.use('login', new LocalStrategy ({passReqToCallback: true}, 
    async (req,username,password,done)=>{
    try{
     const usuario = {username: username , password: password}
     const result = await autenticar(usuario.username,usuario.password)
    if (result.status == "ok"){
        done(null,usuario)
    } else {     
        done(null,false)
    }
    }
    catch{
        done(null,false)
    }
}))

//Rutas
routerLogin.get('/login', 
    middleInfo,
    passport.authenticate('login',{
    failureRedirect: '/api/logeo/failLogin',
    successRedirect: '/api/logeo/successLogin',
}
), 
)

routerLogin.get('/failLogin', 
    middleLogError,
    (req,res)=>{
        res.json({status: "error", msg:`Login fallido` })
    }
)

routerLogin.get('/successLogin', (req,res)=>{
    res.json({status:"ok", name: `${req.body.username}`})
})

routerLogin.get('/logout',
    middleInfo,
    middlewareLog.destruirSesion,
    (req,res)=>{
    res.json(`Usuario deslogeado`)
    }
)


routerLogin.get('/log',
    middleInfo,
    middlewareLog.estaLogeado,
    (req,res)=>{
    res.json({status:"ok", name: `${req.session.passport.user.username}`})
})


export {routerLogin}