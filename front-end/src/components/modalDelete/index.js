import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { del } from '../../services/apiClient'
import { useState } from 'react'

export default function ModalDelete() {
  const [open, setOpen] = React.useState(false)
    const [produtos, setProdutos] = useState([])

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
      
    }    
  
    handleClose()
  }

  return (

    <div>
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
    </div>
  )
}
