const express = require('express')
const router = express.Router()
//express-validator = um auxiliador para fazer validações
//const { check, validationResult } = require('express-validator') //Importação do express-validator
const Categoria = require('../model/Categoria')

/************************************************** 
 * Lista todas as categorias
 * GET /categorias
***************************************************/
//Códigos de erros:
//200 - Quando deu tudo certo
//404 - Quando o erro esta no client EX:(o client está requisitando algo que não existe)
//500 - Quando o erro é do lado do servidor
router.get('/', async(req, res) => {
    try {
        const categorias = await Categoria.find({"status":"ativo"}).sort({nome: 1})
        res.json(categorias)
    }catch (err) {
        res.status(500).send({
            errors: [{message: ' Não foi possível obter as categorias!'}]
        })
    }
})


module.exports = router