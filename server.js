require('dotenv-safe').config();

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const ecommerceRouter = express.Router();
const routes = require('./routes')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const Usuario = require('./app/models/usuario')
const hateoasLink = require('express-hateoas-links')


mongoose.connect('mongodb+srv://usrmongo:VsUERQhgdofSkrb5@cluster0-ejp7j.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true ,useCreateIndex:true})

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(hateoasLink)

app.use('/ecommerce',routes(ecommerceRouter))
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



ecommerceRouter.get('/usuarios', (req, res) => {
  //obter os usuarios cadastrados no banco de dados mongo
  Usuario.find((erro, usuarios) => {
    if (erro) {
      res.send('Erro ao recuperar os usuaários: ', erro)
    } else {
      res.json(usuarios)
    }
  })
})




ecommerceRouter.get('/', (req, res) => {
  res.send('Seja bem vindo a nossa loja virtual')
})

app.listen(port, (req, res) => {
  console.log('servidor inicializado na porta ', port)
})



/******************************************************************** */

