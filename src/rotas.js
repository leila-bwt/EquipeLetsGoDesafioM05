const express = require('express');

const { cadastrarUsuario, login, editarUsuario, detalharUsuario } = require('./controladores/usuarios');

const autenticaLogin = require('./intermediario/autenticaLogin');
const { listarCategorias } = require('./controladores/categorias');
const { cadastrarProdutos, obterProdutoId } = require('./controladores/produtos');
const { cadastrarCliente, editarCliente } = require('./controladores/clientes');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', cadastrarUsuario);

rotas.post('/login', login);
rotas.use(autenticaLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', editarUsuario);

rotas.post('/produtos', cadastrarProdutos);

rotas.get('/produto/:id', obterProdutoId)

rotas.put('/clientes/:id', editarCliente);
rotas.post('/clientes', cadastrarCliente);



module.exports = rotas;