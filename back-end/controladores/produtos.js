const conexao = require('../conexao')

const listarProdutos = async (req, res) => {
 
  try {
    
    const { rows: produtos } = await conexao.query('select * from produtos')
    return res.status(200).json(produtos)
    
  } catch (error) {
    
    return res.status(400).json(error.message)
  }
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