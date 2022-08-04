import { ProductosDao } from "./ProductosDao.js";
import {generarProducto} from '../../../faker/generadordeProductos.js'

class ProductosDaoFaker extends ProductosDao{
    constructor(){
        super()
    }
    async verProductos(){
        let productos = []
        for (let i=1;i<=5;i++){
            productos.push(await generarProducto(i))
        }
        return productos 
    }
    
    async nuevoProducto(producto){
        console.log("Se creo nuevo producto")
    }
}

export { ProductosDaoFaker }