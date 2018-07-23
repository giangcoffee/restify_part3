"use strict";

const errors = require('restify-errors');
const AuthorizationService = require('../services/authorizationService');
const unless = require('express-unless');

const middleware = function(req, res, next) {
    let user = AuthorizationService.getUser(req);

    if(!user) {
        return next(
            new errors.UnauthorizedError("No token provided or token expired !")
        );
    }

    req.user = user;
    next()
};

middleware.unless = unless;

module.exports = middleware;