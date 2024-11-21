const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // ให้ค่า id เพิ่มขึ้นโดยอัตโนมัติ
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // กำหนดว่าไม่สามารถเว้นว่างได้
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // ราคาเก็บเป็นทศนิยม
        allowNull: false, // กำหนดว่าไม่สามารถเว้นว่างได้
        validate: {
            min: 0, // ราคาต้องไม่น้อยกว่า 0
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false, // กำหนดว่าไม่สามารถเว้นว่างได้
        validate: {
            min: 0, // จำนวนต้องไม่น้อยกว่า 0
        },
    },
    ean13: {
        type: DataTypes.STRING(13), // EAN-13 ต้องมีความยาว 13 ตัว
        allowNull: false, // กำหนดว่าไม่สามารถเว้นว่างได้
        validate: {
            is: /^[0-9]{13}$/i, // ตรวจสอบว่าเป็นตัวเลข 13 หลัก
        },
        unique: true, // กำหนดให้ EAN-13 ต้องไม่ซ้ำกัน
    },
});

Product.sync({ alter: true }) // ใช้ alter: true เพื่อให้โมเดลปรับปรุงตารางในฐานข้อมูล
    .then(() => {
        console.log("Product table created or updated successfully.");
    })
    .catch((error) => {
        console.error("Error creating or updating product table:", error);
    });

module.exports = Product;
