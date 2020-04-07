const { Op } = require("sequelize");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.and]: [{ email: email }, { password: password }],
      },
      attributes: ["id", "isAdmin"],
    });

    //Verifica se o usuário existe no DB
    if (!user) {
      return res.status(400).json({
        error: "Email or Password are wrong",
      });
    }

    return res.json(user);
  },
};
