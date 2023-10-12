const express = require("express")
const { listarCategorias } = require("../controladores/categoriasControl")

const rotas = express()

rotas.get("/categoria", listarCategorias);

module.exports = rotas;


