import {guardarUsuario, validarUsuarios} from '../persistencia/persistenciaUsuarios.js'

//Creo el usuario y lo guardo en base de datos
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
}

//Autenticacion de usuarios
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

export {crearUsuario, autenticar}