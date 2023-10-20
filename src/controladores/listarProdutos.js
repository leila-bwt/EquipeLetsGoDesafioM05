const knex = require("../conexao");
const {
  erroCampo,
  erroServidor,
  naoEncontrado,
  erroProduto,
} = require("../erro");

const listarProdutos = async (req, res) => {
  const categoriaId = Number(req.query.categoria_id);

  try {
    if (categoriaId) {
      const consultarCategoria = await knex("produtos").where(
        "categoria_id",
        "=",
        categoriaId
      );

      if (!consultarCategoria) {
        return res.status(404).json({
          mensagem: "A categoria do produto não existe.",
        });
      }

      const listarProdutosPorCategoria = await knex("produtos")
        .where("categoria_id", "=", categoriaId)
        .select("*");

      if (listarProdutosPorCategoria.length === 0) {
        return res.status(404).json({
          message: "Não existem produtos cadastrados nesta categoria.",
        });
      }
      return res.status(200).json(listarProdutosPorCategoria);
    }

    const listaDeProdutos = await knex("produtos").select("*");

    if (listaDeProdutos.length === 0) {
      return res
        .status(404)
        .json({ message: "Não existem produtos cadastrados." });
    }

    return res.status(200).json(listaDeProdutos);
  } catch (error) {
    return res.status(400).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};

module.exports = { listarProdutos };
