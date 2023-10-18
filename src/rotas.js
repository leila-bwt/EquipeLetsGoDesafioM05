const express = require('express');

const { cadastrarUsuario, login, editarUsuario, detalharUsuario} = require('./controladores/usuarios');

const autenticaLogin = require('./intermediario/autenticaLogin');
const { listarCategorias } = require('./controladores/categorias');
const {cadastrarProdutos} = require('./controladores/produtos');

const rotas = express();
rotas.post('/produtos', cadastrarProdutos);
rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', cadastrarUsuario);

rotas.post('/login', login);
rotas.use(autenticaLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', editarUsuario);

rotas.post('/produtos', cadastrarProdutos);

module.exports = rotas;