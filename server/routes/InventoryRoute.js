const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/InventoryController");


router.get("/",InventoryController.getAllInventory)
router.post("/",InventoryController.createInventory)
router.get("/:id",InventoryController.getInventoryById)
router.put("/:id",InventoryController.updateInventory)
router.delete("/:id",InventoryController.deleteInventory)

module.exports = router;