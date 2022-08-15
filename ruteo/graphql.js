import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

import {
    cargarMensajes,
    guardarMensaje
} from '../servicio/mensajesController.js'


const schema = buildSchema(`
  input MensajeInput {
    id: Int
    nombre: String
    text: String
  }

  type Person{
    id: Int
    nombre: String
  }

  type Mensaje {
    author: Person
    text: String
  }
  type Mensajes{
    mensajes: String
  }
  type Query {
    cargarMensajes: Mensajes
  }
  type Mutation {
    guardarMensaje(datos: MensajeInput): Mensaje
  }
`)

const middlewareGraphQL = graphqlHTTP({
  schema,
  rootValue: {
    cargarMensajes,
    guardarMensaje
  },
  graphiql: true,
})

export { middlewareGraphQL }

//Consultas
//http://localhost:8080/graphql
//"query": "query { cargarMensajes {mensajes} }"
//"query": "mutation { guardarMensaje(datos: { id:1, nombre: \"Pablo\", text:\"Hola soy pablo\" }) { text }}"