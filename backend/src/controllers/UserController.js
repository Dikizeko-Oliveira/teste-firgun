const { Op } = require("sequelize");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { user_id } = req.headers;

    const users = await User.findAll({
      where: {
        id: {
          [Op.eq]: user_id,
        },
      },
      attributes: ["email", "isAdmin"],
    });

    return res.json(users);
  },

  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.create({ email, password });

    return res.json(user);
  },
};
