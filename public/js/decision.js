if (document.getElementById("botonLogin")){
    const botonLogin = document.getElementById("botonLogin")
    botonLogin.addEventListener("click",e=>{
        e.preventDefault()
        window.location.href = "http://localhost:8080/login.html"
        console.log("login")
    })
}
if (document.getElementById("botonRegister")){
    const botonRegister = document.getElementById("botonRegister")
    botonRegister.addEventListener("click",e=>{
        e.preventDefault()
        window.location.href = "http://localhost:8080/register.html"
        console.log("register")
    })
}


