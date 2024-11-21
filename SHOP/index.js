const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./models");
const cors = require("cors");
const authRoutes = require("./routers/auth.router"); // นำเข้าเส้นทางการตรวจสอบตัวตน
const shopRoutes = require("./routers/shop.router");  // นำเข้าเส้นทางสำหรับร้านค้า
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ใช้เส้นทางการตรวจสอบตัวตน
app.use('/api/v1/auth', authRoutes); 

// ใช้เส้นทางสำหรับร้านค้า
app.use("/api/v1", shopRoutes); 

app.get("/", (req, res) => {
  res.send("<h1>Hello ok API</h1>");
});

// ฟังก์ชันเพิ่ม role
const initRole = async () => {
  const existingRoles = await db.Role.findAll();
  if (existingRoles.length === 0) {
    await db.Role.create({ id: 1, name: "user" });
    await db.Role.create({ id: 2, name: "admin" });
    await db.Role.create({ id: 3, name: "moderator" });
  } else {
    console.log("Roles already exist.");
  }
};

// Sync all models at once
db.sequelize.sync({ alter: true })
  .then(async () => {
    console.log('All tables have been created or updated.');
    // await initRole();  // ถ้าต้องการเพิ่ม roles
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  })
  .catch((error) => {
    console.error('Error creating or updating tables:', error);
  });
