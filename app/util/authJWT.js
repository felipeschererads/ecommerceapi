const jwt = require('jsonwebtoken')


module.exports = {

  validadorToken: (req, res, next) => {

    const tokenAutorizacao = req.headers.authorization;

    let payload;

    if (tokenAutorizacao) {
      const token = tokenAutorizacao.split(' ')[1]; //bearer token
      const header = { espiriesIn: 300, issuer: 'http://upf.br' };

      try {

        payload = jwt.verify(token, process.env.JWT_SECRET, header)
        //devolver o token decodificado para o objeto de solicitação
        req.decoded = payload;
        next();

      } catch (error) {
        res.status(401).json({message: error})
      }

    } else {
      res.status(401).json({message: 'Não está autorizado. token Requerido'})
    }
  }
}