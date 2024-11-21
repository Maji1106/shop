// models/db.setup.js

const sequelize = require("./db");
const Sequelize = require("sequelize");
const Shop = require("./shop.model");
const User = require("./user.model");
const Role = require("./role.model");
const Product = require("./product.model");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Shop = Shop;
db.User = User;
db.Role = Role;
db.Product = Product;


// Association
db.User.belongsToMany(db.Role, { through: "user_roles" });
db.Role.belongsToMany(db.User, { through: "user_roles" });



module.exports = db;