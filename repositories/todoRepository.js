    "use strict";
    
    const Todo = require('../models/todo');
    const Q = require("q");
    const errors = require('restify-errors');
    
    /**
     * @param {*} data 
     */
    function save(data) {
      const deferred = Q.defer();
      let todo = new Todo(data);
    
      todo.save(function (error, result) {
        if (error) {
            console.error(error);
            deferred.reject(new errors.InvalidContentError(error.message));
        } else {
            deferred.resolve(result);
        }
      });
    
      return deferred.promise;
    }
    
    /**
     * @param id
     * @param data
     * @returns {*|promise}
     */
    function update(id, data) {
      const deferred = Q.defer();
    
      Todo.update({ _id: id }, data, function (error, updated) {
        if (error) {
            deferred.reject(new errors.InvalidContentError(error.message));
        } else {
            deferred.resolve(updated);
        }
      });
    
      return deferred.promise;
    }
    
    /**
     *
     * @param params
     * @returns {*|promise}
     */
    function getList(params) {
      const deferred = Q.defer();
    
      Todo.find({})
          .populate('user')
          .exec(function (error, todos) {
            if (error) {
              console.error(error);
              deferred.reject(
                new errors.InvalidContentError(error.message)
              );
            } else {
              deferred.resolve(todos);
            }
          });
    
      return deferred.promise;
    }
    
    /**
     *
     * @param id
     * @returns {*|promise}
     */
    function findById(id) {
      const deferred = Q.defer();
    
      Todo.findOne({ _id: id })
          .populate('user')
          .exec(function (error, todo) {
             if (error) {
               console.error(error);
               deferred.reject(new errors.InvalidContentError(error.message));
             } else if (!todo) {
               deferred.reject(new errors.ResourceNotFoundError(
                'The resource you requested could not be found.'
               ));
             } else {
               deferred.resolve(todo);
             }
          });
    
      return deferred.promise;
    }
    
    /**
     * @param id
     * @returns {*|promise}
     */
    function remove(id) {
      const deferred = Q.defer();
    
      Todo.remove({ _id: id }, function(error) {
        if (error) {
            console.error(error);
            deferred.reject(
                new errors.InvalidContentError(error.message)
            );
        } else {
            deferred.resolve(true);
        }
      });
    
      return deferred.promise;
    }
    
    module.exports = {
      save: save,
      update: update,
      remove: remove,
      findById: findById,
      getList: getList
    };

