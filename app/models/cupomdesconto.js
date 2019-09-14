const mongoose = require('mongoose')

function validarDataMaior(dataInformada) {
  return new Date(dataInformada) > new Date();
}

const enumTipo = {
  values: ['DESCONTO', 'FRETE GRÁTIS', 'PROMOCIONAL'],
  message: `{TIPO} não definido.`
}


const schemaCupomdesconto = mongoose.Schema({
  dataInicial: {
    type: Date
  },
  dataFinal: {
    type: Date,
    validate: [validarDataMaior, () => {
      return (new Date(this.dataFinal) > new Date(this.dataFinal))
    }, `Data inicial deve ser maior que a final`]
  },
  valorInicial: Number,
  valorFinal: Number,
  quantidadeCupons: {
    type: Number,
    min: [0, `A quantidade {VALUE} mínima deve ser maior que {MIN}`],
    max: 999
  },
  quantidadeUsada: Number,
  percentualDesconto: {
    type: Number,
    required: [true, 'Percentual de desconto requerido.']
  },
  tipo: {
    type: String,
    enum: enumTipo,
    /* enum: ['DESCONTO','FRETE GRÁTIS','PROMOCIONAL'],*/
    trim: true
  }
  /**Considera os atributos desconhecidos que o usuário passar por parâmetro*/
  /*},{strict:false})*/
  /**Retorna erro caso seja passado um parâmetro que não existe no contexto */
})

/**pre save */
schemaCupomdesconto.pre('save', (next) => {
if(!this.tipo){
  this.tipo = enumTipo.values[0]
}


  next();
})


schemaCupomdesconto.path('dataInicial').validate(validarDataMaior, `Data informada {VALUE} para o campo {PATH} deve ser maior que a data corrente.`)

//vamos criar um modelo
const Cupomdesconto = mongoose.model('Cupomdesconto', schemaCupomdesconto, 'cupomdesconto')

module.exports = Cupomdesconto