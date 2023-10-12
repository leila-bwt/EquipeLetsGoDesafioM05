const express = require('express')
const { listarCategorias } = require('./controladores/categorias')




const rotas = express()

rotas.get('/categoria', listarCategorias)



module.exports = rotas