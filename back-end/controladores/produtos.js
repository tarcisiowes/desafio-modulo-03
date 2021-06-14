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

//   nome
// estoque
// preco
// descricao 
// Cadastrar o produto no banco de dados para o id do usuario logado  
  
  
  try {
    
    const { nome, estoque, preco, descricao, imagem } = req.body
    
    if (!nome) {
      return res.status(400).json("O campo nome é obrigatorio.")
    }

      if (!estoque) {
      return res.status(400).json("O campo estoque é obrigatorio.")
    }

      if (!preco) {
      return res.status(400).json("O campo preco é obrigatorio.")
    }

      if (!descricao) {
      return res.status(400).json("O campo descricao é obrigatorio.")
    }
    
    const produto = await conexao.query('insert into produtos (nome, estoque, preco, descricao, imagem) values($1, $2, $3, $4, $5)', [nome, estoque, preco, descricao, imagem])
      
      if (produto.rowCount === 0) {
      return res.status(404).json('Não foi possivel cadastrar o produto')
    }

    return res.status(200).json("Produto cadastrado com sucesso")
    
  } catch (error) {
    
    return res.status(400).json(error.message)
  }
  
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