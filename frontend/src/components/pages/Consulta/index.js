import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

import api from "../../../services/api";

import Toolbar from "../../Navigation/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer";
import Backdrop from "../../UI/Backdrop";
import Introduction from "../../Introduction";

export default function Consultar() {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [records, setRecords] = useState([]);

  const history = useHistory();

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin");

  if (userId === null) {
    history.push("/");
  }

  useEffect(() => {
    api
      .get("users/registrations", {
        headers: { user_id: userId },
      })
      .then((response) => {
        setRecords(response.data);
      });
  }, [userId]);

  function sideDrawerClosedHandler() {
    setShowSideDrawer(false);
  }

  function sideDrawerToggleHandler() {
    setShowSideDrawer((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  return (
    <div className="consult-container">
      <div className="introduction">
        <Backdrop show={showSideDrawer} clicked={sideDrawerClosedHandler} />
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer
          open={showSideDrawer}
          closed={sideDrawerClosedHandler}
          isAdmin={isAdmin}
        />
        <Introduction title="Consulta de Dados" />
      </div>

      <div className="consult-content">
        <h2>Dados Disponíveis</h2>
        {records.length === 0
          ? "Nenhum dado disponível!"
          : records.map((record) => (
              <div key={record.id} className="user-datas">
                <div className="data-group">
                  <div className="each-data">
                    <p>Nome:</p>
                    <span>{record.name}</span>
                  </div>
                  <div className="each-data">
                    <p>Sobrenome:</p>
                    <span>{record.surname}</span>
                  </div>
                </div>
                <div className="data-group">
                  <div className="each-data">
                    <p>Email:</p>
                    <span>{record.email}</span>
                  </div>
                </div>
                <div className="data-group">
                  <div className="each-data">
                    <p>Telefone</p>
                    <span>{record.telephone}</span>
                  </div>
                  <div className="each-data">
                    <p>Celular</p>
                    <span>{record.cell_phone}</span>
                  </div>
                </div>
                <div className="data-group">
                  <div className="each-data">
                    <p>Data de nascimento:</p>
                    <span>{record.birthday}</span>
                  </div>
                  <div className="each-data">
                    <p>Cep:</p>
                    <span>{record.cep}</span>
                  </div>
                </div>
                <div className="data-group">
                  <div className="each-data">
                    <p>Estado:</p>
                    <span>{record.state}</span>
                  </div>
                  <div className="each-data">
                    <p>Cidade:</p>
                    <span>{record.city}</span>
                  </div>
                </div>
                <div className="data-group">
                  <div className="each-data">
                    <p>CPF ou CNPJ:</p>
                    <span>{record.cpf_cnpj}</span>
                  </div>
                  <div className="each-data">
                    <p>Valor de Crédito:</p>
                    <span>{record.value}</span>
                  </div>
                </div>
                <div className="data-group">
                  <div className="each-data">
                    <p>Como soube da Firgun:</p>
                    <span>{record.about_firgun}</span>
                  </div>
                  <div className="each-data">
                    <p>Motivo do Crédito:</p>
                    <span>{record.credit_motive}</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
