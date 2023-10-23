const knex = require("../conexao");

const {
    erroCampo,
    emailExiste,
    erroServidor,
    emailInvalido,
    naoEncontrado,
  } = require("../erro");

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
            return res.status(400).json({ mensagem: emailExiste });
        }

        const cpfExiste = await knex("clientes").where("cpf", cpf).first();
        
        if (cpfExiste) {
            return res.status(400).json({ mensagem: cpfExiste });
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
              return res.status(400).json({ mensagem: emailExiste });
          }
  
        const cpfExiste = await knex("clientes").where("id","<>", id).where("cpf", cpf).first();
        if (cpfExiste) {
              return res.status(400).json({ mensagem: cpfExiste });
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
    cadastrarCliente,
    editarCliente,
    listarClientes,
    detalharClienteId
}

