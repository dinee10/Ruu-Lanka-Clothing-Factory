const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
    },
    title: {
        type: String,
        required:true,
    },
    message: {
        type: String,
        required:true,
    },
})

module.exports = mongoose.model("FeedbackModel", FeedbackSchema)