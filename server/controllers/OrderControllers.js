const Order = require("../models/OrderModel");
const nodemailer = require('nodemailer');
require('dotenv').config();

//Display all orders
const getAllOrders = async (req, res) => {
    let orders;

    try{
        orders = await Order.find();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching orders" });
    }

    //If no orders found
    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "Order not found" });
    }
    //display all orders
    return res.status(200).json({ orders });
};

//Insert a new order
const addOrder = async (req, res) => {
    const {order_id, name, shipping_address, order_status, contact_number} = req.body;
  
    let order;

    try{
        order = new Order({order_id, name, shipping_address, order_status, contact_number});
        await order.save();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add order" });
    }

    return res.status(201).json({ order });
}

//Get an order by ID
const getById = async (req, res) => {
    const id = req.params.id;

    let order;

    try{
        order = await Order.findById(id);
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching order" });
    }

    //If order not found
    if(!order){
        return res.status(404).json({message:"Order not found"});
    }
    return res.status(200).json({ order });

}

//Update an order
const updateOrder = async (req, res) => {
    const id = req.params.id;
    const {order_id, name, shipping_address, order_status, contact_number} = req.body;
    
    let order;

    try{
        order = await Order.findById(id);

        // If product doesn't exist
        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }

        order = await Order.findByIdAndUpdate(id, {order_id: order_id, name: name, shipping_address: shipping_address, order_status: order_status, contact_number: contact_number}, {new: true});
        order = await order.save();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to update order" });
    }
    
    return res.status(200).json({ order });
}

//Delete an order
const deleteOrder = async (req, res) => {
    const id = req.params.id;

    let order;

    try {
        order = await Order.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while deleting order" });
    }

    //If order not found for deletion
    if(!order){
        return res.status(404).json({ message: "Order not delete" });
    }
    return res.status(200).json({ message: "Order deleted successfully", order });
}





const sendOrderEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Details for Order #${order.order_id}`,
      text: `Here are the details for your order:\n
             Order ID: ${order.order_id}\n
             Name: ${order.name}\n
             Shipping Address: ${order.shipping_address}\n
             Order Status: ${order.order_status}\n
             Contact Number: ${order.contact_number}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        res.json({ message: 'Email sent successfully', info });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
    getAllOrders,
    addOrder,
    getById,
    updateOrder,
    deleteOrder,
    sendOrderEmail,
};