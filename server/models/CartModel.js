const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('CartModel', CartSchema);
