import React, { useState, useEffect } from 'react'
import { get } from '../../services/apiClient.js'
import { useHistory } from 'react-router-dom'
import { del } from '../../services/apiClient'

import { Grid } from '@material-ui/core'
import NavBar from '../../components/navBar/index.js'
import Cards from '../../components/card/index.js'

function Produtos() {

  const [produtos, setProdutos] = useState([])
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

  const [ setOpen ] = React.useState(false)

  function handleClose() {
    setOpen(false)
  }

  async function handleDelete(id) {

    try {
      
      const resposta = await del(`produtos/${id}`)
  
      setProdutos(resposta)

    } catch (error) {

      console.log(error.message)
    }    
  
    handleClose()
  }
  
  return (

    <Grid container justify="space-between" spacing='1rem' >

      <NavBar />

      { produtos.map((produto) => (
        
        <Grid item key={ produto.id }>
          
          <Cards produto={ produto } produtos={ produtos } handleDelete={() => handleDelete(produto.id)} handleRedirect={handleRedirect} />

        </Grid>
      )) }
         
      {/* GET
      Carregamento dos produtos da loja (GET /produtos)
      Ao clicar no card do produto, redirecionar para a rota de (/produto/:id/editar)
      Ao clicar no icone de lixo no card do produto, abrir um modal e se o cliente confirmar, deletar o produto (DELETE /produtos/:id)
      Ao clicar no botão de "ADICIONAR PRODUTO", redirecionar para a rota de (/produtos/novo) */}

    </Grid>
  )
}

export default Produtos
