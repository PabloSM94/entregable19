import { MensajesDaoNoSQL } from "./MensajesDaoNoSQL.js";
import { MensajesDaoSQL } from "./MensajesDaoSQL.js";
import 'dotenv/config'

const tipomsj = process.env.MENS_PR

let dao
switch (tipomsj) {
    case 'SQL':
        dao = new MensajesDaoSQL()
        break;
    case 'NoSQL':
        dao = new MensajesDaoNoSQL()
        break;
    default:
        dao = new MensajesDaoNoSQL()
        break;
}

export default class MensajesDaoFactory{
    static getDao(){
        return dao
    }
}
