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
    categoria: {
      type: Schema.Types.ObjectId, 
      ref: 'categoria',
      required: true
    },
    valor: {
      type: Number,
      required: true
    },
    quantidade: {
        type: Number,
        required: true
      },
    data_abastecimento: {
        type: Date,
        require: true
      },
    data_vencimento: {
          type: Date,
          required: true
        }
  },{timestamps: true} // controlar data da criação e última alteração
)

module.exports = mongoose.model("produto", ProdutoSchema)