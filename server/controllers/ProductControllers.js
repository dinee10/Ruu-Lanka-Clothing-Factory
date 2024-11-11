const Product = require("../models/ProductModel");
const multer = require('multer');
const path = require('path');

// Set up multer for handling image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Store images in the public/images directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add a unique timestamp to the file name
    },
});

const upload = multer({ storage: storage });

// Display all products
const getAllProducts = async (req, res) => {
    let products;

    try {
        products = await Product.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error while fetching products" });
    }

    // If no products found
    if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ products });
};

// Insert a new product
const addProduct = async (req, res) => {
    const { product_id, name, description, category, price } = req.body;
    const image = req.file ? req.file.filename : "";

    let product;

    try {
        product = new Product({ product_id, name, description, category, price, image });
        await product.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to add product" });
    }

    return res.status(201).json({ product });
};

// Get a product by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    let product;

    try {
        product = await Product.findById(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error while fetching product" });
    }

    // If product not found
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
};

// Update a product
const updateProduct = async (req, res, next) => {
    const id = req.params.id;
    const { product_id, name, description, category, price } = req.body;
    let image = req.file ? req.file.filename : null;

    let product;

    try {
        product = await Product.findById(id);

        // If product doesn't exist
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Use the existing image if a new one is not provided
        if (!image) {
            image = product.image;
        }

        product = await Product.findByIdAndUpdate(id, { product_id: product_id, name: name, description: description, category: category, price: price, image: image }, { new: true });
        product = await product.save()
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to update product" });
    }

    return res.status(200).json({ product });
};

// Delete a product
const deleteProduct = async (req, res) => {
    const id = req.params.id;

    let product;

    try {
        product = await Product.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error while deleting product" });
    }

    // If product not found for deletion
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully", product });
}

module.exports = {
    getAllProducts,
    addProduct: [upload.single('image'), addProduct],
    getById,
    updateProduct: [upload.single('image'), updateProduct],
    deleteProduct
};
