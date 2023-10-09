# Desafio Módulo 5 - Backend


Como entregar?
 Crie um repositório público no GitHub de algum membro de equipe
 Adicione os membros da equipe no repositório
 Enviei o link desse repositório na plataforma
Descrição do desafio
Seja bem vindo(a) ao desafio do módulo 5.

Sua tarefa como desenvolvedor(a) será criar uma API para um PDV (Frente de Caixa). Esse será um projeto piloto, ou seja, no futuro outras funcionalidades serão implementadas.

Importante 1: Sempre que a validação de uma requisição falhar, responda com código de erro e mensagem adequada à situação, ok?

Importante 2: Para endpoints de cadastro/atualização os objetos de requisição devem conter as propriedades equivalentes as colunas das tabelas.

Exemplo:

// Corpo da requisição para cadastro de usuário (body)
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "jose"
}
ATENÇÃO: Todos os endpoints deverão atender os requisitos citados acima.

Banco de dados
Você precisa criar um Banco de Dados PostgreSQL chamado pdv.

IMPORTANTE: Deverá ser criado no projeto o arquivo SQL que deverá ser o script contendo os comandos de criação das tabelas respeitando os nomes das tabelas e colunas respectivamente, além de, conter os comandos para a inserção das categorias que devem ser previamente cadastradas (estão citadas na 1ª Sprint no item Listar Categorias).

Requisitos obrigatórios
A API a ser criada deverá acessar o banco de dados a ser criado pdv para persistir e manipular os dados de categorias, clientes, pedidos, produtos e usuários utilizados pela aplicação.
O campo id das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)
Status Codes
Abaixo, listamos os possíveis status codes esperados como resposta da API.

// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
// 500 (Internal Server Error) = erro inesperado do servidor
1ª Sprint