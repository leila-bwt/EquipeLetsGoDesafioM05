const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  erroCampo,
  emailExiste,
  erroServidor,
  emailInvalido,
  naoEncontrado,
  informacaoinvalida,
} = require("../erro");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
 
  try {
    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: erroCampo });
    }

    const emailCadastrado = await knex("usuarios")
      .where("email", email)
      .first();
    
    if (emailCadastrado) {
      return res.status(400).json({ mensagem: emailExiste });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ mensagem: emailInvalido });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning(["nome", "email"]);

    if (novoUsuario && novoUsuario.length > 0) {
      const { senha: _, ...usuario } = novoUsuario[0];
      return res.status(200).json(usuario);
    }
  } catch (error) {
    return res.status(500).json({ mensagem: erroServidor });
  }
};
const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    if (!email || !senha) {
      return res.status(400).json({ mensagem: erroCampo });
    }

    const rows = await knex.select("*").from("usuarios").where({ email });

    if (!rows || rows.length === 0) {
      return res.status(400).json({ mensagem: informacaoinvalida });
    }

    const { senha: senhaUsuario, ...usuario } = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: informacaoinvalida });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_JWT, { expiresIn: "8h" });

    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: erroServidor });
  }
};

const detalharUsuario = async (req, res) => {
  try {
    const { id, nome, email } = req.usuario;

    if (!id) {
      return res.status(404).json({ mensagem: naoEncontrado });
    }

    return res.status(200).json({ id, nome, email });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const editarUsuario = async (req, res) => {
  const { id } = req.usuario;
  const { nome, email, senha } = req.body;

  if (!nome && !email && !senha) {
    return res.status(400).json({ mensagem: errorCampo });
  }

  try {
    const usuarioExistente = await knex
      .select("*")
      .from("usuarios")
      .where("email", email)
      .whereNot("id", id)
      .first();

    if (usuarioExistente) {
      return res.status(400).json({ mensagem: emailExiste });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex("usuarios").where({ id }).update({
      nome: nome,
      email: email,
      senha: senhaCriptografada,
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: erroServidor });
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  editarUsuario,
  detalharUsuario,
};
