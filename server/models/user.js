var mongoose = require('mongoose')
var MyriathonUserSchema = new mongoose.Schema( 
    {
    username: {
        type: String,
        required: [true, "You must have a username of at least 3 characters"],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, "Your email must be at least3 characters!"],
        minlength: 3
    },
    password: {
        type: String,
        required: [true, "Your password must have length of at least 7 characters!"],
        minlength: 7
    },
    admin: {
        type: Boolean,
        default: false
    },
    },
    {timestamps : true});

var MyriathonVideoSchema = new mongoose.Schema(
    {
        title: 
        {
            type: String,
            required: [true, "You must have a title of at least 3 characters!"],
            minlength: 3
        },
        description:
        {
            type: String,
            default: ' '
        },
        videoURL:
        {
            type: String,
            required: [true, "You must have a URL to post this video!"]
        },
    },
    {timestamps: true}
);

var MyriathonSeasonSchema = new mongoose.Schema(
    {
        name: 
        {
            type: String,
            required: [true, "The season must have a title of at least 3 characters!"],
            minlength: 3
        },
        number: 
        {
            type: Number,
            required: [true, "Seasons must have a number associated with them"]
        },
        videos:
            [MyriathonVideoSchema]
    },
    {timestamps : true}
)

var User = mongoose.model('User', MyriathonUserSchema);
var Video = mongoose.model('Video', MyriathonVideoSchema);
var Season = mongoose.model('Season', MyriathonSeasonSchema);