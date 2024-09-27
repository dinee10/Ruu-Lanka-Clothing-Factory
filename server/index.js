const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/ProductRoutes')
const ProductModel = require('./models/ProductModel')

const app = express()
//middleware
app.use(cors())
app.use(express.json())
app.use("/product",router)

mongoose.connect("mongodb+srv://catalogManager:CatalogManager8@cluster0.6rmpb.mongodb.net/myDatabase?retryWrites=true&w=majority")
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.get("/", (req, res) => {
    ProductModel.find({})
    .then(products => res.json(products))
    .catch(err => res.json(err))
})
 
app.get("/getProduct/:id", (req, res) => {
    const id = req.params.id;
    ProductModel.findById({_id:id})
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    ProductModel.findByIdAndUpdate({_id:id})
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    ProductModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})
app.listen(5174, () => {
    console.log("Server is running")
})