const express = require('express');
const  router = express.Router();
const app = require('../app');
const auth = require('./auth');
const messageController = require(app.controllers+'/MessageController');

router.get('/user/:id', auth.auth, (req, res, next) => {
    messageController.users(req.user).then(response => {
        res.render("index", {
            users: response,
            receiver_id: req.params.id,
            title: "Chat",
        })
    }).catch((error) => {
        res.send(error);
    });
});

router.get("/messages/:id", auth.auth, (req, res, next) => {
    messageController.messages(req.params.id, req.user).then((messages) => {
        res.send({
            messages,
            auth: req.user
        });
    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;