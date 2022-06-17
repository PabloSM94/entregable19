//  //ejecución de handlebars
//  const campos = [
//     {nombreCampo: "Nombre Producto", type:"text", name:"title"},
//     {nombreCampo: "Precio", type:"number", name:"price"},
//     {nombreCampo: "URL Imagen", type:"text", name:"thumbnail"}
// ]

export function renderizarFormulario(campos,title,id){
    const renderForm = Handlebars.compile(`<h2>${title}</h2>
    <br>
    <div class="principal">
        <form class="row gx-4 gy-4">
            {{#each productos}}
            <div class="entradas col-md-4">
                <input id="input{{this.name}}" class="form-control" type="{{this.type}}" name="{{this.name}}" placeholder="{{this.nombreCampo}}">
            </div>
            {{/each}}
            <br>
            <div class="col-12 justify-items-center">
                <button id="boton${title}" class="btn btn-primary">${title}</button>
            </div>
        </form>
    </div>`)
document.getElementById(`${id}`).innerHTML = renderForm({
    productos: campos
})   
}
