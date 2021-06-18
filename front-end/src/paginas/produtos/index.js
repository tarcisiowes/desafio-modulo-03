import useStyles from './style.js'
import React, { useState, useEffect } from 'react'
import useAuth from '../../hook/useAuth'
import { get } from '../../services/apiClient.js'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ModalDelete from '../../components/modalDelete/index.js'


function Produtos() {

  const { deslogar} = useAuth()
  const [produtos, setProdutos] = useState([])
  const classes = useStyles()

  async function meusProdutos() {

    try {
      
      const listaDeProdutos = await get('produtos')
      
      setProdutos(listaDeProdutos)

    } catch (error) {
      
      console.log(error.message)
    }
    
  }

  useEffect(() => {
    meusProdutos()
  },[])
  
  return (
    <div className={classes.root}>

      {/* <Button size="small" color="primary">
        Adicionar novo produto
      </Button> */}

      { produtos.map(produto => (
        
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}              
              />
            <CardContent>
              <Typography gutterBottom variant="h3" component="h2">
                {produto.nome}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {produto.preco}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {produto.estoque}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {produto.descricao}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <ModalDelete />
          </CardActions>
        </Card> ))      
      
      }
      
      {/* GET
      Carregamento dos produtos da loja (GET /produtos)
      Ao clicar no card do produto, redirecionar para a rota de (/produto/:id/editar)
      Ao clicar no icone de lixo no card do produto, abrir um modal e se o cliente confirmar, deletar o produto (DELETE /produtos/:id)
      Ao clicar no botão de "ADICIONAR PRODUTO", redirecionar para a rota de (/produtos/novo) */}

      <Button size="large" color="secondary" variant="contained" onClick={deslogar}>
        Deslogar
      </Button>
    </div>
  )
}

export default Produtos
