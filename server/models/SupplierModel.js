const mongoose = require("mongoose")

const SupplierSchema = new mongoose.Schema({
    supplier_id: {
        type: String,
        required: true ,
    },
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
    },
    item: {
        type: String,
        default: true, 
    },
    contact_no: {
        type: String,
        default: true, 
    }
    
});

module.exports = mongoose.model("Supplier", SupplierSchema);