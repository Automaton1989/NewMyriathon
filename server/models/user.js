var mongoose = require('mongoose')
var MyriathonUserSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: [true, "You must have a username of at least 3 characters"],
        minlength: 3
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    },
    {timestamps : true});

var User = mongoose.model('User', MyriathonUserSchema);