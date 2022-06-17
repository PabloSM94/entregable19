export function mostrarProductos(input) {
    if (input.length == 0) {
        const renderTabla = Handlebars.compile(`<div class="alerta alert alert-warning" role="alert">
        No existen productos cargados
      </div>`);
        document.getElementById("listaProd").innerHTML = renderTabla();
    } else {
        const renderTabla = Handlebars.compile(`<h2>Listado de productos</h2>
        <div class="tabla">
        <table class="table">
          <thead class="table-light">
            <th>Producto</th>
            <th>Precio</th>
            <th>Imagen</th>
          </thead>
          <tbody>
            {{#each productos}}
            <tr>
            <td>{{this.title}}</td>
            <td>U$D {{this.price}}</td>
            <td><img src="{{this.thumbnail}}" alt="{{this.title}}" width="50px" height="50px"></td>
            </tr>
            {{/each}}
          </tbody>
        </table>
        </div>`);
        document.getElementById("listaProd").innerHTML = renderTabla({
            productos: input
        });
    }

}
function getLengthOfObject(obj) {
    let lengthOfObject = Object.keys(obj).length;
    return lengthOfObject;
}
export function mostrarMensajes(objetoDesnormalizado) {

    let mensajesParaMostrar = [];
    for (let i = 0; i < (getLengthOfObject(objetoDesnormalizado)); i++) {
        console.log(objetoDesnormalizado[i]);
        mensajesParaMostrar.push([`<li><p class="autor">${objetoDesnormalizado[i].author.id}</p> <p class="fecha">[${objetoDesnormalizado[i].timestamp}]:</p> <p class="texto">${objetoDesnormalizado[i].text}</p> </li>`]);
    }
    console.log(mensajesParaMostrar);
    // const mensajesParaMostrar = objetoDesnormalizado.map(({timestamp, idmsg, text})=>{
    //     return `<li><p class="autor">${idmsg}</p> <p class="fecha">[${timestamp}]:</p> <p class="texto">${text}</p> </li>`   
    // })
    const mensajesHTML = `
    <ul>
    <div>Mensajes</div>
    ${mensajesParaMostrar.join('\n')}
    </ul>
    `;
    const listaMensajes = document.getElementById("mensajes");
    listaMensajes.innerHTML = mensajesHTML;

    //    console.table(mensajesParaMostrar)
}
