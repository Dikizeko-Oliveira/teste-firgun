const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Registrations = require("../models/Registrations");

const connection = new Sequelize(dbConfig);

User.init(connection);
Registrations.init(connection);

User.associate(connection.models);
Registrations.associate(connection.models);

module.exports = connection;
