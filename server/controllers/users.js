var mongoose = require('mongoose')
var bcryptjs = require("bcryptjs");
    User = mongoose.model('User')
    Video = mongoose.model('Video')
    Season = mongoose.model('Season')

var SecretPassword = "Automa1Whale"

module.exports = {
    index: function(req, res) {
        res.json({success : true})
    },

    //ADDING A NEW USER
    newUser: function(req, res) {
        console.log("We are in new user controller!");
        if(req.body.newUser.newSecretMessage != SecretPassword)
        {
            console.log("SecretMessages don't match!");
            res.json({success : false, msg: "You didn't put in the correct SecretMessage!!!"})
        }
        else
        {
            bcryptjs.hash(req.body.newUser.newPassword, 10)
            .then(hashed_password => {
                var user = new User({username: req.body.newUser.newUsername, email: req.body.newUser.newEmail, password: hashed_password});
                user.save(function(err, user) {
                    if(err) {
                        console.log(err);
                        res.json({success : false});
                    }
                    else {
                        req.session.email = req.body.newUser.newEmail;
                        res.json({success : true, user : user })
                    }
                })
            })
            .catch(error => {
                console.log(error)
                res.json({success : false})
            })
        }
    },

    //LOGGING IN A USER
    loginUser: function(req, res) {
        User.findOne({email: req.body.loginUser.email}, function(err, user) 
        {
            if(user == null) {
                res.json({success : false, msg: "There is no user with those credentials!"})
            }
            else {
                bcryptjs.compare(req.body.loginUser.password, user.password)
                .then(result => {
                    if(result == true) {
                        req.session.email = req.body.loginUser.email;
                        res.json({success : true, user : user});
                    }
                    else {
                        res.json({success : false, msg: "Your password doesn't seem to be correct!"});
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.json({success : false, msg: "Something went wrong comparing passwords!"});
                })
            }
        })
    },

    //ADDING A NEW SEASON
    addNewSeason: function(req, res) {
        console.log("We are in the users.js file now!");
        Season.findOne({number : req.body.newSeason.newSeasonNumber}, function(err, season) 
        {
            if(season == null) 
            {
                var season = new Season({name: req.body.newSeason.newSeasonName, number: req.body.newSeason.newSeasonNumber});
                season.save(function(err, season) {
                    if(err)
                    {
                        console.log(err);
                        res.json({success : false, msg: "An error occurred in the system!"});
                    }
                    else
                    {
                        res.json({success : true, season : season});
                    }
                })
            }
            else
            {
                if(err)
                {
                    console.log(err)
                    res.json({success : false, msg: "An error occurred in the system!"});
                }
                else
                {
                    console.log("This season number is already taken");
                    res.json({success : false, msg: "There is already a season with that number"});
                }
            }
        })
    },

    //ADDING A NEW VIDEO
    addNewVideo: function(req, res) {
        console.log("We are in the users.js file now!")
        Video.findOne({title : req.body.newVideo.newVideoTitle}, function(err, video)
        {
            if(video == null)
            {
                var video = new Video({title: req.body.newVideo.newVideoTitle, description: req.body.newVideo.newVideoDescription, img: req.body.newVideo.newVideoImg, videoURL: req.body.newVideo.newVideoURL})
                video.save(function(err, video) 
                {
                    if(err)
                    {
                        console.log(err);
                        res.json({success : false, msg: "Something went wrong in the system!"});
                    }
                    else
                    {
                        Season.findOne({number: req.body.newVideo.newVideoSeason}, function(err, season)
                        {
                            if(season == null)
                            {
                                console.log("Season not found!");
                                res.json({success : false, msg: "There is no season with that number in our database!"});
                            }
                            else if(err)
                            {
                                console.log(err);
                                res.json({success : false, msg: "Something went wrong in the system!"})
                            }
                            else
                            {
                                season.videos.push(video);
                                season.save(function(err, season)
                                {
                                    if(err)
                                    {
                                        console.log(err)
                                        res.json({success : false, msg: "Something went wrong in the system!"});
                                    }
                                })
                            }
                        })
                        res.json({success : true, video : video});
                    }
                })
            }
            else if(err)
            {
                console.log(err);
                res.json({success : false, msg: "Something went wrong in the system!"});
            }
            else
            {
                console.log("There's already a video in the database!");
                res.json({success : false, msg: "There's already a video in the database!"});
            }
        })
    },

    //GET ALL SEASONS DATA
    getAllSeasons: function(req, res)
    {
        console.log("We are in the users.js file now!");
        Season.find({}, function(err, seasons)
        {
            if(err)
            {
                res.json({success : false});
            }
            else
            {
                res.json({seasons : seasons});
            }
        })
    },

    //GET LAST VIDEO DETAILS
    getLastVideo: function(req, res)
    {
        console.log("We are in the users.js file for last video now!");
        var lastVideo = null;
        Video.find({}, function(err, videos)
        {
            if(err)
            {
                res.json({success : false, msg: "Something went wrong finding the video"});
            }
            else
            {
                lastVideo = videos[videos.length-1];
                res.json({success : true, video : lastVideo});
            }
        })
    },

    //GET SINGLE VIDEO DETAILS
    getVideoDetails: function(req, res)
    {
        console.log("We are in the users.js file now!");
        Video.find({title: req.params.title}, function(err, video)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg: "Something went wrong!"});
            }
            else
            {
                res.json({success : true, video: video});
            }
        })
    },

    //GET NEXT VIDEO INFORMATION
    getNextVideoDetails: function(req, res)
    {
        console.log("We are in the users.js file now for next video!");
        Video.find({}, function(err, videos)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg: "Something went wrong finding all videos"});
            }
            else
            {
                console.log("We are in the loop!");
                for(i = 0; i < videos.length; i++)
                {
                    if(videos[i].title == req.params.title && videos[i] != videos[videos.length-1])
                    {
                        console.log("Found Video!")
                        res.json({success : true, video : videos[i]});
                    }
                }
                res.json({success : true, video : null});
            }
        })
    },

    //GET PREVIOUS VIDEO INFORMATION
    getPreviousVideoDetails: function(req, res)
    {
        console.log("We are in the users.js file now for previous video!");
        Video.find({}, function(err, videos)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg: "Something went wrong finding all videos"});
            }
            else
            {
                var previous = null;
                for(i = 0; i < videos.length; i++)
                {
                    console.log("We are in the loop!");
                    if(videos[i].title == req.params.title)
                    {
                        res.json({success : true, video : previous});
                    }
                    else
                    {
                        previous = video;
                    }
                }
            }
        })
    },

    //CHECK IF USER IS ADMIN
    checkAdmin: function(req, res) 
    {
        if(req.session.email) {
            User.findOne({email: req.session.email}, function(err, user) {
                if(user.admin == false) {
                    res.json({success : false})
                }
                else {
                    res.json({success : true, user : user})
                }
            })
        }
        else {
            res.json({success : false})
        }
    },

    //GET ALL USERS DATA
    getAllUsersData: function(req, res)
    {
        User.find({}, function(err, users)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg : "There was an issue getting users data!"});
            }
            else
            {
                res.json({success : true, users : users});
            }
        })
    },

    //GET USER DATA
    getUserData: function(req, res)
    {
        User.findOne({username: req.params.username}, function(err, user)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg: "There was an issue getting the user data!"});
            }
            else
            {
                res.json({success : true, user : user});
            }
        })
    },

    //REMOVE ADMIN PRIVILAGES
    removeAdminPrivilages: function(req, res)
    {
        User.findOne({username: req.params.username}, function(err, user)
        {
            user.admin = req.body.updateUser.admin;
            user.save(function(err)
            {
                if(err)
                {
                    console.log(err);
                    res.json({success : false, msg : "Something went wrong updating admin privilages!"});
                }
                else
                {
                    res.json({success : true, user : user});
                }
            })
        })
    },

    //ADD ADMIN PRIVILAGES
    addAdminPrivilages: function(req, res)
    {
        User.findOne({username: req.params.username}, function(err, user)
        {
            user.admin = req.body.updateUser.admin;
            user.save(function(err)
            {
                if(err)
                {
                    console.log(err);
                    res.json({success : false, msg : "Something went wrong updating admin privilages!"});
                }
                else
                {
                    res.json({success : true, user : user});
                }
            })
        })
    },

    //CHECK FOR SESSION COOKIE
    checkSession: function(req, res) 
    {
        if(req.session.email) {
            User.findOne({email : req.session.email}, function(err, user) {
                if(user == null) {
                    req.json({success : false})
                }
                else {
                    res.json({success : true, user : user})
                }
            })
        }
        else {
            res.json({success : false})
        }
    },

    //LOGGING USER OUT
    logout: function(req, res) {
        if(req.session) {
            req.session.destroy();
            console.log(req.session)
            res.json({success : true})
        }
        else {
            res.json({success : false})
        }
    }
}