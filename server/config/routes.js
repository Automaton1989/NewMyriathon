var mongoose = require('mongoose')
    User = mongoose.model('User')
var myriathon = require('../controllers/users.js')
const path = require('path')
module.exports = function(app) {
    app.get('/myriathon/home', function(req, res) {
        myriathon.index(req, res)
    })
    app.post('/myriathon/new/user', function(req, res) {
        myriathon.newUser(req, res)
    })
    app.post('/myriathon/login/user', function(req, res) {
        myriathon.loginUser(req, res)
    })
    app.get('/myriathon/session', function(req, res) {
        myriathon.checkSession(req, res)
    })
    app.get('/myriathon/admin', function(req, res) {
        myriathon.checkAdmin(req, res)
    })
    app.get('/myriathon/logout', function(req, res) {
        console.log("in routes.js")
        myriathon.logout(req, res)
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}