const Cart = require('../models/CartModel');

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const productIndex = cart.items.findIndex(item => item.productId === productId);
        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add to cart' });
    }
};

// Get Cart for a User
const getCart = async (req, res) => {
    const { userId } = req.params; // Assuming userId is passed in the route params
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

// Remove Product from Cart
const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.items.findIndex(item => item.productId === productId);
        if (productIndex > -1) {
            cart.items.splice(productIndex, 1); // Remove the product
            await cart.save();
            return res.status(200).json(cart);
        }

        res.status(404).json({ message: 'Product not found in cart' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
};


// Update Product Quantity in Cart
const updateCartQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.items.findIndex(item => item.productId === productId);
        if (productIndex > -1) {
            cart.items[productIndex].quantity = quantity; // Update quantity
            await cart.save();
            return res.status(200).json(cart);
        }

        res.status(404).json({ message: 'Product not found in cart' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product quantity in cart' });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity,
}
