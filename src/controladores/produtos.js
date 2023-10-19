const knex = require("../conexao");
const {
  erroCampo,
  erroServidor,
  naoEncontrado,
  erroProduto,
} = require("../erro");

const cadastrarProdutos = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
      return res.status(400).json({ mensagem: erroCampo });
    }

    const categoria = await knex("categorias").where("id", categoria_id);

    if (categoria.length === 0) {
      return res.status(400).json({ mensagem: naoEncontrado });
    }

    const produto = await knex("produtos").where({ descricao }).first();

    if (produto) {
      return res.status(400).json({ mensagem: erroProduto });
    }

    const novoProduto = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    if (!novoProduto) {
      return res.status(400).json({ mensagem: erroProduto });
    }

    return res.status(200).json(novoProduto[0]);
  } catch (erro) {
    return res.status(500).json({ mensagem: erroServidor });
  }
};

module.exports = {
  cadastrarProdutos,
};
