const jwt = require("jsonwebtoken");
const knex = require("../conexao");
const senhaJwt = require("../senhaJwt");

const autenticaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, senhaJwt);

    const { rows, rowCount } = await knex
      .select('*')
      .from('usuarios')
      .where({ id });

    if (rowCount === 0) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
}

module.exports = autenticaLogin;