const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/EmployeeController");


router.get("/",EmployeeController.getAllEmployee)
router.post("/",EmployeeController.addEmployee)
router.get("/:id",EmployeeController.getById)
router.put("/:id",EmployeeController.updateEmployee)
router.delete("/:id",EmployeeController.deleteEmployee)

module.exports = router;