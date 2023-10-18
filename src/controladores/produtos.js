const express = require("express")
const knex = require("../conexao")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const senhaJwt = require("../senhaJwt")
const { erroServidor, naoEncontrado } = require("../erro")

const obterProdutoPorId = async (req, res) => {
    const { id } = req.params
  
    try {
      const produto = await knex("produtos").where({ id }).first()
  
      if (!produto) {
        return res.status(404).json({ mensagem: naoEncontrado })
      }
  
      return res.status(200).json({ produto })
    } catch (error) {
      console.error("Erro ao obter produto por ID: ", error);
      return res.status(500).json({ mensagem: erroServidor })
    }
  }
  
  module.exports = {
    obterProdutoPorId
  }
  