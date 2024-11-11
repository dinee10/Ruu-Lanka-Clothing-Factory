const express = require("express");
const router = express.Router();
const DetailsControllers = require("../controllers/DetailsControllers");


router.get("/",DetailsControllers.getAllDetails)
router.post("/",DetailsControllers.addDetail)
router.delete("/:id",DetailsControllers.deleteDetail)

module.exports = router;