const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        let adminData = {
            Id:decoded.Id,
            Name:decoded.Name,
            Phone:decoded.Phone,
            Email:decoded.Email,
            Company:decoded.Company
        }
        req.adminData = adminData;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            Error: error
        });
    }
};