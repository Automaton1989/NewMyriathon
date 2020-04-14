var mongoose = require('mongoose')
var bcrypt = require("bcrypt");
var bcryptjs = require("bcryptjs");
    User = mongoose.model('User')
module.exports = {
    index: function(req, res) {
        res.json({success : true})
    },
    newUser: function(req, res) {
        console.log("We are in new user controller!");
        console.log(req.body.newUser.newSecretMessage);
        bcryptjs.hash(req.body.newUser.newPassword, 10)
        .then(hashed_password => {
            var user = new User({username: req.body.newUser.newUsername, email: req.body.newUser.newEmail, password: hashed_password});
            user.save(function(err, user) {
                if(err) {
                    res.json({success : false})
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
    },
    loginUser: function(req, res) {
        User.findOne({email: req.body.loginUser.email}, function(err, user) {
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
    checkAdmin: function(req, res) {
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
    checkSession: function(req, res) {
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