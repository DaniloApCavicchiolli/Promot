const express = require('express')
const router = express.Router()
//express-validator = um auxiliador para fazer validações
const { check, validationResult } = require('express-validator') //Importação do express-validator
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
        // Equivale ao "Select * from" de um Banco de dados
        const produtos = await Produto
                                    .find({"status":"ativo"})//.find()= Filtrar os status e Traser somente os restaurantes que estão "ativo"
                                    .sort({nome: 1})//.sort({nome: 1}) ordenando pelo nome, "1" ordem ascendente e "-1" ordem descendente 
                                    //.populate("categoria", "nome")//.populate()= Popule a "categoria" trasendo o "nome" dela
        res.json(produtos)
    }catch (err) {
        res.status(500).send({
            errors: [{message: ' Não foi possível obter os produtos!'}]
        })
    }
})

/************************************************** 
 * Lista um produto pelo id
 * GET /produtos/:id
***************************************************/
//(:) = Quando é colocado dois pontos, ele intende que é um parametro que eu vou receber 
router.get('/:id', async(req, res) => {
    try {
        const produto = await Produto.findById(req.params.id)// findById() = Localiza pelo id 
        res.json(produto)
    }catch (err) {
        res.status(500).send({
            errors: [{message:  `Não foi possível obter o produto com o id ${req.params.id}`}]
        })
    }
})

// /************************************************** 
//  * Lista os produtos pelo id da categoria
//  * GET /produtos/categoria/:id
// ***************************************************/
// router.get('/categoria/:id', async(req, res) => {
//     try {
//         const produtos = await Produto //.find()= Filtrar a "categoria", estou recebendo via requisição(req) um parametro(params) chamado (id)
//                                     .find({"categoria":req.params.id})
//                                     .sort({nome: 1})//.sort({nome: 1}) ordenando pelo nome, "1" ordem ascendente e "-1" ordem descendente 
//                                     .populate("categoria", "nome")//.populate()= Popule a "categoria" trasendo o "nome" dela
//         res.json(produtos)
//     }catch (err) {
//         res.status(500).send({
//             errors: [{message:  `Não foi possível obter o produto com o id da categoria ${req.params.id}`}]
//         })
//     }
// })

/************************************************** 
 * Inclui um novo produto
 * POST /produtos
***************************************************/
const validaProduto = [
    check('nome').not().isEmpty().withMessage('Nome do produto é obrigatório'),

    check('status','Informe um status válido para o produto.').isIn(['ativo','inativo']),

    check('data_abastecimento').not().isEmpty().withMessage('A data de abastecimento do produto é obrigatório'),

    check('data_vencimento').not().isEmpty().withMessage('A data de vencimento do produto é obrigatório')

]


router.post('/', validaProduto, async(req, res) => {
    //Estou fazendo a validação dessa requisição
    const errors = validationResult(req)
    if(!errors.isEmpty()){ //Verifica se o array não está vazio
        return res.status(400).json({
            errors: errors.array()// exibe os erros
        })
    }
    
    try{
        let produto = new Produto(req.body)
        await produto.save()
        res.send(produto)
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao salvar o produto: ${err.message}`}]
        })
    }

})

/************************************************** 
 * Remove um produto
 * DELETE /produtos/:id
***************************************************/
router.delete('/:id', async(req, res) => {
    await Produto.findByIdAndRemove(req.params.id)
    .then(produto => {
        res.send({message: `Produto ${produto.nome} removido com sucesso! `})
    }).catch(err => {
        return res.status(500).send({
            errors: [{message: `Não foi possivel apagar o produto com o id: ${req.params.id}`}]
        })
    })
})

/************************************************** 
 * Edita o produto
 * PUT /produtos
***************************************************/
router.put('/', validaProduto, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body 
    await Produto.findByIdAndUpdate(req.body._id, {
        $set: dados
    }, {new: true})//true = mostra os dados que foram alterados
    .then(produto => {
        res.send({message: `Produto ${produto.nome} alterado com sucesso!`})
    }).catch (err => {
        return res.status(500).send({
            errors: [{message: `Não foi possível alterar o produto com o id: ${req.body._id}`}]
        })
    })
})

module.exports = router