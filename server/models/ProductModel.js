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
    category: {
        type:String,
        required:true,
    },
    price: {
        type:String,
        required:true,
    },
    image: {
        type:String,
        required:false,
    },
})

module.exports = mongoose.model("ProductModel", ProductSchema)