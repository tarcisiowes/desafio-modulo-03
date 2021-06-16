import './style.js'

import React from 'react'
import useStyles from './style.js';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';

export default function Login() {

  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  function onSubmit(data) {

    if (data.senha === '123') {
      history.push('/lista')
    }
  }
  
  return (

    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3">Login</Typography>
      <TextField label="Email" {... register('email')} />
      <TextField label="Senha" {...register('senha')} type="password" />
      <Button variant="contained" color="secondary" type="submit" >Entrar</Button>

    </form>
  );
}

