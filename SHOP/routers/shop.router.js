const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");  // นำเข้า shop controller

// Route สำหรับสร้างร้านค้าใหม่
router.post("/shops", shopController.create);

// Route สำหรับดึงร้านค้าทั้งหมด
router.get("/shops", shopController.getAll);

// Route สำหรับดึงร้านค้าตาม ID
router.get("/shops/:id", shopController.getById);

// Route สำหรับอัพเดตร้านค้า
router.put("/shops/:id", shopController.update);

// Route สำหรับลบร้านค้า
router.delete("/shops/:id", shopController.delete);

module.exports = router;
