const { DataTypes } = require("sequelize");
const sequelize = require("./db");


// Define User Schema
const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, // เบอร์โทรศัพท์ (อาจไม่ใส่ก็ได้)
      validate: {
          is: /^[0-9\-\+]{9,15}$/i, // ตรวจสอบรูปแบบเบอร์โทรศัพท์ (ตัวเลข 9-15 หลัก)
      },
    }
});

User.sync({ alter: false })
  .then(() => {
    console.log("User table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating User table:", error);
  });


module.exports = User;