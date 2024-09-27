const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    product_id: {
        type:String,
        required:true,//validate
    },
    name: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    material: {
        type:String,
        required:true,
    },
    price: {
        type:String,
        required:true,
    },
})

module.exports = mongoose.model("ProductModel", ProductSchema)