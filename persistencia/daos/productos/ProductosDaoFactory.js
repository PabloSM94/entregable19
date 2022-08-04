import { ProductosDaoFaker } from "./ProductosDaoFaker.js";
import { ProductosDaoSQL } from "./ProductosDaoSQL.js";
import 'dotenv/config'

const tipo = process.env.PROD_PR

let dao
switch (tipo) {
    case 'SQL':
        dao = new ProductosDaoSQL()
        break;
    case 'Faker':
        dao = new ProductosDaoFaker()
        break;
    default:
        dao = new ProductosDaoFaker()
        break;
}

export default class ProductosDaoFactory{
    static getDao(){
        return dao
    }
}
