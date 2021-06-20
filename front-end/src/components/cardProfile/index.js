import React from 'react'
import useStyles from './style'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'


const CardProfile = ({usuario,perfil,handleDelete,handleRedirect }) => {

  const classes = useStyles()

  
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };
  

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing='1rem'item key={usuario.id}>

          <Card className={classes.card}>
            <CardActionArea component={ Link } to={ `/usuarios/${ usuario.id }` }>
              <CardMedia
                className={classes.media} image={usuario.imagem}              
                />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                ID: {usuario.id}
                </Typography>
                <Typography gutterBottom variant="h3" component="h2">
                  {usuario.nome}
                </Typography>
                <Typography variant="h5" component="h2">
                  {usuario.email}
                </Typography>
                <Typography variant="h5" component="h2">
                  {usuario.nome_loja}
                </Typography>

              </CardContent>
            </CardActionArea>
            <CardActions>
              {/* <ModalDelete  /> */ }
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Editar
                  </Button>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Deseja editar ou remover o usuario?</DialogTitle>

                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Manter
                    </Button>
                  
                  <Button onClick={() => handleRedirect(usuario.id)} color="primary">
                      Remover
                    </Button>

                    <Button onClick={() => handleDelete(usuario.id)} color="primary">
                      Remover
                    </Button>
                  </DialogActions>

                </Dialog>
            </CardActions>
          </Card>
        </Grid>
        </Grid>
   
    </Grid>
  )
}

export default CardProfile