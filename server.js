const express = require('express');
let app = express();
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let flash = require('connect-flash');
let http = require('http');
let socketIo = require('socket.io');
let cookie = require('cookie');
let User = require('./app/models/user');

/*static files*/
app.use(express.static(__dirname+'/public'));

/*view engines*/
app.set('views', './views');
app.set('view engine', 'ejs');

/*application settings*/
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
let server = http.createServer(app);
/*routing*/
let indexRouter = require('./router/route');
let messageRouter = require('./router/message');
app.use('/', indexRouter);
app.use('/message', messageRouter);
let io = socketIo(server);
io.on('connection', (socket) => {
    let cookies = cookie.parse(socket.handshake.headers.cookie);
    if (typeof cookies['x-auth-token'] !== 'undefined') {
        User.auth(cookies['x-auth-token']).then(user => {
            if (typeof user.name !== 'undefined'){
                socket.on('send-new-message', function(message){
                    io.emit("message/"+message.receiver+"/"+message.userId, message);
                    console.log("message/"+message.receiver+"/"+message.userId);
                });
            }else{
                throw Error("Authentication required");
            }
        }).catch(error => {
            console.log(error);
        })
    }else{
        throw Error("Authentication required.")
    }
});
/*server*/
server.listen(3000, () => {
    console.log("Server is running in http://localhost:3000");
});