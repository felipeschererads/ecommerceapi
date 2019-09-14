const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports = {

  adicionar: (req, res) => {
    const { nome, senha, email } = req.body;
    const usuario = new Usuario({ nome, senha, email })

    //validação manual
    //formçar a execução do mongoose validation
    const error = usuario.validateSync();

    if (error) {
      res.status(400).json(error);
    } else {
      usuario.save((error, novoUsuario) => {
        if (error) {
          res.status(500).json(error)
        } else {
          res.status(201).json(novoUsuario)
        }
      })
    }

  },

  login: (req, res) => {
    const { nome, senha } = req.body;
    Usuario.findOne({ nome }, (err, usuario) => {
      if (!err && usuario) {

        bcrypt.compare(senha, usuario.senha, (err, math) => {
          if (math) {
            /**criação do token */

            const payload = { usuario: usuario.nome };
            const secret = process.env.JWT_SECRET;
            const header = { expiresIn: 300 , issuer: 'http://upf.br'};

            const token = jwt.sign(payload, secret, header);

            res.status(200).json({
              result: usuario,
              token: token
            })


          } else {
            res.status(401).json({ message: 'Senha informada não confere.' })
          }
        })

      } else {
        res.status(404).json({ message: 'usuário não encontrado.' })
      }
    })
  },
  listarTodos: (req, res) => {
    //testar o acesso que o usuário tem
    const payload = req.decoded;

    console.log('payload: ', payload)
    if(payload && payload.usuario == 'felipescherer5'){
      

    Usuario.find((err, usuario) => {
      if (err) {
        res.status(502).json({ message: err })
      }else{
        res.status(200).json(usuario)
      }
    })
  }else{

    res.status(401).json({message: 'usuário não autorizado'})

  }

  }

}