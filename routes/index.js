const express = require('express');
const router = express.Router();
const app = express();
const mysql = require('mysql');
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;

app.use(express.json());

// conexion a MySQL
const connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: '081601',
  database: 'calendario'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET contacto page. */
router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: 'contacto' });
});

/* GET servicios page. */
router.get('/servicios', function(req, res, next) {
  res.render('servicios', { title: 'servicios' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  req.session.user = null;
  res.render('login', { title: 'login' });
});

/* GET sign up page. */
router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'signUp' });
});

router.post('/signUp', function(req, res, next) {
  let user = {
    'nombreUsuario': req.body.nombreUsuario,
    'apellidoUsuario': req.body.apellidoUsuario,
    'login': req.body.login,
    'password': req.body.password
  };
});

router.post('/contactos', function(req, res, next) {
  let contacto = {
    'nombreUsuario': req.body.nombreUsuario,
    'apellidoUsuario': req.body.apellidoUsuario,
    'login': req.body.login,
    'password': req.body.password
  };
});


/* GET recuperarContraseña page. */
router.get('/recuperarContrasena', function(req, res, next) {
  res.render('recuperarContrasena', { title: 'recuperarContraseña' });
});

/* GET agendaPrincipal page. */
//Duplicado
router.get('/agendaPrincipal', function(req, res, next) {
  let user = req.session.user;
  console.log(user);
  if (user) {
    res.render('agendaPrincipal', {title: 'agendaPrincipal', user})
  }
  else {
    req.flash('message', 'Es necesario iniciar session.')
    let message = req.flash('message');
    res.render('login', {title: 'login', message });
  }
});

/* GET agregarContactos page. */
router.get('/agregarContactos', function(req, res, next) {
  res.render('agregarContactos', { title: 'agregarContactos'});
})

/*
// Metodo post Login
router.post('/login', (req,res) => {
  const {username,password} = req.body
  if (username && password) {
    connection.query('SELECT * FROM user WHERE login = ? AND password = ?', [username,password], (error, result) => {
      if (result.length > 0) {
        req.session.user = {
          id: result[0].id,
          username: username
        }

        res.redirect('/agendaPrincipal');}
        else {
        res.render('login');
      }
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
})
*/
/*
passport.use(new PassportLocal( (username,password,done) => {

    connection.query('SELECT * FROM user WHERE login = ? AND password = ?', [username,password], (error, result) => {
        if(result.length > 0) {
            console.log('entro1');
            //return done(null, {id:login, name:nombreUsuario})
        }
        else {
            console.log('entro2');
            //done(null,false, {message: "Usuario o contraseña incorrectos"})
        }
    });

}))
*/

router.post('/login', (req,res) => {
  req.session.user = {
    id: 1,
    username: 'Ivan'
  };
  req.flash('message', 'Usuario o Contraseña Incorrectos.')
  res.redirect('/agendaPrincipal');
})

module.exports = router;
