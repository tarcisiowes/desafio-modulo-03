import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import React from 'react'
import Login from './paginas/login'
import Cadastro from './paginas/cadastro'
import Lista from './paginas/lista'

import { AuthProvider } from './context/authContext'
import useAuth from './hook/useAuth'

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
            
            <Route path="/lista" component={ Lista } />
          </RotasProtegidas>
        </Switch>
      </Router>

    </AuthProvider>    
  
  );
}

export default Routes
