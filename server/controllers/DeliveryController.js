const delivery = require("../models/DeliveryModel");
const Driver = require("../models/DriverModel");
const Order = require("../models/OrderModel")

//data display
const getAllDeliveries = async(req, res, next) => {
    
    let deliveries;
    //get all

    try{
        deliveries = await delivery.find().populate('driverId', 'name').populate('orderid', ' order_id name shipping_address contact_number');
    }catch(err){
        console.log(err);
    }

    //not found
    if(!deliveries){
        return res.status(404).json({message:"Delivery not found"})
    }

    //display all delivery
    return res.status(200).json({deliveries});
};

//insert data

const addDelivery = async(req, res, next) => {
    const{name,status,assignedAt,driverId,orderid} = req.body;

    let order;
    try {
        // Check if order exists
        order = await Order.findById(orderid);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Fetching order failed", error: err });
    }

    let newDelivery;

    try{
        newDelivery = new delivery({name, status: status, assignedAt, driverId, orderid});
        await newDelivery.save();
    }catch(err){
        console.log(err);
    }

    //not inser
    if(!newDelivery){
        return res.status(404).send({message:"unable to add driver to delivery"});
    }
    return res.status(200).json({delivery: newDelivery});
};

//get deliver by Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let Delivery;

    try {
        Delivery = await delivery.findById(id).populate('driverId', 'name').populate('orderid', 'order_id'); // Use correct model
    } catch (err) {
        return res.status(500).json({ message: "Fetching delivery failed", error: err });
    }

    if (!Delivery) {
        return res.status(404).json({ message: "Delivery not found" });
    }

    return res.status(200).json({ Delivery });
};

//update delivery details
const updateDelivery = async (req, res, next) => {
    const id = req.params.id;

    const{status,updatedAt} = req.body;

    let dElivery;
    try{
        dElivery = await delivery.findByIdAndUpdate(id, {status: status, updatedAt: updatedAt});
        dElivery = await dElivery.save();
    }catch(err){
        console.log(err);
    }
    if (!dElivery) {
        return res.status(404).json({ message: "Unable to update" });
    }

    return res.status(200).json({ dElivery });
};

//delete delivery
const deleteDelivery = async (req, res, next) => {
    const id = req.params.id;

    let Deliveries;

    try{
        Deliveries = await delivery.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if (!Deliveries) {
        return res.status(404).json({ message: "Unable to delete" });
    }

    return res.status(200).json({ Deliveries });

};

//get status by orderid


exports.getAllDeliveries = getAllDeliveries;
exports.addDelivery = addDelivery;
exports.getById = getById;
exports.updateDelivery = updateDelivery;
exports.deleteDelivery = deleteDelivery;


