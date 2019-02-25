let User = require('../app/models/user');

let auth = (req, res, next) => {
    User.auth(req.params.token).then((user) => {
        if (!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = user.token;
        next();
    }).catch(() => {
        res.status(401).send({
            status: false,
            message: 'This information is invalid please retry'
        });
    });
};

module.exports = auth;