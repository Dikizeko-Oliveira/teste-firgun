const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const UserController = require("./controllers/UserController");
const Registrations = require("./controllers/RegistrationsController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

/// Usando celebrate para fazer validação dos formulários
routes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  SessionController.store
);

routes.get("/users", UserController.index);

routes.post(
  "/users",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  UserController.store
);

routes.get("/users/registrations", Registrations.index);

routes.post(
  "/users/registrations",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string().required().email(),
      telephone: Joi.number().required(),
      cell_phone: Joi.string().required().min(10).max(11),
      birthday: Joi.date().required(),
      cep: Joi.string().required(),
      cpf_cnpj: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      value: Joi.number().required(),
      about_firgun: Joi.string().required(),
      credit_motive: Joi.string().required(),
    }),
  }),
  Registrations.store
);

routes.put(
  "/users/:regist_id/registrations",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string().required().email(),
      telephone: Joi.number().required(),
      cell_phone: Joi.string().required().min(10).max(11),
      birthday: Joi.date().required(),
      cep: Joi.string().required(),
      cpf_cnpj: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      value: Joi.number().required(),
      about_firgun: Joi.string().required(),
      credit_motive: Joi.string().required(),
    }),
  }),
  Registrations.update
);

module.exports = routes;
