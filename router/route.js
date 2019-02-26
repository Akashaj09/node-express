let express = require('express');
let router = express.Router();
let app = require('../app');
let Cookies = require('cookies');
let userController = require(app.controllers+'/userController');
let auth = require('./auth');

router.get('/', auth.auth, (req, res, next) => {
    res.render("index", {
        title: 'Chat app',
        auth: req.user
    });
});
router.get('/create-account', function (req, res,next) {
    res.render('create_account', {
        title: 'Create account'
    });
});
router.post('/create-account', function (req, res, next) {
    userController.createUser(req.body).then((response) => {
        let cookies = new Cookies(req, res, { keys: ['this is secret'] });
        cookies.set('x-auth-token', response.token, { signed: true });
        res.redirect('/');
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
        let cookies = new Cookies(req, res, { keys: ['this is secret'] });
        cookies.set('x-auth-token', response.token, { signed: true });
        res.header('x-auth', response.token).send(response);
    }).catch((errors) => {
        res.status(403).send(errors);
    });
});

router.post('/logout', (req, res, next) => {
    let cookies = new Cookies(req, res, { keys: ['this is secret'] });
    let token = cookies.get('x-auth-token', { signed: true });
    userController.logout(token).then(response => {
        res.redirect("/login");
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.get('/user/:token', auth.auth,  (req, res, next) => {
    res.send(req.user);
});

module.exports = router;