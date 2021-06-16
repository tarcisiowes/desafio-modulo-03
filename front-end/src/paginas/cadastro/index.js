import './style.js'

import React, { useState } from 'react'
import useStyles from './style.js';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';

export default function Cadastro() {

  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const [erro, setErro] = useState('')

  function onSubmit(data) {

    setErro('')
    try {
      
      history.push('/')
    } catch (error) {
      
      setErro(error.message)
    }
  }
  
  return (

    <form className={ classes.root } noValidate autoComplete="off" onSubmit={ handleSubmit(onSubmit) }>

      { erro && <Alert severity="error">{ erro }</Alert>}
      <Typography variant="h3">Cadastro</Typography>
      <TextField label="Nome" {... register('nome')} />
      <TextField label="Nome_loja" {... register('nome_loja')} />
      <TextField label="Email" {... register('email')} />
      <TextField label="Senha" { ...register('senha', { minLength: 8 }) } type="password" />
      <TextField label="Confirmação de Senha" { ...register('senhaConfirmacao', { minLength: 8 }) } type="password" />
      <Button variant="contained" color="secondary" type="submit" >Cadastrar</Button>

    </form>
  );
}

