const mongoose = require('mongoose')

const schemaCupomdesconto = mongoose.Schema({
  dataInicial: Date,
  dataFinal: Date,
  valorInicial: Number,
  valorFinal: Number,
  quantidadeCupons: Number,
  quantidadeUsada: Number,
  percentualDesconto: {
    type: Number,
    required: [true, 'Percentual de desconto requerido.']
  }

})

//vamos criar um modelo
const Cupomdesconto = mongoose.model('Cupomdesconto', schemaCupomdesconto, 'cupomdesconto')

module.exports = Cupomdesconto