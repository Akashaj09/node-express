const express = require('express');
let app = express();
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let flash = require('connect-flash');

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

/*routing*/
let indexRouter = require('./router/route');
app.use('/', indexRouter);

/*server*/
app.listen(3000, () => {
    console.log("Server is running in http://localhost:3000");
});