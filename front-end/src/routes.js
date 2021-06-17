import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import React from 'react'
import Login from './paginas/login'
import Cadastro from './paginas/cadastro'
import Perfil from './paginas/perfilEdit'
import { AuthProvider } from './context/authContext'
import useAuth from './hook/useAuth'
import PerfilEdit from './paginas/perfilEdit'
import Produtos from './paginas/produtos'
import ProdutosEdit from './paginas/produtosEdit'
import ProdutosRegister from './paginas/produtosRegister'

function RotasProtegidas(props) {
  
  const { token } = useAuth()

  return (
    <Route render={ () => (token ? props.children : <Redirect to='/' />)} />
  )
}

function Routes() {
  return (  

    <AuthProvider>

      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" component={Cadastro} />
          <RotasProtegidas>
            
            <Route path="/lista" component={ Perfil } />
            <Route path="/lista" component={ PerfilEdit } />
            <Route path="/lista" component={ Produtos } />
            <Route path="/lista" component={ ProdutosEdit } />
            <Route path="/lista" component={ ProdutosRegister } />
          </RotasProtegidas>
        </Switch>
      </Router>

    </AuthProvider>    
  
  );
}

export default Routes
