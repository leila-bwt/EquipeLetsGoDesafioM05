const knex = require("../conexao");
const {
  erroCampo,
  erroServidor,
  naoEncontrado,
  erroProduto,
} = require("../erro");

const listarPedido = async (req, res) => {
  const clienteID = Number(req.query.cliente_id);

  try {
    if (clienteID) {
      const consultarClienteID = await knex("clientes").where(
        "id",
        "=",
        clienteID
      );

      if (!consultarClienteID) {
        return res.status(404).json({
          mensagem: "O Id deste cliente não está cadastrado.",
        });
      }

      const retornarPedidosClienteID = await knex("pedidos").where(
        "cliente_id",
        "=",
        clienteID
      );

      if (retornarPedidosClienteID.length === 0) {
        return res.status(404).json({
          message: "Não existem pedidos cadastrados.",
        });
      }
      const todosOsPedidos = [];

      for (let pedido of retornarPedidosClienteID) {
        const pedidoProdutos = await knex("pedido_produtos").where(
          "pedido_id",
          pedido.id
        );

        todosOsPedidos.push({ pedido, pedidoProdutos });
      }
      return res.status(200).json(todosOsPedidos);
    }

    const pedidos = await knex("pedidos");
    return res.status(200).json(pedidos);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      mensagem: erroServidor,
    });
  }
};

module.exports = { listarPedido };
