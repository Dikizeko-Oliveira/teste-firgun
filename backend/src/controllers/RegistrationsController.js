const { Op } = require("sequelize");
const Registrations = require("../models/Registrations");
const User = require("../models/User");

module.exports = {
  /**
   * Faz a listagem dos registros/cadastros relacionados
   * a um determinado usuário
   */
  async index(req, res) {
    const { user_id } = req.headers;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    /**
     * Verifica se o usuário logado é admin, caso for terá acesso de visualição
     * de todos os cadastros, caso contrário, o usuário terá apenas acesso aos
     * seus dados.
     */
    if (user.isAdmin) {
      const records = await Registrations.findAll();
      return res.json(records);
    } else {
      const records = await Registrations.findAll({
        where: {
          user_id: {
            [Op.eq]: user_id,
          },
        },
      });
      return res.json(records);
    }
  },

  //Faz o registro/cadastro de um determinado usuário
  async store(req, res) {
    const { user_id } = req.headers;
    const { name, surname, email, telephone, cell_phone, cep } = req.body;
    const { birthday, cpf_cnpj, value, about_firgun, credit_motive } = req.body;
    const { state, city } = req.body;

    const user = await User.findByPk(user_id);

    //Verifica se o usuário existe
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    //Verifica se o usuário logado é admin e não permite a criação de registro
    if (user.isAdmin) {
      return res.status(400).json({
        error: "User not allowed to create a record",
      });
    }

    const verifyCpfCnpj = await Registrations.findOne({
      where: {
        cpf_cnpj: {
          [Op.eq]: cpf_cnpj,
        },
      },
    });

    //Verifica se o CPF ou CNPJ já existe
    if (verifyCpfCnpj) {
      return res.status(400).json({
        error: "CPF or CNPJ already exists",
      });
    }

    const registrations = await Registrations.create({
      name,
      surname,
      email,
      telephone,
      cell_phone,
      cep,
      birthday,
      state,
      city,
      cpf_cnpj,
      value,
      about_firgun,
      credit_motive,
      user_id,
    });

    return res.json(registrations);
  },

  //Faz a edição/alteração de um registro/cadastro
  async update(req, res) {
    const { regist_id } = req.params;
    const { user_id } = req.headers;
    const { name, surname, email, telephone, cell_phone, cep } = req.body;
    const { birthday, cpf_cnpj, value, about_firgun, credit_motive } = req.body;
    const { state, city } = req.body;

    const user = await User.findByPk(user_id);

    //Verifica se o usuário existe
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    //Verifica se o usuário logado é admin e não permite a edição de registro
    if (user.isAdmin) {
      return res.status(400).json({
        error: "User not allowed to edit a record",
      });
    }

    const record = await Registrations.findByPk(regist_id);

    // Verifica se o cadastro existe e se o id do usuário logado é o mesmo
    // do usuário que criou o cadastro, para poder editar
    if (!record || record.user_id != user_id) {
      return res.status(400).json({
        error: "Record not found or you're not allowed to edit",
      });
    }

    await Registrations.update(
      {
        name,
        surname,
        email,
        telephone,
        cell_phone,
        cep,
        birthday,
        state,
        city,
        cpf_cnpj,
        value,
        about_firgun,
        credit_motive,
      },
      {
        where: {
          [Op.and]: [{ id: regist_id }, { user_id: user_id }],
        },
      }
    );

    return res.json({ message: "Update has been sucessfully" });
  },
};
