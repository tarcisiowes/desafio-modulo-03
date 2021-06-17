create database if not exists market_cubos;

create table if not exists usuarios(
  id serial primary key,
  nome varchar(60) not null,
  nome_loja varchar(60) not null,
  email varchar(30) not null,
  senha text not null
);

create table if not exists produtos2(
  id serial primary key,
  usuario_id integer not null,
  nome varchar(60) not null,
  estoque integer not null,
  categoria varchar(20),
  preco integer not null,
  descricao text not null,
  imagem text

);