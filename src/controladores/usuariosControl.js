const pool = require("../conexao")
const bcrypt = require("bcrypt")
const { errorCampo, emailExiste, erroServidor } = require("../errors")

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: errorCampo });
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        //novo usuário no banco
        const novoUsuario = await pool.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
            [nome, email, senhaCriptografada]
        );

        // Remover o campo senha
        const { senha: _, ...usuario } = novoUsuario.rows[0];
        return res.status(201).json(usuario);
    } catch (error) {
        if (error.message === 'duplicate key value violates unique constraint "usuarios_email_key"') {
            return res.status(400).json({ mensagem: emailExiste });
        }
        return res.status(500).json({ mensagem: erroServidor });
    }


}

module.exports = {
    cadastrarUsuario
}