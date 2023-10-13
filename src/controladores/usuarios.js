const knex = require("../conexao")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const senhaJwt = require("../senhaJwt")
const { errorCampo, emailExiste, erroServidor } = require("../errors")

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: errorCampo });
    }

     try {

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ mensagem: 'O campo email deve ser preenchido com um email válido' });
        }

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
        if (error.message === 'insert into "usuarios" ("email", "nome", "senha") values ($1, $2, $3) returning "nome", "email" - duplicate key value violates unique constraint "usuarios_email_key"') {
            return res.status(400).json({ mensagem: emailExiste });
        }
               return res.status(500).json({ mensagem: erroServidor });
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
        }

        const rows = await knex
            .select('*')
            .from('usuarios')
            .where({ email });

        if (!rows || rows.length === 0) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido' });
        }

        const { senha: senhaUsuario, ...usuario } = rows[0];

        const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido' });
        }

        const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: '8h' });

        return res.status(200).json({
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};


module.exports = {
    cadastrarUsuario,
    login
}