const express = require('express')
require('dotenv').config()//carrega as variáveis de ambiente
const InicializaMongoServer = require('./config/Db')
//Definindo as rotas da aplicação
const rotasProduto = require('./routes/Produto')
const rotasCategoria = require('./routes/Categoria')

//Inicializamos o servidor mongoDB
InicializaMongoServer()

const app = express()

//Removendo por seguraça
app.disable('x-powered-by')
//Porta Default
const PORT = process.env.PORT

/* Middleware do Express*/
 // Ficará entre a "requisição" e a "resposta" observando
 // next = É para ele continuar ou não
 app.use(function(req, res, next) {
    // Em produção, remova o * e atualize com o dominio/ip do seu app
    // * = permite que qualquer origem acesse o meu servidor
    res.setHeader('Access-Control-Allow-Origin', '*')//Consulta de qualquer origem
    //Cabeçalhos que serão permitodos
    //Exemplo: res.setHeader('Access-Control-Allow-Headers', "Content-Type, Accept(imagem), access-token")
    res.setHeader('Access-Control-Allow-Headers', "*")//De qualquer cabeçalho
    //Métodos que serão permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')//Usando todos os métodos
    //Após passar por todos usa o "next()", para ele continuar 
    next()
 })

//Parse consteudo JSON
app.use(express.json())

app.get('/', (req, res) => {
   res.json({mensagem: "Api Prod 100% funcional!",
                versao: '1.0.0'})
})

/*Rotas da Categoria */
app.use('/categorias', rotasCategoria)

/* Rotas do Produto */
app.use('/produtos', rotasProduto)

/* Rotas para tratar exceções */
app.use(function(req, res) {
    res.status(404).json({message: `A rota ${req.originalUrl} não existe!`})
})

app.listen(PORT, (req, res) => {
    console.log(`Servidor web iniciado na porta ${PORT}`)
})//só para saber se está funcionando