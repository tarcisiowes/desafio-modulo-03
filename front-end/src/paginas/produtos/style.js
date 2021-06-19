import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    placeContent: 'center',
    // placeItems: 'center',
    minHeight: '100vh',
    gap: '1rem'
  },
  card: {
    maxWidth: 300,
    
  },
  media: {
    height: 150,
  },
}))

export default useStyles