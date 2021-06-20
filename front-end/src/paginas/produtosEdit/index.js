import React, { useState } from 'react'
import useStyles from './style.js'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { put } from '../../services/apiClient.js'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'

function ProdutosEdit() {

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
    setValues({ ...values, [prop]: event.target.value })
  }

  async function onSubmit(data, id) {

    setLoading(true)
    setErro('')

    try {

      const { erro } = await put(`produtos/${id}`, data)
      
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
    <div>
      
      <form className={ classes.root } noValidate autoComplete="off" onSubmit={ handleSubmit(onSubmit) }>

        { erro && <Alert severity="error">{ erro }</Alert> }
        
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
        
        <Button variant="contained" color="secondary" type="submit" >Atualizar Porduto</Button>

        { loading && <CircularProgress color="inherit" /> } 

      </form>
   
      {/* Put
        Funcionalidades obrigatórias:
        Como a atualização dos dados do produto pode ser parcial (somente um campo por ex), não é obrigatório carregar os dados do produto nesta tela e nem verificar os dados obrigatórios.
        Enviar os dados do formulário para a rota PUT /produtos/:id
        Redirecionar para a rota de produtos (/produtos);
        Inputs:
        nome
        preco
        estoque
        descricao
        imagem (link para uma imagem) */}

    </div>
  )
}

export default ProdutosEdit

