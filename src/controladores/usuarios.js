const knex = require("../conexao")
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
        const novoUsuario = await knex('usuarios')
        .insert({
            nome,
            email,
            senha: senhaCriptografada,
        })
        .returning(['nome', 'email']);

        
        if (novoUsuario && novoUsuario.length > 0) {//se o novo usuário for criado
            const { senha: _, ...usuario } = novoUsuario[0];//retorna o usuário sem a senha
            return res.status(201).json(usuario);
        } else {
            return res.status(500).json({ mensagem: erroServidor });
        }
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