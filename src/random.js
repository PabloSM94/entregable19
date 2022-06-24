process.on('message', data =>{
    let miarray = Array.from({length: data}, () => Math.floor(Math.random() * 10))
    console.log(miarray)
    let repetidos = {};
    miarray.forEach(function(numero){
  repetidos[numero] = (repetidos[numero] || 0) + 1;
})
    console.log(repetidos)
    process.send(repetidos)
    process.exit()
})

process.send("Listo para recibir")