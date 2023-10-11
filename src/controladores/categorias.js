const pool = require('../conexao')

const listarCategorias = async (req, res) => {
         try {
           	const response = await pool.select('*').from ('categorias')
        	res.json(response)
 	} catch (error) {
            	return res.status(500).json('Erro interno do servidor')
	       }
}

module.exports = {
   listarCategorias
}
