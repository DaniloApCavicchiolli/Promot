const mongoose = require('mongoose') //Para fazer a conexão com o banco de dados

// Creinado o Schema Categoria
// Schema é como se fosse uma "Tabela" no banco de dados
const CategoriaSchema = mongoose.Schema({
    nome: {
        type: String,
        unique: true //Criamos um indice unico, eu não quero ter duas categorias com o mesmo nome
    },
    status: {
        type: String,
        enum: ['ativo','inativo'],
        default: 'ativo'
    },
    //timestamps= vai controlar a data da inclusão(Criação) e a data da ultima alteração do registro
}, {timestamps: true})

//Exportando e quando for criado a conexão, estou dizendo para ele ir no MongoDB e criar um modelo com o nome de 'categoria', 
//usando a estrutura do eschema "CategoriaSchema"
module.exports = mongoose.model('categoria', CategoriaSchema)