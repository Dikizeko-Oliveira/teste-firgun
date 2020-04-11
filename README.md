<p align="center" >
  <img src="https://www.firgun.com.br/images/sobre/sobre_3.png" height="200" width="200" alt="Teste f" />
</p>

<h3 align="center">
 aplicação do teste da firgun 
</h3>

<br>

## Descrição

Aplicação de cadastro de pedidos, realiza cadastros de pedidos de usuários registrados no sistema, os mesmos poderão consultar e alterar seus dados. O admin apenas visualiza todos os cadastros feitos por esses usuários sem poder alterá-los já que não é o proprietário dos dados.
A aplicação não  permite um novo cadastro  de um cpf ou cnpj já registrado no sistema, ou seja cada usuário poderá fazer apenas um pedido por cpf ou cnpj.

- NOTA : Já existe um usuário padrão admin cadastrado no banco de dados. com o email de acesso = admin@gmail.com e senha = admin.

## Tecnologias

### Backend
- Node.js
- Express
- Celebrate
- Sequelize
- MySql

### Frontend
- React.js
- Axios
- Rockeseat/unform
- Yup
- Toastify

## Como usar
- git clone https://github.com/Dikizeko-Oliveira/teste-firgun.git 
### Backend

```
- cd backend.
- code . ou abra a pasta backend no editor de texto.
- yarn ou npm install.
- yarn add sequelize ou npm install --save sequelize
- npx sequelize db:create `**cria o banco de dados**`.
abra a pasta db, localizada na pasta backend e importe o arquivo Dumpt_teste_firgun.sql para o banco de dados
`**teste_firgun**` que acabaras de criar no passo anterior.
- execute yarn dev ou npm run dev para startar o servidor
```

### Frontend

```
- cd frontend
- code . ou abra a pasta frontend no editor de texto
- yarn ou npm install
- yarn start ou npm start para startar o sistema
```
