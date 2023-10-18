create table
    usuarios(
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL
    );

create table
    categorias(
        id SERIAL PRIMARY KEY,
        descricao VARCHAR(255) NOT NULL
    );

create table
    transacoes(
        id SERIAL PRIMARY KEY,
        descricao VARCHAR(255) NOT NULL,
        valor INT NOT NULL,
        data TIMESTAMP NOT NULL,
        categoria_id INT NOT NULL,
        usuario_id INT NOT NULL,
        tipo VARCHAR(255) NOT NULL,
        FOREIGN KEY(categoria_id) REFERENCES categorias(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    );

INSERT INTO
    categorias (descricao)
VALUES 
('Informatica'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games'),


create table produtos(
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade_estoque INT NOT NULL,
    valor INT NOT NULL,
    categoria_id INT NOT NULL,
);

create table clientes(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cep VARCHAR(20) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
);