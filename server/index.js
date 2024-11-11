const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProductRoutes = require('./routes/ProductRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
const DetailsRoutes = require('./routes/DetailsRoutes');
const CartRoutes = require('./routes/CartRoutes') //should delete
const DeliveryRoute = require('./routes/DeliveryRoute')
const DriverRoute = require('./routes/DriverRoute')
const FeedbackRoute = require('./routes/FeedbackRoute')
const EmployeeRoute = require('./routes/EmployeeRoute')
const SalaryRoute = require('./routes/SalaryRoute')
const SupplierRoute = require('./routes/SupplierRoute')
const InventoryRoute = require('./routes/InventoryRoute')
const UserRoute = require('./routes/UserRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public/images'));
app.use(express.json({ extended: false }));

// Routes
app.use('/product', ProductRoutes);
app.use('/order', OrderRoutes);
app.use('/detail', DetailsRoutes)
app.use('/cart', CartRoutes) // should delete
app.use('/delivery', DeliveryRoute)
app.use('/driver', DriverRoute)
app.use('/feedback', FeedbackRoute)
app.use('/employee', EmployeeRoute)
app.use('/salary', SalaryRoute)
app.use('/supplier', SupplierRoute)
app.use('/inventory', InventoryRoute)
app.use('/users', UserRoute);  // Register and login routes
//app.use('/admin', authMiddleware, adminRoutes);  // Protect all admin routes

// Connect to MongoDB
mongoose.connect("mongodb+srv://catalogManager:CatalogManager8@cluster0.6rmpb.mongodb.net/myDatabase?retryWrites=true&w=majority")
    .then(() => console.log('Connected to Product MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(5174, () => {
    console.log("Server is running");
});