import * as jwt from 'jsonwebtoken';
import * as conf from 'config';

export let checkToken = function(req, res, next) {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, conf.get('secretKey'), function(err, decoded) {
            if (err) {
                return res.json({ status: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.tokenInfo = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            status: false,
            message: 'No token provided.'
        });

    }
};