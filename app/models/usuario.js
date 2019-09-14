const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const schemaUsuario = mongoose.Schema({
  nome: {
    type: String
  },
  email: String,
  senha: {
    type: String,
    required: true
  }
})

/*
schemaUsuario.pre('save', (next) => {
  
  //const usuario = this;
  //functions do mongoose
  //console("isModified: ",!usuario.isModified)
  //console("isNew: ",!usuario.isNew)

  if (!this.isModified || !usuario.isNew) {
    
    console.log('Erro ')
    next();
  
  } else {

    bcrypt.hash(this.senha, parseInt(process.env.BCRYPT_SALT_ROUNDS),   (err, hash) => {

      if (err) {
        console.log('erro ao incriptar: ', this.nome)
        next({ message: err.message })
      } else {
        console.log("hash: ",hash)
        this.nome = hash;
        next();
      }
    })
  }

})*/

//função do mongoose que é executada antes de 
schemaUsuario.pre('save', async function (next) {
  if (!Usuario.isModified || !Usuario.isNew) {
    const hash = await bcrypt.hash(this.senha, parseInt(process.env.BCRYPT_SALT_ROUNDS))/*Número de round que será encriptado */
    this.senha = hash;
    next();
  } else {
    next();
  }
})

//validation


//vamos criar um modelo
const Usuario = mongoose.model('Usuario', schemaUsuario, 'usuario')

module.exports = Usuario