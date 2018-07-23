    "use strict";
    
    const mongoose = require('mongoose');
    const timestamps = require('mongoose-timestamp');
    const ObjectId = mongoose.Schema.Types.ObjectId;
    
    const TodoSchema = new mongoose.Schema(
      {
        user: {
            type: ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
      },
      { minimize: false }
    );
    
    TodoSchema.plugin(timestamps);
    
    const Todo = mongoose.model('Todo', TodoSchema);
    module.exports = Todo;
