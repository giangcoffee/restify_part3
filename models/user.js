   "use strict";
    
    const mongoose = require('mongoose');
    const timestamps = require('mongoose-timestamp');
    const ObjectId = mongoose.Schema.Types.ObjectId;
    
    const UserSchema = new mongoose.Schema(
      {
        name: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            default: ''
        },
        age: {
            type: Number,
            default: 0
        }
      },
      { minimize: false }
    );
    
    UserSchema.plugin(timestamps);
    
    
    const User = mongoose.model('User', UserSchema);
    module.exports = User;
