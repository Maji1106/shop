const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const shop = sequelize.define("Shop", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // ค่าเพิ่มอัตโนมัติ
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // ห้ามเป็นค่าว่าง
        unique: true, // ชื่อร้านค้าต้องไม่ซ้ำ
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false, // ห้ามเป็นค่าว่าง
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true, // อนุญาตให้เว้นค่าว่าง (กรณีร้านไม่มีภาพ)
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false, // ประเภทของร้านค้า (เช่น อาหาร, เสื้อผ้า)
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, // รายละเอียดเพิ่มเติมเกี่ยวกับร้านค้า (ไม่บังคับใส่)
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true, // เบอร์โทรศัพท์ร้าน (อาจไม่ใส่ก็ได้)
        validate: {
            is: /^[0-9\-\+]{9,15}$/i, // ตรวจสอบรูปแบบเบอร์โทรศัพท์ (ตัวเลข 9-15 หลัก)
        },
    },
    openingHours: {
        type: DataTypes.STRING,
        allowNull: true, // เวลาเปิด-ปิดร้าน
    },
    isOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // ระบุสถานะร้านเปิด (ค่าเริ่มต้นคือเปิด)
    },
});


shop.sync({ alter: true })
  .then(() => {
      console.log("Shop table created or updated successfully.");
  })
  .catch((error) => {
      console.log("Error creating or updating Shop table:", error);
  });


module.exports = shop;
