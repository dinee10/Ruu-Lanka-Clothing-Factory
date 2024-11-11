const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    emp_id: {
        type: String,
        required: true ,
    },
    name: {
        type: String,
        required: true, 
    },
    nic: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
    },
    age: {
        type: Number,
        default: true, 
    },
    division: {
        type: String,
        default: true, 
    },
    position: {
        type: String,
        default: true, 
    },
    contact_no: {
        type: String,
        default: true, 
    }
    
});

module.exports = mongoose.model("Employee", EmployeeSchema);