var jwt = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        var token = req.headers['x-access-token'];
        if(token) {
            jwt.verify(token, 'secret key', (err, decoded) => {
                if (err) {
                    return res.status(500).send({
                        valid: false,
                        message: 'Token invalid.'
                    })
                } else {
                    req.decoded = decoded;
                    next()
                }
            })
        } else {
            return res.status(403).send({
                valid: false,
                message: 'Token not set, please login'
            })
        }
    }
}