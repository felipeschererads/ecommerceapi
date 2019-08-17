const mongoose = require('mongoose')

const schemaProduto = mongoose.Schema({
  nome: String,
  preco: Number,
  descricao: String,
  quantidadeEstoque: Number

})

//vamos criar um modelo
const Produto = mongoose.model('Produto', schemaProduto, 'produto')

module.exports = Produto