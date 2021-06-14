create database market_cubos;

create table usuarios(
  id serial primary key,
  nome varchar(60) not null,
  nome_loja varchar(60) not null,
  email varchar(30) not null,
  senha varchar(20) not null
);

create table produtos(
  id serial primary key,
  usuario_id serial,
  nome varchar(60) not null,
  estoque integer not null,
  categoria varchar(20) not null,
  preco integer not null,
  descricao text,
  imagem text
);