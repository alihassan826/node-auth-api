const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
    const token = req.header['x-auth-token'];

    if (!token) {
        return res.status(400).json({ message: 'Token is not valid. Invalid api call'  })
    }

    jwt.verify(token, process.env.jwtSecret, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'token is invalid' });
        }

        req.userid = user.id;

        next();
    });
};
