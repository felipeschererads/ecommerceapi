const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

const port = 3000
const Usuario = require('./app/models/usuario')
const Cupomdesconto = require('./app/models/cupomdesconto')

mongoose.connect('mongodb+srv://usrmongo:VsUERQhgdofSkrb5@cluster0-ejp7j.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true })

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

/*
usrmongo
VsUERQhgdofSkrb5
*/

//midwhere toda requisição passará aqui
app.use((req, res, next) => {
  console.log('algo está acontecendo aqui: ', req.url)
  //garantir que o proximo comando seja executado
  next()
})

app.get('/usuarios', (req, res) => {
  //obter os usuarios cadastrados no banco de dados mongo
  Usuario.find((erro, usuarios) => {
    if (erro) {
      res.send('Erro ao recuperar os usuaários: ', erro)
    } else {
      res.json(usuarios)
    }
  })
})

app.post('/cupons', (req, res) => {

  let cupomDesconto = new Cupomdesconto(req.body);

  /*cupomDesconto.dataInicial = req.body.dataInicial
  cupomDesconto.dataFinal =  req.body.dataFinal
  cupomDesconto.valorInicial =  req.body.valorInicial
  cupomDesconto.valorFinal =  req.body.valorFinal
  cupomDesconto.quantidadeCupons = req.body.quantidadeCupons
  cupomDesconto.quantidadeUsada = req.body.quantidadeUsada
  cupomDesconto.percentualDesconto =  req.body.percentualDesconto*/

  cupomDesconto.save((erro)=>{
    if(erro){
      res.send('Erro ao salvar o cupom: '+ erro)
    }else{
      res.json({message: 'Cupom cadastrado'})

    }
  })
})

app.get('/cupons', (req, res) => {
  //obter os usuarios cadastrados no banco de dados mongo
  Cupomdesconto.find((erro, cupons) => {
    if (erro) {
      res.send('Erro ao recuperar os usuaários: ', erro)
    } else {
      res.json(cupons)
    }
  })
})


app.get('/', (req, res) => {
  res.send('Seja bem vindo a nossa loja virtual')
})

app.listen(port, (req, res) => {
  console.log('servidor inicializado na porta ', port)
})