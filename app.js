const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
//comentar despues
//const PassportLocal = require('passport-local').Strategy;
const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactosRouter = require('./routes/contactos');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('webkey'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mysecret_web',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//configurar la estrategia de autenticacion
/*
passport.use(new PassportLocal((username,password,done) => {
  if(username === 'web')
    return done(null, {id:1, name:'web'});
  done(null,false)
}));

passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser((id,done) => done(null, {id:1, name: 'web'}))
*/

app.use('/', loginRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contactos', contactosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
