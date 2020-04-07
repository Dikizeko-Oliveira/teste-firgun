import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

import api from "../../../services/api";

import logoImg from "../../../assets/logo.png";
import Introduction from "../../../components/Introduction";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const [isSignin, setIsSignin] = useState(true);

  function switchAuthModeHandler() {
    setIsSignin(!isSignin);
  }

  const data = {
    email,
    password,
  };

  async function handleLogin(e) {
    e.preventDefault();

    if (isSignin) {
      try {
        const response = await api.post("sessions", data);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        toast.success(`Login feito com sucesso! :), usuário ${email}`);
        history.push("/consult");
      } catch (err) {
        setPassword("");
        toast.error("Falha ao fazer login, Email ou Senha incorretos.");
      }
    } else {
      try {
        await api.post("users", data);
        toast.success("Usuário criado com sucesso! :)");
        setIsSignin(true);
        setEmail("");
        setPassword("");
      } catch (err) {
        toast.error("Falha ao fazer cadastro, tente novamente.");
      }
    }
  }

  return (
    <div className="logon-container">
      <div className="introduction">
        <img src={logoImg} alt="Logo" />
        <Introduction title="Fazer Login" />
      </div>

      <form onSubmit={handleLogin} autoComplete="off">
        <div className="form-top">
          <h2>{isSignin ? "Logar" : "Cadastre-se"}</h2>
          <strong onClick={switchAuthModeHandler}>
            {isSignin ? "Não tenho cadastro" : "Fazer login"}
          </strong>
        </div>
        <div className="input-group">
          <label htmlFor="email">
            Email *
            <input
              id="email"
              placeholder="Digite o seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password *
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="btn-submit">
          {isSignin ? "Logar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
