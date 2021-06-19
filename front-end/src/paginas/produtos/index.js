import useStyles from './style.js'
import React, { useState, useEffect } from 'react'
import { get } from '../../services/apiClient.js'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { del } from '../../services/apiClient'

import { Grid } from '@material-ui/core'
import NavBar from '../../components/navBar/index.js'

function Produtos() {

  const [produtos, setProdutos] = useState([])
  const classes = useStyles()
  const history = useHistory()

  async function meusProdutos() {

    try {
      
      const listaDeProdutos = await get('produtos')
      
      setProdutos(listaDeProdutos)

    } catch (error) {
      
      console.log(error.message)
    }
    
  }

  function handleRedirect(id) {

    history.push(`produtos/${id}`)
  }
  
  useEffect(() => {
    meusProdutos()
  }, [])
  

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  async function handleDelete(id) {

    try {
      
      const resposta = await del(`produtos/${id}`)
  
      const data = await resposta.json()

      setProdutos(data)
    } catch (error) {
      console.log(error.message)
    }    
  
    handleClose()
  }
  
  return (

    <div className={classes.root}>

      <NavBar/>
      {/* <Button size="small" color="primary">
        Adicionar novo produto
      </Button> */}

      { produtos.map(produto => (

        <Grid item key={produto.id}>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}              
                />
              <CardContent onClick={() => handleRedirect(produto.id)}>
                <Typography gutterBottom variant="h5" component="h2">
                ID: {produto.id}
                </Typography>
                <Typography gutterBottom variant="h3" component="h2">
                  {produto.nome}
                </Typography>
                <Typography variant="h5" component="h2">
                  {produto.preco}
                </Typography>
                <Typography variant="h5" component="h2">
                  {produto.estoque}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {produto.descricao}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {/* <ModalDelete  /> */ }
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Remover
                  </Button>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Deseja remover o produto?</DialogTitle>

                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Manter
                    </Button>

                    <Button onClick={() => handleDelete(produtos.id)} color="primary">
                      Remover
                    </Button>
                  </DialogActions>

                </Dialog>
            </CardActions>
          </Card>
        </Grid>
      ))
      
      }
      
      {/* GET
      Carregamento dos produtos da loja (GET /produtos)
      Ao clicar no card do produto, redirecionar para a rota de (/produto/:id/editar)
      Ao clicar no icone de lixo no card do produto, abrir um modal e se o cliente confirmar, deletar o produto (DELETE /produtos/:id)
      Ao clicar no botão de "ADICIONAR PRODUTO", redirecionar para a rota de (/produtos/novo) */}

    </div>
  )
}

export default Produtos
