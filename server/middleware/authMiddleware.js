const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');  // Token will be sent in request headers
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');  // Verify the token
        req.user = decoded.user;  // Attach the user object to the request for use in the next function
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
