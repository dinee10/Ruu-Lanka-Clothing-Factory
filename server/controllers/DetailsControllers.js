const Detail = require("../models/DetailsModel")


//Display all details
const getAllDetails = async (req, res) => {
    let details;

    try{
        details = await Detail.find();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching orders" });
    }

    //If no orders found
    if (!details || details.length === 0) {
        return res.status(404).json({ message: "Order not found" });
    }
    //display all orders
    return res.status(200).json({ details });
};

//Insert a new deials
const addDetail = async (req, res) => {
    const {name, email, shipping_address, contact_number} = req.body;
  
    let detail;

    try{
        detail = new Detail({name, email, shipping_address, contact_number});
        await detail.save();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add detail" });
    }

    return res.status(201).json({ detail });
}

//Delete details
const deleteDetail = async (req, res) => {
    const id = req.params.id;

    let detail;

    try {
        detail = await Detail.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while deleting detail" });
    }

    //If order not found for deletion
    if(!detail){
        return res.status(404).json({ message: "Order not delete" });
    }
    return res.status(200).json({ message: "Details deleted successfully", detail });
}

module.exports = {
    getAllDetails,
    addDetail,
    deleteDetail,
}