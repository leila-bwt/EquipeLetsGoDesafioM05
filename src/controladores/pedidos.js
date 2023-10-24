const knex = require("../conexao");
const {
  erroCampo,
  erroServidor,
  naoEncontrado,
  erroProduto,
} = require("../erro");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    if (!cliente_id || !observacao || !pedido_produtos) {
      return res.status(400).json({ mensagem: erroCampo });
    }

    const cliente = await knex("clientes").where("id", cliente_id);

    if (!cliente) {
      return res.status(400).json({ mensagem: naoEncontrado });
    }

    const produtosId = pedido_produtos.map((produto) => produto.produto_id); // pega o id dos produtos do pedido

    const produtos = await knex("produtos").whereIn("id", produtosId); // verifica se os produtos existem no banco de dados

    if (produtosId.length !== produtos.length) {
      return res.status(400).json({ mensagem: naoEncontrado });
    } // verifica estoque

    for (const produto of pedido_produtos) {
      const produtoExistente = produtos.find(
        (item) => item.id === produto.produto_id
      ); // verifica se o produto existe

      if (
        !produtoExistente ||
        produtoExistente.quantidade_estoque < produto.quantidade_produto
      ) {
        return res.status(400).json({ mensagem: erroProduto });
      }
    }

    const novoPedido = await knex("pedidos")
      .insert({
        cliente_id,
        observacao,
     })
      .returning('*');
      

    if (!novoPedido) {
      return res.status(400).json({ mensagem: erroServidor });
    }console.log(novoPedido)

    for (const produto of pedido_produtos) {
      await knex("pedidos_produtos").insert({
        pedido_id: novoPedido[0].id,
        produto_id: produto.produto_id,
        quantidade_produto: produto.quantidade_produto,
      });

    }
    return res.status(200).json(novoPedido[0]);
  } catch (erro) {
    return res.status(500).json({ mensagem: erroServidor });
  }
};

module.exports = {
  cadastrarPedido,
};
