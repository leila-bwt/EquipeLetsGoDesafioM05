const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");

const { erroCampo, emailExisteNaBase, erroServidor, emailInvalido, naoEncontrado, informacaoinvalida, cpfExisteNaBase } = require("../erro");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    try {

        if (!nome || !email || !cpf || !cep || !rua || !numero ||!bairro || !cidade || !estado) {
            return res.status(400).json({ mensagem: erroCampo });
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ mensagem: emailInvalido });
        }

        const emailExiste = await knex("clientes").where("email", email).first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: emailExisteNaBase });
        }

        const cpfExiste = await knex("clientes").where("cpf", cpf).first();
        
        if (cpfExiste) {
            return res.status(400).json({ mensagem: cpfExisteNaBase });
        }

        const novoCliente = await knex("clientes").insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning("*");
        
        return res.status(200).json(novoCliente);

    } catch (error) {
        return res.status(500).json({ mensagem: erroServidor });
      }

};

const editarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    
    try {
        const clienteEncontrado = await knex('clientes').where('id', id).first();
        
        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: naoEncontrado });
          }
        
          if (!nome || !email || !cpf) {
            return res.status(400).json({ mensagem: erroCampo });
          }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
         return res.status(400).json({ mensagem: emailInvalido });
    }
        
        const emailExiste = await knex("clientes").where("id", "<>",id).where("email", email).first();
        if (emailExiste) {
              return res.status(400).json({ mensagem: emailExisteNaBase }); //As mensagens de erro predefinidas não funcionaram aqui
          }
  
        const cpfExiste = await knex("clientes").where("id","<>", id).where("cpf", cpf).first();
        if (cpfExiste) {
              return res.status(400).json({ mensagem: cpfExisteNaBase }); //As mensagens de erro predefinidas não funcionaram aqui
          }

       
        const clienteAtualizado = await knex("clientes").where({ id }).update({
            nome: nome,
            email: email,
            cpf: cpf,
            cep: cep,
            rua: rua,
            numero: numero, 
            bairro: bairro,
            cidade: cidade, 
            estado: estado
        }).returning("*");
         
        return res.status(200).json(clienteAtualizado);

        } catch (error) {
          return res.status(500).json({ mensagem: erroServidor });
        }
}

module.exports = {
    cadastrarCliente,
    editarCliente
}
