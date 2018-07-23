    "use strict";

    const TodoController = require('../controllers/todoController');

    module.exports = function(server){
      /**
       * POST
       */
      server.post('/api/v1/todos',  TodoController.create);

      /**
       * LIST
       */
      server.get('/api/v1/todos',  TodoController.list);

      /**
       * GET
       */
      server.get('/api/v1/todos/:id',  TodoController.one);

      /**
       * UPDATE
       */
      server.put('/api/v1/todos/:id',  TodoController.update);

      /**
       * DELETE
       */
      server.del('/api/v1/todos/:id',  TodoController.remove);
    };
