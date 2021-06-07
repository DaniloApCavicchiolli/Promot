const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Criando o Schema Produto
const ProdutoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['ativo','inativo'],
      default: 'ativo',
      required: true
    },
    valor: {
      type: String,
      required: true
    },
    quantidade: {
        type: String,
        required: true
      },
    data_abastecimento: {
        type: String,
        require: true
      },
    data_vencimento: {
          type: String,
          required: true
        }
  },{timestamps: true} // controlar data da criação e última alteração
)

module.exports = mongoose.model("produto", ProdutoSchema)