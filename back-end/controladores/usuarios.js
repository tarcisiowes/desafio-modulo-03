const conexao = require('../conexao')

const securePassword = require("secure-password")
const pwd = securePassword()

const jwt = require('jsonwebtoken')
const jwtSecret = require('../jwt_secret')

const cadastrarUsuario = async (req, res) => {

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

    const { senha: pwUser, ...userData } = usuario
    
    return res.status(200).json({
      usuario: userData,
      token
    })

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const perfilUsuario = async (req, res) => {

  const { usuario } = req

  try {

    const { senha: pwUser, ...userData } = usuario
    
    return res.status(200).json({
      usuario: userData,
 
    })

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const editarUsuario = async (req, res) => {

  const { usuario } = req

  let { nome, email, senha, nome_loja } = req.body
  
  if (!nome && !email && !senha && !nome_loja) {
    return res.status(400).json("É necessario informar algum campo.")
  }  
  
  try {
    
    const usuarios = await conexao.query('select * from usuarios where id = $1', [usuario.id])
    
    if (usuarios.rowCount === 0) {
      return res.status(404).json('Usuario não encontrado')
    }
    
    if (!nome) { nome = usuario.nome }

    if (!email) { email = usuario.email }

    if (!senha) { senha = usuario.senha }

    if (!nome_loja) { nome_loja = usuario.nome_loja }

    const atualizandoUsuario = await conexao.query('update usuarios set nome = $1, email = $2, senha = $3, nome_loja = $4 where id = $5', [nome, email, senha, nome_loja, usuario.id])
    
    if (atualizandoUsuario.rowCount === 0) {
      return res.status(404).json('Não foi possivel cadastrar o usuario')
    }
    
    return res.status(200).json("Usuario atualizado com sucesso")
      

  } catch (error) {
    
    return res.status(400).json(error.message)
  }
}

module.exports = {

  logarUsuario,
  perfilUsuario,
  editarUsuario,
  cadastrarUsuario
}