const Produto = require('../models/produto')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

module.exports = {

  listarTudo: (req, res) => {
    //obter os usuarios cadastrados no banco de dados mongo
    Produto.find((erro, produtos) => {
      if (erro) {
        res.send('Erro ao recuperar os produtos: ', erro)
      } else {
        res.json(produtos)
      }
    })
  },
  adicionar: (req, res) => {
    let produto = new Produto(req.body);

    produto.save((erro) => {
      if (erro) {
        res.send('Erro ao salvar o produto: ' + erro)
      } else {
        res.json({ message: 'Produto cadastrado' })

      }
    })
  },
  listarUm: (req, res) => {

    Produto.findById(ObjectId(req.params.produtos_id), (error, produto) => {
      if (error) {
        res.send(`Erro ao recuperar o produto ${error}`)
      } else if (produto) {
        res.json(produto)
      } else {
        res.json({ massage: `Id do produto não localizado`, id: req.param.produtos_id })
      }
    })
  },
  alterar: (req, res) => {
    //REcupera o objeto para aalterar
    Produto.findById(ObjectId(req.params.produtos_id), (error, produto) => {
      if (error) {
        res.send(`Produto não localizado ${error}`)
      } else if (produto) {

        //já podemos alterar o cupom
        let produto = new Produto(req.body);

        //persistir 
        produto.save((erro) => {
          if (erro) {
            res.send(`Erro ao gravar o produto ${error}`)
          }
          res.json({ message: 'Produto atualizado com sucesso' })
        })
      } else {
        res.json({ massage: `Id do produto não localizado`, id: req.param.produtos_id })
      }

    })
  },
  excluir: (req, res) => {

    let id = req.params.produtos_id

    Produto.deleteOne({ _id: ObjectId(id) }, (error, resultado) => {
      if (error) {
        res.send(`Erro ao excluir o produto ${error}`)

      } else if (resultado.n === 0) {
        res.json({ message: 'Produto informado não existe' })

      } else {
        res.json({ message: 'Produto excluído com sucesso' })

      }
    })
  },
  alterarParcial: (req, res) => {

    let id = req.params.produtos_id
    let produto = req.body;

    Produto.updateOne({ _id: ObjectId(id) }, { $set: produto }, (error) => {
      if (error) {
        res.send(`Erro ao alterar o produto ${error}`)

      } else {
        res.json({ message: 'Produto atualizado com sucesso' })

      }
    })
  }

}