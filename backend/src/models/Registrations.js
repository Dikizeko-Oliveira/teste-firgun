const { Model, DataTypes } = require("sequelize");

class Registrations extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        email: DataTypes.STRING,
        telephone: DataTypes.INTEGER,
        cell_phone: DataTypes.STRING,
        birthday: DataTypes.DATEONLY,
        cep: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        cpf_cnpj: DataTypes.STRING,
        value: DataTypes.INTEGER,
        about_firgun: DataTypes.STRING,
        credit_motive: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Registrations;
