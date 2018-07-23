    "use strict";

    const TodoRepository = require('../repositories/todoRepository');

    /**
     * @param req
     * @param res
     * @param next
     */
    function create(req, res, next) {
      let data = req.body || {};

      TodoRepository.save(data)
        .then(function (todo) {
            res.send(201, todo);
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

      TodoRepository
        .update(data._id, data)
        .then(function (todo) {
            res.send(200, todo);
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
      TodoRepository
        .getList()
        .then(function (todos) {
            res.send(todos);
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
      TodoRepository
        .findById(req.params.id)
        .then(function (todo) {
            res.send(todo);
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
      TodoRepository
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
