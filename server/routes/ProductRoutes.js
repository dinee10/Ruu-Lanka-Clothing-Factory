const express = require("express")
const router = express.Router()

//insert model
const product = require("../models/ProductModel")
//insert product controller
const ProductControllers = require("../controllers/ProductControllers")

router.get("/",ProductControllers.getAllProducts)
router.post("/",ProductControllers.addProduct)
router.get("/:id",ProductControllers.getById)
router.put("/:id",ProductControllers.updateProduct)
router.delete("/:id",ProductControllers.deleteProduct)

//export
module.exports = router;