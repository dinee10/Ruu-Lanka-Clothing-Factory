const mongoose = require('mongoose')

const DeliverySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,//validate
    },
    email: {
        type:String,
        required:true,
    },
    shipping_address: {
        type:String,
        required:true,
    },
    contact_number: {
        type:String,
        required:true,
    },
})

module.exports = mongoose.model("DeliveryModel", DeliverySchema)