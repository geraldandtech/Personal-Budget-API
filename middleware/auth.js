const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({message: 'Access token required'})
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECTRET,
        (error, decoded) => {
            if (error) {
                res.status(403).json({message: 'Invalid token'})
            }
            req.user = decoded;
            next();
        }
    );
    
}

module.exports = authenticateToken;