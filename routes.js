const cupomDescontoCon = require('./app/controllers/cupomdesconto')
const produtoCon = require('./app/controllers/produto')
const usuario = require('./app/controllers/usuario');
const validadorToken = require('./app/util/authJWT').validadorToken

module.exports = (ecommerceRouter) => {

  ecommerceRouter.route('/cupons')
    .post(cupomDescontoCon.adicionar)
    .get(cupomDescontoCon.listarTudo)

  ecommerceRouter.route('/cupons/:cupons_id')
    .get(cupomDescontoCon.listarUm)
    .put(cupomDescontoCon.alterar)
    .patch(cupomDescontoCon.alterarParcial)
    .delete(cupomDescontoCon.excluir)

  ecommerceRouter.route('/produtos')
    .post(produtoCon.adicionar)
    .get(produtoCon.listarTudo)

  ecommerceRouter.route('/produtos/:produtos_id')
    .get(produtoCon.listarUm)
    .put(produtoCon.alterar)
    .patch(produtoCon.alterarParcial)
    .delete(produtoCon.excluir)

  ecommerceRouter.route('/usuarios')
    .post(usuario.adicionar)
    .get(validadorToken, usuario.listarTodos)

  ecommerceRouter.route('/login')
    .post(usuario.login)


  return ecommerceRouter;
}