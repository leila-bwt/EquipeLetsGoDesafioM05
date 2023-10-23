const express = require('express');

const { cadastrarUsuario, login, editarUsuario, detalharUsuario } = require('./controladores/usuarios');

const autenticaLogin = require('./intermediario/autenticaLogin');
const { listarCategorias } = require('./controladores/categorias');

const { cadastrarCliente, editarCliente } = require('./controladores/clientes');

const { cadastrarProdutos, editarProduto, obterProdutoId } = require('./controladores/produtos');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', cadastrarUsuario);

rotas.post('/login', login);
rotas.use(autenticaLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', editarUsuario);

rotas.post('/produto', cadastrarProdutos);
rotas.put('/produto/:id', editarProduto)

rotas.get('/produto/:id', obterProdutoId)

rotas.put('/cliente/:id', editarCliente);
rotas.post('/cliente', cadastrarCliente);



module.exports = rotas;