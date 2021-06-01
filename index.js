const express = require('express')
require('dotenv').config()//carrega as variáveis de ambiente
const InicializaMongoServer = require('./config/Db')
//Definindo as rotas da aplicação
const rotasProduto = require('./routes/Produto')
const rotasCategoria = require('./routes/Categoria')

//Inicializamos o servidor mongoDB
InicializaMongoServer()

const app = express()
//Porta Default
const PORT = process.env.PORT
//Parse consteudo JSON
app.use(express.json())

app.get('/', (req, res) => {
   res.json({mensagem: "Api Prod 100% funcional!",
                versao: '1.0.0'})
})

/* Rotas do Produto */
app.use('/produtos', rotasProduto)

/*Rotas da Categoria */
app.use('/categorias', rotasCategoria)

app.listen(PORT, (req, res) => {
    console.log(`Servidor web iniciado na porta ${PORT}`)
})//só para saber se está funcionando