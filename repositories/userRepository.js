    "use strict";
    
    const User = require('../models/user');
    const Q = require("q");
    const errors = require('restify-errors');
    
    /**
     * @param {*} data 
     */
    function save(data) {
      const deferred = Q.defer();
      let user = new User(data);
    
      user.save(function (error, result) {
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
    
      User.update({ _id: id }, data, function (error, updated) {
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
    
      User.find({}, function (error, users) {
        if (error) {
            console.error(error);
            deferred.reject(
                new errors.InvalidContentError(err.message)
            );
        } else {
            deferred.resolve(users);
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
    
      User.findOne({ _id: id }, function (error, user) {
        if (error) {
            console.error(error);
            deferred.reject(new errors.InvalidContentError(error.message));
        } else if (!user) {
            deferred.reject(new errors.ResourceNotFoundError(
                'The resource you requested could not be found.'
            ));
        } else {
            deferred.resolve(user);
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
    
      User.remove({ _id: id }, function(error) {
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

    /**
     *
     * @param usernameOrEmail
     * @returns {*|promise}
     */
    function findByUsernameOrEmail(usernameOrEmail) {
        const deferred = Q.defer();

        User
            .findOne({$or: [{username: usernameOrEmail}, {email: usernameOrEmail}]})
            .exec(function (err, user) {
                if (err) {
                    console.error(err);
                    deferred.reject(new errors.InvalidContentError(err.message));
                } else if (!user) {
                    deferred.reject(new errors.ResourceNotFoundError('The resource you requested could not be found.'));
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
    
    module.exports = {
      save: save,
      update: update,
      remove: remove,
      findById: findById,
      getList: getList,
      findByUsernameOrEmail: findByUsernameOrEmail
    };
