const jsonWebToken = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Use optional chaining

    if (!token) {
        return res.sendStatus(401);
    }

    jsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
