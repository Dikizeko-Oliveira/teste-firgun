import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import NavigationItem from "./NavigationItem";

export default function NavigationItems(props) {
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <>
      <ul className="NavigationItems">
        <NavigationItem link="/consult">Consultar Dados</NavigationItem>
        {props.isAdmin === "false" ? (
          <NavigationItem link="/records" exact>
            {" "}
            Cadastrar Pedido
          </NavigationItem>
        ) : null}
        {props.isAdmin === "false" ? (
          <NavigationItem link="/edition">Alterar Dados</NavigationItem>
        ) : null}
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </>
  );
}
