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
            auth: req.user
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

router.post('/store-user-message', auth.auth, (req, res, next) => {
    messageController.storeMessage(req.body).then(() => {
        res.send({
            status: true,
            message: "Message has been send"
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
});

module.exports = router;