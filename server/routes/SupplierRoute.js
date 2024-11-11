const express = require("express");
const router = express.Router();
const SupplierController = require("../controllers/SupplierController");


router.get("/",SupplierController.getAllSuppliers)
router.post("/",SupplierController.addSupplier)
router.get("/:id",SupplierController.getById)
router.put("/:id",SupplierController.updateSupplier)
router.delete("/:id",SupplierController.deleteSupplier)

module.exports = router;