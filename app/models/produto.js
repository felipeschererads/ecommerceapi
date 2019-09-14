const mongoose = require('mongoose')

const schemaProduto = mongoose.Schema({
  nome: {
    type: String,
    minlength: [3,`A quantidade mínima de caracteres é {MIN}`],
    maxlength: [60,`A quantidade máxima de caracteres é {MAX}`],
    require: [true,'O nome é obrigatório'],
  },
  preco: {
    type: Number,
    min: 0
  },
  descricao: {
    type: String,
    maxlength: 200,  
  },
  quantidadeEstoque: {
    type: Number,
    default: 0
  }

})

//vamos criar um modelo
const Produto = mongoose.model('Produto', schemaProduto, 'produto')

module.exports = Produto