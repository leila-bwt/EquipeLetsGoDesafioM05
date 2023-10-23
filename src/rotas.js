const express = require("express");

const {
  cadastrarUsuario,
  login,
  editarUsuario,
  detalharUsuario,
} = require("./controladores/usuarios");

const autenticaLogin = require("./intermediario/autenticaLogin");
const { listarCategorias } = require("./controladores/categorias");

const { cadastrarCliente,
       editarCliente,
       listarClientes,
       detalharClienteId } = require('./controladores/clientes');

const {cadastrarProdutos,editarProduto,obterProdutoId,listarProdutos, excluirProdutoPorId} = require("./controladores/produtos");


const rotas = express();

rotas.get("/categoria", listarCategorias);

rotas.post("/usuario", cadastrarUsuario);

rotas.post("/login", login);
rotas.use(autenticaLogin);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", editarUsuario);


rotas.post("/produto", cadastrarProdutos);
rotas.put("/produto/:id", editarProduto);

rotas.get("/produto/:id", obterProdutoId);
rotas.get("/produto", listarProdutos);

rotas.delete('/produto/:id', excluirProdutoPorId)

rotas.post('/cliente', cadastrarCliente);
rotas.put('/cliente/:id', editarCliente);

rotas.get('/cliente/', listarClientes)
rotas.get('/cliente/:id', detalharClienteId)


module.exports = rotas;