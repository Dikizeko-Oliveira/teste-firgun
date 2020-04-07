import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Cadastro from "./components/pages/Cadastro";
import Consulta from "./components/pages/Consulta";
import Alteracao from "./components/pages/Alteracao";
import Logon from "./containers/Auth/Logon";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/records" component={Cadastro} />
        <Route path="/consult" component={Consulta} />
        <Route path="/edition" component={Alteracao} />
      </Switch>
    </BrowserRouter>
  );
}
