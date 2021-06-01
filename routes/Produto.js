const express = require('express')
const router = express.Router()
//express-validator = um auxiliador para fazer validações
//const { check, validationResult } = require('express-validator') //Importação do express-validator
const Produto = require('../model/Produto')

/************************************************** 
 * Lista todos os produtos
 * GET /produtos
***************************************************/
//Códigos de erros:
//200 - Quando deu tudo certo
//404 - Quando o erro esta no clint EX:(o client está requisitando algo que não existe)
//500 - Quando o erro é do lado do servidor
router.get('/', async(req, res) => {
    try {
        const produtos = await Produto
                                    .find({"status":"ativo"})//.find()= Filtrar os status e Traser somente os produtos que estão "ativo"
                                    .sort({nome: 1})//.sort({nome: 1}) ordenando pelo nome, "1" ordem ascendente e "-1" ordem descendente 
                                    .populate("categoria", "nome")//.populate()= Popule a "categoria" trasendo o "nome" dela
        res.json(produtos)
    }catch (err) {
        res.status(500).send({
            errors: [{message: ' Não foi possível obter os produtos!'}]
        })
    }
})


module.exports = router