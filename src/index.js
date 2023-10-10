const express = require('express');
const rotas = require('./rotas');
const knex = require('./conexao');


const app = express();

app.use(express.json());

app.use(rotas);

app.listen(3000);