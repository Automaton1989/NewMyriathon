var mongoose = require('mongoose')
    User = mongoose.model('User')
    Video = mongoose.model('Video')
    Season = mongoose.model('Season')
var myriathon = require('../controllers/users.js')
const path = require('path')
module.exports = function(app) {
    app.get('/myriathon/home', function(req, res) 
    {
        myriathon.index(req, res)
    })
    app.post('/myriathon/new/user', function(req, res) 
    {
        myriathon.newUser(req, res)
    })
    app.post('/myriathon/login/user', function(req, res) 
    {
        myriathon.loginUser(req, res)
    })
    app.post('/myriathon/new/season', function(req, res)
    {
        myriathon.addNewSeason(req, res)
    })
    app.post('/myriathon/new/video', function(req, res)
    {
        myriathon.addNewVideo(req, res)
    })
    app.get('/myriathon/all/seasons', function(req, res)
    {
        myriathon.getAllSeasons(req, res)
    })
    app.get('/myriathon/last/video', function(req, res)
    {
        myriathon.getLastVideo(req, res)
    })
    app.get('/myriathon/single/:title', function(req, res)
    {
        myriathon.getVideoDetails(req, res)
    })
    app.get('/myriathon/season/:name', function(req, res)
    {
        myriathon.getSeasonDetails(req, res)
    })
    app.get('/myriathon/prev/video/:title', function(req, res)
    {
        myriathon.getPreviousVideoDetails(req, res)
    })
    app.get('/myriathon/next/video/:title', function(req, res)
    {
        myriathon.getNextVideoDetails(req, res)
    })
    app.get('/myriathon/all/users', function(req, res)
    {
        myriathon.getAllUsersData(req, res);
    })
    app.get('/myriathon/user/data/:username', function(req, res)
    {
        myriathon.getUserData(req, res);
    })
    app.put('/myriathon/update/video/:id', function(req, res)
    {
        myriathon.updateVideoData(req, res);
    })
    app.put('/myriathon/update/season/:id', function(req, res)
    {
        myriathon.updateSeasonData(req,res);
    })
    app.put('/myriathon/remove/admin/:username', function(req, res)
    {
        myriathon.removeAdminPrivilages(req, res);
    })
    app.put('/myriathon/add/admin/:username', function(req, res)
    {
        myriathon.addAdminPrivilages(req, res);
    })
    app.get('/myriathon/session', function(req, res) 
    {
        myriathon.checkSession(req, res)
    })
    app.get('/myriathon/admin', function(req, res) 
    {
        myriathon.checkAdmin(req, res)
    })
    app.get('/myriathon/logout', function(req, res) 
    {
        console.log("in routes.js")
        myriathon.logout(req, res)
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}