import { renderizarFormulario } from "./form.js"
 const camposlog = [
    {nombreCampo: "Nombre", type:"text", name:"nombre"},
]



// const renderForm2 = Handlebars.compile(`<h2>Login</h2>
//     <br>
//     <div class="principal">
//         <form class="row gx-4 gy-4">
//             {{#each productos}}
//             <div class="entradas col-md-4">
//                 <input id="input{{this.name}}" class="form-control" type="{{this.type}}" name="{{this.name}}" placeholder="{{this.nombreCampo}}">
//             </div>
//             {{/each}}
//             <br>
//             <div>
//                 <button id="botonLogin" class="btn btn-primary">Login</button>
//             </div>
//         </form>
//     </div>`)



fetch('/log')
.then(res => res.json())
.then(data => {
    if(data.status !== "ok"){
        console.log("ok renderizar")
    
    }
    else{
    const renderForm = Handlebars.compile(`
    <h1>API de Productos</h1>
    
    <div id="insForm"></div>
    <br>
    <div id="listaProd"></div>
    <br>
    <div id="chat"></div>


    <script type="module" src="js/form.js"></script>
    <script type="module" src="js/chat.js"></script>
    <script type="module" src="js/index.js"></script>
    `)
    document.getElementById(`body`).innerHTML = renderForm({})   
        const botonLogout = document.getElementById("botonLogout")
        botonLogout.addEventListener("click",e=>{
            
            fetch('/logout')
            .then(res => res.json())
            .then(data => {
                if (data.status === "ok"){
                    alert(data.msg)
                }else{
                    alert("Logout invalido")
                }
            })
        })   
    }
    
    const botonLogin = document.getElementById("botonLogin")

botonLogin.addEventListener("click", e=>{
    e.preventDefault()
    const inputNombre = document.getElementById("inputnombre")
    fetch(`/login?name=${inputNombre.value}`)
    .then(res => res.json())
    .then(data => {
        alert(`Bienvenido ${data.name}`)
        const renderForm2 = Handlebars.compile(`<h2>Bienvenido ${data.name}</h2>
        <br>
        <div class="principal">
            <form class="row gx-4 gy-4">
                <div>
                    <button id="botonLogout" class="btn btn-primary">Logout</button>
                </div>
            </form>
        </div>`)
        document.getElementById("login").innerHTML = renderForm2({})
        const botonLogout = document.getElementById("botonLogout")
        botonLogout.addEventListener("click",e=>{
            
            fetch('/logout')
            .then(res => res.json())
            .then(data => {
                if (data.status === "ok"){
                    alert(data.msg)
                }else{
                    alert("Logout invalido")
                }
            })
        })   
    })


})
} 
    )


    
    