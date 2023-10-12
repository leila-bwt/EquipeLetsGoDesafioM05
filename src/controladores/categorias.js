const knex = require("../conexao")

const listarCategorias = async (req, res) => {
	try {
		const response = await knex.select("*").from("categorias")
		return res.status(201).json(response)
	} catch (error) {
		return console.log({ mensagem: error.message })
	}
}

module.exports = {
	listarCategorias
}