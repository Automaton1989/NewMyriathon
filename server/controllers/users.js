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
                        var video = new Video({title: req.body.newVideo.newVideoTitle, description: req.body.newVideo.newVideoDescription, img: req.body.newVideo.newVideoImg, videoURL: req.body.newVideo.newVideoURL, seasonNumber: req.body.newVideo.newVideoSeason})
                        season.videos.push(video);
                        season.save(function(err, season)
                        {
                            if(err)
                            {
                                console.log(err)
                                res.json({success : false, msg: "Something went wrong in the system!"});
                            }
                            else
                            {
                                video.save(function(err) 
                                {
                                    if(err)
                                    {
                                        console.log(err);
                                        res.json({success : false, msg: "Something went wrong in the system!"});
                                    }
                                    else
                                    {
                                        res.json({success : true});
                                    }
                                })
                            }
                        })
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
                res.json({success : false, msg: "There's already a video with that name in the database!"});
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

    //GET SEASON DETAILS
    getSeasonDetails: function(req, res)
    {
        console.log("We are in the users.js file now for single season details!");
        Season.findOne({name: req.params.name}, function(err, season)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg: "Something went wrong!"});
            }
            else
            {
                res.json({success : true, season : season});
            }
        })
    },

    //UPDATE SEASON DATA
    updateSeasonData: function(req, res)
    {
        console.log("We are in the users.js file now for updating a season!");
        Season.findOne({_id: req.params.id}, function(err, season)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg: "Something went wrong!"});
            }
            else
            {
                season.name = req.body.updateSeason.name;
                season.save(function(err)
                {
                    if(err)
                    {
                        console.log(err);
                        res.json({success : false, msg : "There was an error saving season!"});
                    }
                    else
                    {
                        res.json({success : true})
                    }
                })
            }
        })
    },

    //UPDATE SINGLE VIDEO
    updateVideoData: function(req, res)
    {
        console.log("We are in the users.js file for updating video now!");
        Video.findOne({_id: req.params.id}, function(err, video)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg: "Something went wrong!"});
            }
            else
            {
                video.title = req.body.updateVideo.title;
                video.description = req.body.updateVideo.description;
                video.img = req.body.updateVideo.img;
                video.videoURL = req.body.updateVideo.videoURL
                video.save(function(err)
                {
                    if(err)
                    {
                        console.log(err);
                        res.json({success : false, msg: "Something went wrong saving video!"});
                    }
                    else
                    {
                        Season.findOne({number: video.seasonNumber}, function(err, season)
                        {
                            if(err)
                            {
                                res.json({success : false});
                            }
                            else
                            {
                                for(i = 0; i < season.videos.length; i++)
                                {
                                    if(season.videos[i]._id.equals(video._id))
                                    {
                                        season.videos[i] = video;
                                        season.save(function(err)
                                        {
                                            if(err)
                                            {
                                                res.json({success : false});
                                            }
                                            else
                                            {
                                                res.json({success : true});
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    }
                })
            }
        })
    },

    //GET NEXT VIDEO INFORMATION
    getNextVideoDetails: function(req, res)
    {
        console.log("We are in the users.js file now for next video!");
        Season.findOne({number : req.params.number}, function(err, season)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg : "Something went wrong finding the season!"});
            }
            else
            {
                var nextVideo = null;
                for(i = 0; i < season.videos.length; i++)
                {
                    if(season.videos[i].title == req.params.title && season.videos[i] != season.videos[season.videos.length-1])
                    {
                        console.log("Found Video!");
                        nextVideo = season.videos[i+1];
                        res.json({success : true, video : nextVideo});
                    }
                    else if(season.videos[i].title == req.params.title && season.videos[i] == season.videos[season.videos.length-1])
                    {
                        res.json({success : true, video : null});
                    }
                    else
                    {
                        console.log("didn't find anything!");
                    }
                }
            }
        })
    },

    //GET PREVIOUS VIDEO INFORMATION
    getPreviousVideoDetails: function(req, res)
    {
        console.log("We are in the users.js file now for previous video!");
        Season.findOne({number : req.params.number}, function(err, season)
        {
            if(err)
            {
                console.log(err);
                res.json({success : false, msg : "Something went wrong finding the season!"});
            }
            else
            {
                var previousVideo = null;
                for(i = 0; i < season.videos.length; i++)
                {
                    if(season.videos[i].title == req.params.title)
                    {
                        console.log("Found Video!");
                        res.json({success : true, video : previousVideo});
                    }
                    else
                    {
                        console.log("Didn't find yet!");
                        previousVideo = season.videos[i];
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