const express = require('express');

const { cadastrarUsuario, login, editarUsuario} = require('./controladores/usuarios');

const autenticaLogin = require('./intermediario/autenticaLogin');
const { listarCategorias } = require('./controladores/categorias');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.get('/usuario', perfilUsuario);
rotas.post('/login', login);

rotas.get('/categoria', listarCategorias);

rotas.use(autenticaLogin);
rotas.put('/usuario', editarUsuario);

module.exports = rotas;