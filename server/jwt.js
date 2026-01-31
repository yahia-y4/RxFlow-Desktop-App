const jwt = require('jsonwebtoken');
const secretKey = 'yahia123456798'; 
function generateToken(user) {
    const payload = {
        id: user.id,
        UserName: user.UserName,
        Email: user.Email,
        Role: user.Role
    };
    return jwt.sign(payload, secretKey);
}

module.exports = {
    generateToken,
    secretKey
};