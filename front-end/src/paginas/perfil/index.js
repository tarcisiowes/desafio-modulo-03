import React, { useState, useEffect } from 'react'
import { get, post , Login} from '../../services/apiClient.js'
import { useHistory } from 'react-router-dom'
import { del } from '../../services/apiClient'

import { Grid } from '@material-ui/core'
import NavBar from '../../components/navBar/index.js'
import CardProfile from '../../components/cardProfile/index.js'

function Perfil() {

  const [perfil, setPerfil] = useState([])
  const history = useHistory()

  async function meuPerfil() {

    try {
      
    } catch (error) {
      
      console.log(error.message)
    }
    
  }

  function handleRedirect(id) {

    history.push(`perfil/${id}`)
  }
  
  useEffect(() => {
    
    meuPerfil()
  }, [])  

  const [ setOpen ] = React.useState(false)

  function handleClose() {
    setOpen(false)
  }

  async function handleDelete(id) {

    try {
      
      const resposta = await del(`perfil/${id}`)
  
      setPerfil(resposta)

    } catch (error) {

      console.log(error.message)
    }    
  
    handleClose()
  }
  
  return (

    <Grid container justify="space-between" spacing='1rem' >

      <NavBar />

      { perfil.map((usuario) => (
        
        <Grid item key={ usuario.id }>
          
          <CardProfile usuario={ usuario } perfil={ perfil } handleDelete={() => handleDelete(usuario.id)} handleRedirect={handleRedirect} />

        </Grid>
      )) }
         
      {/* Visualização dos dados do perfil.
      Redirecionar para a rota de perfil (/perfil/editar);
      Inputs (não precisamos controlá-los):
      nome
      nome_loja
      email */}

    </Grid>
  )
}

export default Perfil
