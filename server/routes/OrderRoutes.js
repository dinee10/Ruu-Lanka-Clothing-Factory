const express = require("express");
const router = express.Router();
const OrderControllers = require("../controllers/OrderControllers");

router.get("/",OrderControllers.getAllOrders)
router.post("/",OrderControllers.addOrder)
router.get("/:id",OrderControllers.getById)
router.put("/:id",OrderControllers.updateOrder)
router.delete("/:id",OrderControllers.deleteOrder)
router.post('/send-email/:id',OrderControllers.sendOrderEmail);

//export
module.exports = router;