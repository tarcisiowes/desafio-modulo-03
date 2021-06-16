import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"

import React from "react";
import Login from "./paginas/login"
import Cadastro from "./paginas/cadastro"
import Lista from "./paginas/lista"

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/lista" component={Lista} />        
      </Switch>

    </Router>
  );
}

export default Routes
