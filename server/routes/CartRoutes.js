const express = require("express");
const router = express.Router();
const CartControllers = require("../controllers/CartControllers");

router.post('/add', CartControllers.addToCart);
router.get('/:userId', CartControllers.getCart);
router.delete('/remove', CartControllers.removeFromCart);
router.put('/update', CartControllers.updateCartQuantity);

module.exports = router;