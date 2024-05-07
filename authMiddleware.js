const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
    try {

        if (!req.session.authorization) {
            return res.status(403).json({ message: 'User not logged in' });
        }

        const token = req.session.authorization.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, 'jwt_secret_key');
        const username = req.session.authorization.username;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.userId = user._id;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

exports.authorize = (requiredRole) => async (req, res, next) => {
    const username = req.body.username; 
    console.log('Username:', username);
    
    const user = await User.findOne({ username: username });
    
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next(); 
}


