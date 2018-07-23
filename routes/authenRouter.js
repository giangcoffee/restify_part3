const HashService = require('../services/hashService');
const UserRepository  = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (server) {

    /**
     * @method POST
     * Provided registered credential then get back a token for further access.
     */
    server.post('/api/v1/getToken', (req, res, next) => {
        UserRepository.findByUsernameOrEmail(req.body.username)
            .then(function (user) {
                let hashed = HashService.saltHashPassword(req.body.password, user.salt);
                if (hashed.passwordHash === user.password) {
                    const payload = {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        name: user.name,
                        photo: user.photo
                    };

                    let privateKey = fs.readFileSync('private.pem');
                    jwt.sign(payload, privateKey, {
                        expiresIn: '1d',
                        algorithm: 'RS256'
                    }, function (err, token) {
                        if (err) {
                            console.log(err);
                            return next(err);
                        } else {
                            // return the information including token as JSON
                            res.send({
                                id: user._id,
                                username: user.username,
                                token: token,
                                name: user.name,
                                email: user.email,
                                photo: user.photo
                            });
                            next();
                        }
                    });

                } else {
                    return next(new errors.InvalidCredentialsError('Invalid Credentials'));
                }
            })
            .catch(function (error) {
                console.error(error);
                return next(new errors.InvalidCredentialsError('Invalid Credentials'));
            })
            .done();
    });
}