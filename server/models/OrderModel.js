const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    order_id: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    shipping_address: {
        type:String,
        required:true,
    },
    order_status: {
        type:String,
        required:true,
    },
    contact_number: {
        type:String,
        required:true,
    },
})

module.exports = mongoose.model("OrderModel", OrderSchema)