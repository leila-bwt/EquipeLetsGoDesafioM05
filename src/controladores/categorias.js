const pool = require('../conexao')

const listarCategorias = async (req, res) => {
         try {
           	const response = await pool.select('*').from ('categorias')
        	res.json(response)
 	} catch (error) {
            	return console.log(error)
	       }
}

module.exports = {
   listarCategorias
}
