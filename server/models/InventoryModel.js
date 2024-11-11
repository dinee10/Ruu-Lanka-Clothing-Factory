const mongoose = require("mongoose")

const InventorySchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        default: null
    }
})

module.exports = mongoose.model("InventoryModel", InventorySchema)