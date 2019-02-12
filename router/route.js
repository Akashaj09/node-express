let express = require('express');
let router = express.Router();
let app = require('../app');
let userController = require(app.controllers+'/userController');

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
    userController.createUser(req.body).then((response) => {
        res.redirect('/create-success?message=account created successfully');
    }).catch((error) => {
        res.render('create_account', {
            title: 'The given data is invalid',
            errors: error.errors
        })
    });
});

router.get('/create-success', (req, res, next) => {
    res.render('success', {
        title: req.query.message
    });
});
router.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'Login || Join chat room'
    });
});

router.post('/login', (req, res, next) => {
    userController.login(req.body).then((response) => {
        res.send(response);
    }).catch((errors) => {
        res.send(errors);
    });
});

module.exports = router;