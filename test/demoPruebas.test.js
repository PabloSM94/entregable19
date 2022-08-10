import axios from 'axios'

describe('Comportamiento del servidor',()=>{
    describe('Comportamiento de productos',()=>{
        describe('Si pido todos los productos',()=>{
            it('Deberia traer todos los productos',async ()=>{
                const response = await axios.get('http://localhost:8080/api/productos-test')
                const productos = response.data
                if (!productos) throw new Error('No se recibieron productos')
            })
        })
    })
    describe('Comportamiento de registro',()=>{
        describe('Si registro un usuario existente',()=>{
            it('Deberia no registrarse, lanzando un status "error"',async ()=>{
                const response = await axios.post('http://localhost:8080/api/registro/register',{username: 'username1@gmail.com', password:'123pass'})
                if(response.data.status !== 'error') throw new Error('El usuario ya esta registrado')
            })
        })
        describe('Si registro un usuario nuevo (no existente)',()=>{
            it('Deberia registrarse satisfactoriamente, lanzando un status "ok"', async()=>{
                const response = await axios.post('http://localhost:8080/api/registro/register',{username: `user${Math.random()}${Math.random()}${Math.random()}@gmail.com`, password:'123pass'})
                if(response.data.status !== 'ok') throw new Error('El usuario ya esta registrado')
            })
        })
    })
})

//Resultado
// Comportamiento del servidor
// Comportamiento de productos
//   Si pido todos los productos
//     ✔ Deberia traer todos los productos
// Comportamiento de registro
//   Si registro un usuario existente
//     ✔ Deberia no registrarse, lanzando un status "error" (100ms)
//   Si registro un usuario nuevo (no existente)
//     ✔ Deberia registrarse satisfactoriamente, lanzando un status "ok" (876ms)


// 3 passing (1s)
