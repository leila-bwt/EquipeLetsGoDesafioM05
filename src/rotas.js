const express = require('express')
const { listarCategorias } = require('./controladores/categorias')



const rotas = express()

rotas.get('/categorias', listarCategorias)



module.exports = rotas