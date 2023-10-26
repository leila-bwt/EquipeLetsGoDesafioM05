const jwt = require("jsonwebtoken");
const knex = require("../conexao");
const { naoAutorizado } = require("../erro");

const autenticaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: naoAutorizado});
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.SENHA_JWT);

    const rows = await knex
      .select('*')
      .from('usuarios')
      .where({ id });

    if (rows.length === 0) {
      return res.status(401).json({ mensagem: naoAutorizado });
    }

    const { senha, ...usuario } = rows[0];


    req.usuario = usuario;


    next();
  } catch (error) {
    return res.status(401).json({ mensagem: naoAutorizado });
  }
};

module.exports = autenticaLogin;