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

  const  onSubmit = async (data) => {

    setLoading(true)
    setErro('')

    try {
   
      const { erro } = await post('login',data)
      setLoading(false)

      if (erro) {
        
        setErro(erro)
        return
      }

      history.push('/produtos')
    
    } catch (error) {
      
      setErro(error.message)
      return
    }
    
  }
  
  return (

    <form className={ classes.root } noValidate autoComplete="off" onSubmit={ handleSubmit(onSubmit) }>

      { erro && <Alert severity="error">{ erro }</Alert>}
      <Typography variant="h3">Login</Typography>
      <TextField label="Email" {... register('email')} />
      <TextField label="Senha" { ...register('senha') } type="password" />
      <Button variant="contained" color="secondary" type="submit"> Entrar </Button>
      { loading && <CircularProgress color="inherit" /> }      

    </form>
  );
}

