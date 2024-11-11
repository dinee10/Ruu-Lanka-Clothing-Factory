const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Assigned', 'Out for Delivery', 'Delivered'],
        required: true,
    },
    assignedAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver', // Reference to the Driver model
        default: null
    },
    orderid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderModel',
        default: null
    }
});

const delivery = mongoose.model("delivery", deliverySchema);
module.exports = delivery;
