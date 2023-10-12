const express = require("express")
const rotas = express()

const { cadastrarUsuario } = require("../controladores/usuariosControl")

rotas.post("usuarios/", cadastrarUsuario);

module.exports = rotas