const express = require('express');

const { cadastrarUsuario, login, editarUsuario, detalharUsuario } = require('./controladores/usuarios')


const rotas = express()

rotas.get('/categoria', listarCategorias)

rotas.post('/usuario', cadastrarUsuario)

rotas.post('/login', login)
rotas.use(autenticaLogin)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', editarUsuario)

rotas.post('/produtos', cadastrarProdutos)
rotas.put('/produto/:id', editarProduto)

rotas.get('/produto/:id', obterProdutoId)



module.exports = rotas;