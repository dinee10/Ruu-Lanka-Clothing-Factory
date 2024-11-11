const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    DID:{
        type: String,
        required: true 
    },
    name: {
        type: String,
         
    },
    licenseNumber: {
        type: String,
        required: true 
    },
    phoneNumber: {
        type: String,
        required: true 
    },
    isAvailable: {
        type: Boolean,
        default: true 
    }
    
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;