import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Form, Input, Select } from "@rocketseat/unform";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

import api from "../../../services/api";

import Toolbar from "../../Navigation/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer";
import Backdrop from "../../UI/Backdrop";
import Introduction from "../../Introduction";
import {
  VerifyCPF,
  FormatCpf,
  FormatCnpj,
  VerifyCNPJ,
} from "../../../utils/utils";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

//validação do formulário com yup
const schema = Yup.object().shape({
  name: Yup.string().required("O campo nome é obrigatório"),
  surname: Yup.string().required("O campo sobrenome é obrigatório"),
  email: Yup.string()
    .email("Email inválido")
    .required("O campo email é obrigatório"),
  telephone: Yup.string().required("O campo telefone é obrigatório"),
  cell_phone: Yup.string()
    .min(10, "10 digitos no mínimo")
    .max(11, "11 digitos no máximo")
    .required("O campo celular é obrigatório"),
  birthday: Yup.string().required("O campo data de nascimento é obrigatório"),
  cep: Yup.string().required("O campo cep é obrigatório"),
  state: Yup.string().required("O campo estado é obrigatório"),
  city: Yup.string().required("O campo cidade é obrigatório"),
  cpf_cnpj: Yup.string()
    .min(11, "11 carácteres no mínimo")
    .max(15, "15 carácteres no máximo")
    .required("O campo cpf-cnpj é obrigatório"),
  value: Yup.string().required("O campo valor é obrigatório"),
  about_firgun: Yup.string().required("O campo sobre a firgun é obrigatório"),
  credit_motive: Yup.string().required(
    "O campo motivo do crédito é obrigatório"
  ),
});

export default function Alteracao() {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cell_phone, setCell_phone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cep, setCep] = useState("");
  const [state, setStates] = useState("");
  const [city, setCity] = useState("");
  const [cpf_cnpj, setCpf_cnpj] = useState("");
  const [value, setValue] = useState(0);
  const [about_firgun, setAbout_firgun] = useState("");
  const [credit_motive, setCredit_motive] = useState("");

  const data = {
    name,
    surname,
    email,
    telephone,
    cell_phone,
    birthday,
    cep,
    state,
    city,
    cpf_cnpj,
    value,
    about_firgun,
    credit_motive,
  };

  const [recordId, setRecordId] = useState("");

  const history = useHistory();

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin");

  if (userId === null) {
    history.push("/");
  }

  //faz a requisição e preenche automaticamente todos os campos
  //com os dados de cadastro na posição 0.
  useEffect(() => {
    async function fecthData() {
      const response = await api.get("users/registrations", {
        headers: { user_id: userId },
      });
      setRecordId(response.data[0].id);
      setName(response.data[0].name);
      setSurname(response.data[0].surname);
      setEmail(response.data[0].email);
      setTelephone(response.data[0].telephone);
      setCell_phone(response.data[0].cell_phone);
      setBirthday(response.data[0].birthday);
      setCep(response.data[0].cep);
      setStates(response.data[0].state);
      setCity(response.data[0].city);
      setCpf_cnpj(response.data[0].cpf_cnpj);
      setValue(response.data[0].value);
      setAbout_firgun(response.data[0].about_firgun);
      setCredit_motive(response.data[0].credit_motive);
    }

    fecthData();
  }, [userId]);

  function sideDrawerClosedHandler() {
    setShowSideDrawer(false);
  }

  function sideDrawerToggleHandler() {
    setShowSideDrawer((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  async function recordEditHandler() {
    if (cpf_cnpj.length === 11) {
      if (FormatCpf(cpf_cnpj) && VerifyCPF(cpf_cnpj)) {
        try {
          await api.put(`/users/${recordId}/registrations`, data, {
            headers: { user_id: userId },
          });
          toast.success("Cadastro alterado com sucesso!");
          history.push("/consult");
        } catch (err) {
          toast.error("Erro ao atualizar os dados, tente novamente.");
        }
      } else {
        toast.error(`O CPF ${cpf_cnpj} é inválido, tente novamente.`);
      }
    } else {
      if (FormatCnpj(cpf_cnpj) && VerifyCNPJ(cpf_cnpj)) {
        try {
          await api.put(`/users/${recordId}/registrations`, data, {
            headers: { user_id: userId },
          });
          toast.success("Cadastro alterado com sucesso!");
          history.push("/consult");
        } catch (err) {
          toast.error("Erro ao atualizar os dados, tente novamente.");
        }
      } else {
        toast.error(`O CNPJ ${cpf_cnpj} é inválido, tente novamente.`);
      }
    }
  }

  return (
    <div className="alteracao-container">
      <div className="introduction">
        <Backdrop show={showSideDrawer} clicked={sideDrawerClosedHandler} />
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer
          open={showSideDrawer}
          closed={sideDrawerClosedHandler}
          isAdmin={isAdmin}
        />
        <Introduction title="Fazer Alteração de Dados" />
      </div>

      <Form onSubmit={recordEditHandler} autoComplete="off" schema={schema}>
        <h2>Alterar Dados</h2>
        <div className="input-group">
          <label htmlFor="name">
            Nome *
            <Input
              id="name"
              name="name"
              placeholder="Digite o seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="surname">
            Sobrenome *
            <Input
              id="surname"
              name="surname"
              placeholder="Digite o seu Sobrenome"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="email">
            Email *
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Digite o seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="telephone">
            Telefone *
            <Input
              type="number"
              id="telephone"
              name="telephone"
              placeholder="Número de telefone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              autoComplete="off"
            />
          </label>
          <label htmlFor="cell_phone">
            Celular *
            <Input
              type="number"
              id="cell_phone"
              name="cell_phone"
              placeholder="Número de celular"
              value={cell_phone}
              onChange={(e) => setCell_phone(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="birthday">
            Data de nascimento *
            <Input
              type="date"
              id="birthday"
              name="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </label>
          <label htmlFor="cep">
            Cep * (apenas números)
            <Input
              id="cep"
              placeholder="Digite seu cep"
              name="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="state">
            Estado *
            <Input
              id="state"
              name="state"
              placeholder="Estado"
              value={state}
              onChange={(e) => setStates(e.target.value)}
            />
          </label>
          <label htmlFor="city">
            Cidade *
            <Input
              id="city"
              placeholder="Cidade"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="cpf">
            CPF ou CNPJ *
            <Input
              id="cpf"
              name="cpf_cnpj"
              placeholder="Digite apenas números"
              value={cpf_cnpj}
              onChange={(e) => setCpf_cnpj(e.target.value)}
            />
          </label>
          <label htmlFor="value">
            Valor desejado *
            <Input
              id="value"
              type="number"
              name="value"
              placeholder="Valor desejado"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="about_firgun">
            Como soube da Firgun ?
            <Select
              id="about_firgun"
              name="about_firgun"
              value={about_firgun}
              placeholder="Selecione uma opção"
              options={[
                { id: "Facebook", title: "Facebook" },
                { id: "Instagram", title: "Instagram" },
                { id: "Email Marketing", title: "Email Marketing" },
              ]}
              onChange={(e) => setAbout_firgun(e.target.value)}
            ></Select>
          </label>
          <label htmlFor="credit_motive">
            Motivo do Crédito ?
            <Select
              name="credit_motive"
              placeholder="Selecione uma opção"
              value={credit_motive}
              options={[
                { id: "Aquisição de Imóvel1", title: "Aquisição de Imóvel" },
                { id: "Compra de um Pc", title: "Compra de um Pc" },
                { id: "Viagem", title: "Viagem" },
              ]}
              onChange={(e) => setCredit_motive(e.target.value)}
            ></Select>
          </label>
        </div>
        <button type="submit" className="btn-submit">
          Salvar
        </button>
      </Form>
    </div>
  );
}
