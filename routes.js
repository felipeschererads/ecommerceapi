

const cupomDescontoCon = require('./app/controllers/cupomdesconto')
const produtoCon = require('./app/controllers/produto')

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

  return ecommerceRouter;
}