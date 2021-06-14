const express = require('express')
const usuarios = require('./controladores/usuarios')
const produtos = require('./controladores/produtos')

const rotas = express()

rotas.post('/cadastro', usuarios.cadastrarUsuario)
rotas.post('/login', usuarios.logarUsuario)
rotas.get('/perfil', usuarios.perfilUsuario)
rotas.put('/perfil', usuarios.editarUsuario)

rotas.get('/produtos', produtos.listarProdutos)
rotas.post('/produtos/:id', produtos.obterProduto)
rotas.post('/produtos', produtos.cadastrarProduto )
rotas.put('/produtos/:id', produtos.atualizarProduto)
rotas.delete('/produtos/:id', produtos.excluirProduto)


module.exports = rotas