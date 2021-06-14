const conexao = require('../conexao')

const listarProdutos = async (req, res) => {
  
  const produtos = await conexao.query('select * from produtos')
  res.json(produtos)
}

const obterProduto = async (req, res) => {
  
}

const cadastrarProduto = async (req, res) => {
  
}

const atualizarProduto = async (req, res) => {
  
}

const excluirProduto = async (req, res) => {
  
}

module.exports = {

  listarProdutos,
  obterProduto,
  atualizarProduto,
  cadastrarProduto,
  excluirProduto
}