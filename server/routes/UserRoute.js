const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/authMiddleware');  // Import the middleware

// Register Route
router.post('/register', UserController.register);

// Login Route
router.post('/login', UserController.login);

// Protected Route Example: Only authenticated users can access this route
router.get('/profile', auth, (req, res) => {
    res.send(`Welcome, user with ID: ${req.user.id}`);  // req.user is set by the middleware
});

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById)
router.delete('/:id', UserController.deleteUser);

module.exports = router;
