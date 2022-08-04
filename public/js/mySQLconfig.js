const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'test'
    }
}

const optionsSQLite = {
    client: 'sqlite3',
    connection: {filename: "c:/Users/54297/Desktop/Backend/Entregable 18/db/ecommerce.sqlite"},
    useNullAsDefault: true
}

export  {
    options,
    optionsSQLite
}