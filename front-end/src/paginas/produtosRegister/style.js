import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    placeContent: 'center',
    minHeight: '100vh',
    gap: '1rem'
  },
    withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100px',
  },
}))

export default useStyles

