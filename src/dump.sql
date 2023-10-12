
create table usuarios(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);


create table categorias(
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL
);


create table transacoes(
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  valor INT NOT NULL,
  data TIMESTAMP NOT NULL,
  categoria_id INT NOT NULL,
  usuario_id INT NOT NULL,
  tipo VARCHAR(255) NOT NULL,
  FOREIGN KEY(categoria_id) REFERENCES categorias(id),
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id));

INSERT INTO categorias (descricao)
VALUES ('Alimentação'),
  ('Assinaturas e Serviços'),
  ('Casa'),
  ('Mercado'),
  ('Cuidados Pessoais'),
  ('Educação'),
  ('Família'),
  ('Lazer'),
  ('Pets'),
  ('Presentes'),
  ('Roupas'),
  ('Saúde'),
  ('Transporte'),
  ('Salário'),