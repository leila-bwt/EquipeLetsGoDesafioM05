const knex = require("../conexao");
const { erroCampo, erroServidor, naoEncontrado } = require("../erro");

const cadastrarProdutos = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  const { usuario } = req;

  try {
    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
      console.log(erro.message);
      return res.status(400).json({ mensagem: erroCampo });
    }

    const categoria = await knex("categorias")
      .where({ id: categoria_id })
      .first();

      if(!categoria){
          return res.status(400).json({mensagem: "Categoria não encontrada"})
      }

    const produto = await knex("produtos").where({ descricao }).first();

    if (produto) {
      return res.status(400).json({ mensagem: naoEncontrado });
    }

    const novoProduto = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        usuario_id: usuario.id,
      })
      .returning("*");

    if (!novoProduto) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar o produto" });
    }

    return res.status(200).json(novoProduto[0]);
  } catch (erro) {
    console.log(erro.message);
    return res.status(500).json(erroServidor);
  }
};

module.exports = {
  cadastrarProdutos,
};
