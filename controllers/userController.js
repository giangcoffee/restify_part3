    "use strict";

    const UserRepository = require('../repositories/userRepository');
    const HashService = require('../services/hashService');
    const errors = require('restify-errors');

    /**
     * @param req
     * @param res
     * @param next
     */
    function create(req, res, next) {
      let data = req.body || {};

      if (!data.password || !data.email) {
          return next(new errors.InvalidContentError('"password" và "email" không được để trống!'));
      }

      //encrypt plain password
      data.password = HashService.saltHashPassword(data.password);
      UserRepository.save(data)
        .then(function (user) {
            res.send(201, user);
            next();
        })
        .catch(function (error) {
            console.error(error);
            return next(error);
        })
        .done();
    }

    /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    function update(req, res, next) {
      let data = req.body || {};

      if (!data._id) {
        data = Object.assign({}, data, {_id: req.params.id});
      }

      UserRepository
        .update(data._id, data)
        .then(function (user) {
            res.send(200, user);
            next();
        })
        .catch(function (error) {
            console.error(error);
            return next(error);
        })
        .done();
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    function list(req, res, next) {
      UserRepository
        .getList()
        .then(function (users) {
            res.send(users);
            next();
        })
        .catch(function (error) {
            console.error(error);
            return next(error);
        })
        .done();
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    function one(req, res, next) {
      UserRepository
        .findById(req.params.id)
        .then(function (user) {
            res.send(user);
            next();
        })
        .catch(function (error) {
            console.log(error);
            return next(error);
        })
        .done();
    }

    /**
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    function remove(req, res, next) {
      UserRepository
        .remove(req.params.id)
        .then(function (deleted) {
            res.send(204);
            next();
        })
        .catch(function (error) {
            console.error(error);
            return next(error);
        })
        .done();
    }

    module.exports = {
      one: one,
      list: list,
      create: create,
      remove: remove,
      update: update
    };
