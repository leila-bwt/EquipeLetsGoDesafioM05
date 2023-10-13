const express = require('express');
const { cadastrarUsuario, login} = require('./controladores/usuarios');
const autenticaLogin = require('./intermediario/autenticaLogin');
const { listarCategorias } = require('./controladores/categorias');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.get('/categoria', listarCategorias);

rotas.use(autenticaLogin);





module.exports = rotas;