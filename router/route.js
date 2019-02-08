let express = require('express');
let router = express.Router();

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
    res.send({
        'status': true,
        'message': 'Account created'
    });
});
module.exports = router;