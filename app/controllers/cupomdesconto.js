const Cupomdesconto = require('../models/cupomdesconto')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

module.exports = {

  listarTudo: (req, res) => {
    //obter os usuarios cadastrados no banco de dados mongo
    Cupomdesconto.find((erro, cupons) => {
      if (erro) {
        res.status(502).json({ message: 'Erro ao recuperar os cupons ' + erro })
      } else {

        res.statusCode = 200;
        res.json(cupons)

      }
    })
  },


  adicionar: (req, res) => {

    let cupomDesconto;

    try {

      cupomDesconto = new Cupomdesconto(req.body);

    } catch (e) {
      //usuário mandou algo ilegal para aplicaçao
      res.status(400).json(e)
      return;
    }

    /*cupomDesconto.dataInicial = req.body.dataInicial
    cupomDesconto.dataFinal =  req.body.dataFinal
    cupomDesconto.valorInicial =  req.body.valorInicial
    cupomDesconto.valorFinal =  req.body.valorFinal
    cupomDesconto.quantidadeCupons = req.body.quantidadeCupons
    cupomDesconto.quantidadeUsada = req.body.quantidadeUsada
    cupomDesconto.percentualDesconto =  req.body.percentualDesconto*/

    const erro = cupomDesconto.validateSync()

    if (erro) {
      console.log("")
      res.status(400).json(erro)
      return;
    }

    cupomDesconto.save((erro) => {
      if (erro) {
        res.status(500).json(erro)
      } else {
        res.status(201).json({ message: 'Cupom cadastrado' })

      }
    })
  },
  listarUm: (req, res) => {
    if(!ObjectId.isValid(req.params.cupons_id)){
      res.status(400).json({
        message: 'Código inválido'
      })
      return
    }

    Cupomdesconto.findById(ObjectId(req.params.cupons_id), (error, cupomDesconto) => {
      if (error) {
        res.status(502).json(error)
      } else if (cupomDesconto) {

        let url = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.status(200).json(cupomDesconto, [
          { rel: "altear", href: url, method: "PUT" },
          { rel: "deletar", href: url, method: "DELETE", title: "excluir cupom de desconto" }
        ])

      } else {
        res.status(202).json({ massage: `Id do cupom não localizado`, id: req.param.cupons_id })
      }
    })
  },
  alterar: (req, res) => {
    //REcupera o objeto para aalterar
    Cupomdesconto.findById(ObjectId(req.params.cupons_id), (error, cupomDesconto) => {
      if (error) {
        res.status(502).json(error)
      } else if (cupomDesconto) {

        //já podemos alterar o cupom
        let cupomDesconto = new Cupomdesconto(req.body);

        //persistir 
        cupomDesconto.save((erro) => {
          if (erro) {
            res.status(500).json(error)
          } else {
            res.status(200).json({ message: 'Cupom atualizado com sucesso' })
          }
        })
      } else {
        res.status(204).json({ massage: `Id do cupom não localizado`, id: req.param.cupons_id })
      }

    })
  },
  excluir: (req, res) => {

    let id = req.params.cupons_id

    Cupomdesconto.deleteOne({ _id: ObjectId(id) }, (error, resultado) => {
      if (error) {
        res.status(409).json(error)

      } else if (resultado.n === 0) {
        res.status(202).json({ message: 'Cupom informado não existe' })

      } else {
        res.status(200).json({ message: 'Cupom excluído com sucesso' })

      }
    })
  },
  alterarParcial: (req, res) => {

    let id = req.params.cupons_id
    let cupomDesconto = req.body;

    const options = {runValidators: true};

    Cupomdesconto.updateOne({ _id: ObjectId(id) }, { $set: cupomDesconto },options, (error) => {
      if (error) {
        res.status(400).json(error)

      } else {
        res.status(200).json({ message: 'Cupom atualizado com sucesso' })

      }
    })
  }

}