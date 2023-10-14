const express = require('express');

const { cadastrarUsuario, login, editarUsuario, detalharUsuario} = require('./controladores/usuarios');

const autenticaLogin = require('./intermediario/autenticaLogin');
const { listarCategorias } = require('./controladores/categorias');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', cadastrarUsuario);

rotas.post('/login', login);
rotas.use(autenticaLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', editarUsuario);

module.exports = rotas;