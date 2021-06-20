import React, { useState } from 'react'
import useStyles from './style.js'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { post } from '../../services/apiClient.js'
import useAuth from '../../hook/useAuth'

export default function Login() {

  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { logar } = useAuth()

  async function onSubmit(data) {

    setLoading(true)
    setErro('')

    try {
   
      const { erro , dados } = await post('login',data)
      setLoading(false)

      // const dados = await resposta.json()

      if (erro) {
        
        setErro(erro)
        return
      }

      console.log(dados.token)
      logar(dados.token)
      history.push('produtos')
    
    } catch (error) {
      
      setErro(error.message)
      return
    }
    
  }
  
  return (

    <main className={ classes.root}>

    <form className={ classes.root } noValidate autoComplete="off" onSubmit={ handleSubmit(onSubmit) }>

      { erro && <Alert severity="error">{ erro }</Alert>}
      <Typography variant="h3">Login</Typography>
      <TextField label="Email" {... register('email')} />
      <TextField label="Senha" { ...register('senha') } type="password" />
      <Button variant="contained" color="secondary" type="submit"> Entrar </Button>
      { loading && <CircularProgress color="inherit" /> }      

      <>
      <Button variant="contained" color="secondary" type="submit" onClick={() => history.push('cadastro')}> REGISTRAR </Button>
      </>
    </form>

    </main>
  )
}
