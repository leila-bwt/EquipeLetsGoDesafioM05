# Desafio Módulo 5 - Backend

## Recursos e Tecnologias Utilizadas

- Node.js (versão: v18.14.1 )
- npm (gerenciador de pacotes do Node.js)
- Express.js
- Nodemon
- Postman
- Insomnia
- Postgres
- Beekeper

## Como Executar o Projeto

- `npm init` ou `npm init -y` : inicia o package.json;
- `npm lodash` : instalador de pacotes para implementar o codigo;
- `.gitignore` : arquivos que serão ignorados durante o envio para o gitHub

- `npm run dev` script ("nodemon ./src/index.js") usado para chamar o nodemon que foi instalado com `npm install -D nodemon` para usar somente como depedência.

## Resumo das atividades realizadas 

## 1ª Sprint

Esta é a primeira sprint do projeto do PDV (Ponto de Venda) API, que consiste na criação de um sistema de frente de caixa. Nesta sprint, foram realizadas as seguintes tarefas:

### Banco de Dados

Foram criadas as seguintes tabelas e colunas no banco de dados:

### Tabela usuarios:

id (Chave primária)
nome
email (Deve ser único)
senha

### Tabela categorias:

id (Chave primária)
descricao
Listar Categorias

###  Rota: `GET /categoria`

Essa rota permite ao usuário listar todas as categorias cadastradas no sistema. Para o correto funcionamento da rota, as seguintes categorias precisam ser previamente cadastradas no sistema:

Informática
Celulares
Beleza e Perfumaria
Mercado
Livros e Papelaria
Brinquedos
Moda
Bebê
Games
Cadastrar Usuário

### Rota: `POST /usuario`

Essa rota permite o cadastro de um novo usuário no sistema. Para que o cadastro seja bem-sucedido, são aplicados os seguintes critérios de aceitação:

Validação dos campos obrigatórios: nome, email, senha.
A senha é criptografada usando um algoritmo de criptografia confiável.
O campo email no banco de dados deve ser único, evitando que dois usuários tenham o mesmo endereço de e-mail.
Efetuar Login do Usuário

### Rota: `POST /login`

Essa rota possibilita que um usuário cadastrado faça o login no sistema. Os critérios de aceitação são os seguintes:

Validação do e-mail e da senha para o usuário em questão.
Geração de um token de autenticação para o usuário.
A partir deste ponto, todas as funcionalidades (endpoints) requerem um token de autenticação do usuário logado, que deve ser enviado no header no formato Bearer Token. Portanto, em cada funcionalidade, a validação do token informado é necessária.

Detalhar Perfil do Usuário Logado

###  Rota: `GET /perfil`

Essa rota permite ao usuário logado visualizar o seu perfil no sistema.

Editar Perfil do Usuário Logado

### Rota: `PUT /perfil`

Essa rota permite ao usuário logado editar as informações do seu perfil no sistema.

### Efetuar Deploy da Aplicação

Essa é uma tarefa que deve ser realizada para disponibilizar a aplicação em um ambiente de produção.
- Link do Deploy: 

## Integrantes do Grupo

- Leila Borges
- Stephanie Feliciano
- Sthefany
- Glaudia
- Maria Stephanie
