let User = require('../app/models/user');
let Cookies = require('cookies');

let auth = (req, res, next) => {
    let cookies = new Cookies(req, res, { keys: ['this is secret'] });
    let token = cookies.get('x-auth-token', { signed: true });
    User.auth(token || req.headers['x-auth']).then((user) => {
        if (!user){
            return res.redirect('/login');
        }
        req.user = user;
        req.token = user.token;
        next();
    }).catch(() => {
        return res.redirect('/login');
    });
};

let authApi = (req, res, next) => {
    if (req.xhr && !req.headers["x-auth"]){
        return res.status(401).send({
            status: false,
            message: 'Authentication required'
        });
    }
    User.auth(req.headers['x-auth']).then((user) => {
        if (!user){
            res.status(401).send({
                status: false,
                message: 'This information is invalid please retry'
            });
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

module.exports = {auth, authApi };