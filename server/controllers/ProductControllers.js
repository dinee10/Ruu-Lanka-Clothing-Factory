const Product = require("../models/ProductModel");

//display
const getAllProducts = async (req, res, next) => {
    let products;
    //get all products
    try{
        products = await Product.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!products){
        return res.status(404).json({message:"Product not found"})
    }
    //display all products
    return res.status(200).json({products});
};

//insert
const addProduct = async (req, res, next) => {
    const {product_id, name, description, material, price} = req.body;

    let product;

    try{
        product = new Product({product_id, name, description, material, price});
        await product.save();
    }catch (err) {
        console.log(err)
    }
    //not insert products
    if(!product){
        return res.status(404).json({message:"Unable to add products"});
    }
    return res.status(200).json({product});
}

//get by id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let product;

    try{
        product = await Product.findById(id);
    }catch (err) {
        console.log(err);
    }
    //not available products
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    return res.status(200).json({product});

}

//update
const updateProduct = async (req, res, next) => {
    const id = req.params.id;
    const {product_id, name, description, material, price} = req.body;

    let product;

    try{
        product = await Product.findByIdAndUpdate(id, {product_id: product_id, name: name, description: description, material: material, price: price});
        product = await product.save();
    }catch (err) {
        console.log(err);
    }

    //not update product
    if(!product){
        return res.status(404).json({message:"Product not update"});
    }
    return res.status(200).json({product});
}

//delete
const deleteProduct = async (req, res, next) => {
    const id = req.params.id;

    let product;

    try {
        product = await Product.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }

    //not delete product
    if(!product){
        return res.status(404).json({message:"Product not delete"});
    }
    return res.status(200).json({product});
}

module.exports = {
    getAllProducts,
    addProduct,
    getById,
    updateProduct,
    deleteProduct
};
