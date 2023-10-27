const knex = require("../conexao");
const {
  erroCampo,
  erroServidor,
  naoEncontrado,
  erroProduto,
} = require("../erro");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;
  const valorTotal = [];
  let soma = 0;

  try {
    if (!cliente_id || !observacao || !pedido_produtos) {
        return res.status(400).json({ mensagem: erroCampo });
    }

    const cliente = await knex("clientes").where("id", cliente_id);

    if (!cliente) {
        return res.status(400).json({ mensagem: naoEncontrado });
    }

    for (let i = 0; i < pedido_produtos.length; i++) {
      let produtosExistentes = await knex("produtos").where("id", pedido_produtos[i].produto_id);
  
      if(produtosExistentes.length === 0){
        return res.status(400).json({ mensagem: naoEncontrado });
      }

      if(produtosExistentes[0].quantidade_estoque <= pedido_produtos[i].quantidade_produto){
        return res.status(400).json({ mensagem: erroProduto});
      }

      soma += (produtosExistentes[0].valor * pedido_produtos[i].quantidade_produto)
        console.log(cliente.id)

      
    }

    const novoPedido = await knex("pedidos")
      .insert({
          cliente_id,
          observacao,
          valor_total: soma,
      })
      .returning('*');

    return res.status(201).json(novoPedido[0]);

  } catch (erro) {
    return res.status(500).json({ mensagem: erroServidor });
  }

};

module.exports = {
  cadastrarPedido,
};
