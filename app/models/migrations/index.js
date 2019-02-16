const user = require('../user');
const message = require('../message');
const token = require('../Token');

user.sync({force: true}).then(() => {
    token.sync({force: true}).then(() => {
        message.sync({force: true}).then(() => {
            console.log("Migration completed")
        });
    });
});