// Aqui será feito a conexão com o banco de dados 
const mongoose = require('mongoose')

const MONGOURI = process.env.MONGODB_URL

//Função assíncrona, porque vai aguardar ele tentar conectar através dessa URi
const InicializaMongoServer = async() => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,   //Forçamos a utilizar o ultimo parse de URL. Digo que é uma URL válida
            useCreateIndex: true,    //Qdo necessário, utilizará a criação de indices, caso eu tenha pedido
            useFindAndModify: false, //O padrão é econtrar os registros e alterar todos. False= para ele não alterar todos os registros
            useUnifiedTopology: true //Utilizamos a engine para descoberta de servidores
        })
        console.log("⚡Conectado ao mongoDB!!!")
    } catch (e){
        console.error(e)
        throw e //mostrará os detalhes do erro
    }
}

module.exports = InicializaMongoServer