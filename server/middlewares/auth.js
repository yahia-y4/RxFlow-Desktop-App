const jwt = require('jsonwebtoken');
const { secretKey } = require('../jwt.js');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log('Invalid token');
            return res.status(403).json({ error: 'Invalid token' });
        }
        
        req.user = user;
        next();
    });
}

module.exports = authMiddleware;
