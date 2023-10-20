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
  const senhaJwt = require("../senhaJwt");
  
const  listarClientes = async (req, res) => {
	try {
		const response = await knex.select("*").from("clientes")
		return res.status(201).json(response)
	} catch (error) {
		return console.log({ mensagem: error.message })
	}
}

const detalharClienteId = async (req, res) => {
    try {
      const {
         id ,
        nome,
        email,
        cpf ,
        cep ,
        rua ,
        numero ,
        bairro ,
        cidade ,
        estado , } = req.usuario;
  
      if (!id) {
        return res.status(404).json({ mensagem: naoEncontrado });
      }
  
      return res.status(200).json({  id , nome,email,cpf ,cep ,rua ,numero ,bairro ,cidade , estado , });

    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  };
module.exports = {
    listarClientes,
    detalharClienteId
  };
  