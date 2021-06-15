const conexao = require('../conexao')

const securePassword = require("secure-password")
const pwd = securePassword()

const jwt = require('jsonwebtoken')
const jwtSecret = require('../jwt_secret')

const cadastrarUsuario = async (req, res) => {

// Criptografar a senha antes de salvar no banco de dados  

  const { nome, email, senha, nome_loja } = req.body

  if (!nome) {
    return res.status(400).json("O campo nome é obrigatorio.")
  }

  if (!email) {
    return res.status(400).json("O campo email é obrigatorio.")
  }

  if (!senha) {
    return res.status(400).json("O campo senha é obrigatorio.")
  }

  if (!nome_loja) {
    return res.status(400).json("O campo nome_loja é obrigatorio.")
  }

  try {
    
    const usuario = await conexao.query('select * from usuarios where email = $1', [email])
      
    if (usuario.rowCount > 0) {
    return res.status(404).json('Este email ja foi cadastrado')
    }
  } catch (error) {
     return res.status(400).json(error.message)
  }

  try {
    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex")
    const usuario = await conexao.query('insert into usuarios (nome, email, senha, nome_loja) values($1, $2, $3, $4)', [nome, email, hash, nome_loja])
      
    if (usuario.rowCount === 0) {
    return res.status(404).json('Não foi possivel cadastrar o usuario')
    }

    return res.status(200).json("Usuario cadastrado com sucesso")
    
  } catch (error) {
    
    return res.status(400).json(error.message)
  }
  
}

const logarUsuario = async (req, res) => {

// Retornar um objeto com os dados do usuario (sem a senha) e o token criado
  
  const { email, senha } = req.body
  
  if (!email) {
    return res.status(400).json("O campo email é obrigatorio.")
  }

  if (!senha) {
    return res.status(400).json("O campo senha é obrigatorio.")
  }

  try {
    const usuarios = await conexao.query('select * from usuarios where email = $1', [email])
    
    if (usuarios.rowCount === 0) {
    return res.status(404).json('Email ou senha estão incorretos')
    }

    const usuario = usuarios.rows[0]

    const result = await pwd.verify(Buffer.from(senha), Buffer.from(usuario.senha, "hex"))

    switch (result) {
         
      case securePassword.INVALID_UNRECOGNIZED_HASH:
      case securePassword.INVALID:
        return res.status(400).json('Email ou senha estão incorretos')
      case securePassword.VALID:
        break
      case securePassword.VALID_NEEDS_REHASH:
        try {

          const hash = (await pwd.hash(Buffer.from(senha))).toString("hex")    
    
          const usuario = await conexao.query('update usuarios set senha = $1 where email = $2', [hash, email])

        } catch {          
        }
        break
    }

    const token = jwt.sign({
      
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      loja: usuario.nome_loja
    }, jwtSecret)

    return res.json(token)

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const perfilUsuario = async (req, res) => {

// Consultar usuário no banco de dados pelo id contido no token informado
// Retornar um objeto com as informações do usuário exceto a senha
}

const editarUsuario = async (req, res) => {

// Validar se o e-mail já existe no banco de dados, caso o email seja diferente do usuário atual
// Caso já exista um e-mail igual no banco de dados, a alteração não deve ser permitida (o campo de email deve ser sempre único de banco de dados)
// Validar os campos obrigatórios:
// nome
// email
// senha
// nome_loja
// Atualizar os dados do usuário
}

module.exports = {

  logarUsuario,
  perfilUsuario,
  editarUsuario,
  cadastrarUsuario
}