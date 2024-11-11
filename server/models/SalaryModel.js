const mongoose = require("mongoose")

const SalarySchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    },
    division: {
        type: String,
        required: true,
    },
    attendance: {
        type: Number,
        required: true,
    },
    salaryPerDay: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("Salary", SalarySchema)