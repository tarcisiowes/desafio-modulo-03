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
  
  const {id} = req.params
  try {
    
    const produto = await conexao.query('select * from produtos where id = $1', [id])
    
    if (produto.rowCount === 0) {
      return res.status(404).json('Produto não encontrado')
    }

    return res.status(200).json(produto.rows[0])
    
  } catch (error) {
    
    return res.status(400).json(error.message)
  }
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