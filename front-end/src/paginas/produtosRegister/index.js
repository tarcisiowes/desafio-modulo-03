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

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'


export default function ProdutosRegister() {

  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

    const [values, setValues] = React.useState({
    amount: '',
    quantity: '',
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  }

  async function onSubmit(data) {

    setLoading(true)
    setErro('')

    try {

      const { erro } = await post('produtos/novo', data)
      
      setLoading(false)

      if (erro) {
        
        setErro(erro)
        return
      }
      
      history.push('produtos')
    
    } catch (error) {
      
      setErro(error.message)
      return
    }
  }
  
  return (

      // Post
      //   Funcionalidades obrigatórias:
      //   Enviar os dados do formulário para a rota POST /produtos
      //   Redirecionar para a rota de produtos (/produtos);
      //   Inputs:
      //   nome
      //   preco
      //   estoque
      //   descricao
      //   imagem (link para uma imagem)

    <form className={ classes.root } noValidate autoComplete="off" onSubmit={ handleSubmit(onSubmit) }>

      { erro && <Alert severity="error">{ erro }</Alert>}
      <Typography variant="h3">Adicionar produto</Typography>
      <TextField label="Nome do produto" {... register('nome')} />
      
      <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Preço</InputLabel>
         <Input
           {... register('preco')}
            id="standard-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
          />
      </FormControl>
      
      <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-quantity">Estoque</InputLabel>
         <Input
            {... register('estoque')}
            id="standard-adornment-quantity"
            value={values.quantity}
            onChange={handleChange('quantity')}
            startAdornment={<InputAdornment position="start">Un</InputAdornment>}
          />
      </FormControl>
            
      <TextField label="Descrição do produto" { ...register('descricao') } />
      
      <Button variant="contained" color="inherit" type="submit" >Cancelar</Button>
      
      <Button variant="contained" color="secondary" type="submit" >Adicionar Porduto</Button>
      { loading && <CircularProgress color="inherit" /> } 

    </form>
  )
}

