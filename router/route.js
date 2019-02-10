let express = require('express');
let router = express.Router();
let app = require('../app');

router.get('/', (req, res, next) => {
    res.render("index", {
        title: 'Chat app'
    });
});
router.get('/create-account', function (req, res,next) {
    res.render('create_account', {
        title: 'Create account'
    });
});
router.post('/create-account', function (req, res, next) {
    let userController = require(app.controllers+'/userController');
    userController.createUser(req.body).then((response) => {
        res.redirect('/create-success?message=account created successfully');
    }).catch((error) => {
        res.send(error)
    });
});

router.get('/create-success', (req, res, next) => {
    res.render('success', {
        title: req.query.message
    });
});
router.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'Login||Join chat room'
    });
});
module.exports = router;