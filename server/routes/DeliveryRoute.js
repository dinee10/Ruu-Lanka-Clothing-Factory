const express = require("express");
const router = express.Router();

//insert model
const Delivery = require("../models/DeliveryModel");
const Driver = require("../models/DriverModel");
//insert controller
const DeliveryController = require("../controllers/DeliveryController");

router.get("/",DeliveryController.getAllDeliveries);
router.post("/",DeliveryController.addDelivery);
router.get("/:id",DeliveryController.getById);
router.put("/:id",DeliveryController.updateDelivery);
router.delete("/:id",DeliveryController.deleteDelivery);


//export
module.exports = router;


