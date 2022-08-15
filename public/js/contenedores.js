export const buildMensaje = class {
    #id
    #nombre
    #text
    constructor(id,nombre,text){
        this.#id = id
        this.#nombre = nombre

        this.#text = text
        
   
    }
    get id() { return this.#id }

    set id(id){
        if (isNaN(id)) throw new Error('"Id" debe ser numérico')
    }
    
    get nombre() { return this.#nombre }

    set nombre(nombre){
        if (!nombre) throw new Error('"nombre" es un campo requerido')
    }
    
    get text() { return this.#text }

    set text(text){
        if (!text) throw new Error('"text" es un campo requerido')
    }
    
    mensaje(){
        return Object.freeze(JSON.parse(JSON.stringify(
            {
                author: {
                    id: this.#id,
                    nombre: this.#nombre,
                },
                text: this.#text
            }
        )))
    }
}

export const cObjeto = class {
    constructor (title, price, thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}