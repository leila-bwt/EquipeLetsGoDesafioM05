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

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
      return res.status(400).json({ mensagem: erroCampo });
    }

    const produtoExistente = await knex("produtos").where("id", id);

    if (produtoExistente.length === 0) {
      return res.status(404).json({ mensagem: naoEncontrado });
    }

    const categoriaExistente = await knex("categorias").where(
      "id",
      categoria_id
    );

    if (categoriaExistente.length === 0) {
      return res.status(404).json({ mensagem: naoEncontrado });
    }

    const produtoAtualizado = await knex("produtos")
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .where("id", id);

    if (!produtoAtualizado) {
      return res.status(400).json({ mensagem: erroProduto });
    }

    return res.status(200).json({ mensagem: "Produto atualizado com sucesso!" });

  } catch (erro) {
    return res.status(500).json({ mensagem: erroServidor });
  }
}

const obterProdutoId = async (req, res) => {
  const { id } = req.params

  try {

    const produto = await knex('produtos').where('id', id).first();

    if (!produto) {
      return res.status(404).json({ mensagem: naoEncontrado });
    }

    return res.status(200).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: erroServidor });
  }
}

const excluirProdutoPorId = async (req, res) => {
  const { id } = req.params

  try {
    const produto = await knex('produtos').where('id', id).first()

    if (!produto) {
      return res.status(404).json({ mensagem: naoEncontrado })
    }

    await knex('produtos').where('id', id).del();

    return res.status(204).json({ mensagem: 'Produto excluído com sucesso' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ mensagem: erroServidor })
  }
};

module.exports = {
  cadastrarProdutos,
  editarProduto,
  obterProdutoId,
  excluirProdutoPorId
};
