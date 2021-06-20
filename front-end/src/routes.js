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
            <Route path="/perfil" component={ Perfil } />
            <Route path="/perfil/editar" component={ PerfilEdit } />
            <Route path="/produtos" component={ Produtos } />
            <Route path="/produtos/:id" component={ ProdutosEdit } />
            <Route path="/produtos/novo" component={ ProdutosRegister } />
          </RotasProtegidas>
        </Switch>
      </Router>

    </AuthProvider>    
  
  );
}

export default Routes
