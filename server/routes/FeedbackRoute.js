const express = require("express")
const router = express.Router();
const FeedbackController = require("../controllers/FeedbackController")

router.get("/",FeedbackController.getAllFeedback)
router.post("/",FeedbackController.addFeedback)
router.delete("/:id",FeedbackController.deleteFeedback)

module.exports = router;