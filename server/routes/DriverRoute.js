const express = require("express");
const router = express.Router();

const Driver = require("../models/DriverModel");

const Drivercontroller = require("../controllers/DriverController");


router.post("/",Drivercontroller.addDriver);
router.get("/",Drivercontroller.getAvailableDrivers);
router.get("/:id",Drivercontroller.getAvailableDrivers);

module.exports = router;