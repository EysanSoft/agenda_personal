const express = require('express');
const router = express.Router();
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;
const mysql = require('mysql');

const connect = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '081601',
    database: 'calendario'
});
connect.connect();

//Configuracion de la estrategia en passport
passport.use(new PassportLocal((username,password,done) => {
    connect.query('SELECT * FROM user WHERE login = ? AND password = ?', [username,password], (err,result) => {
        console.log(result.length > 0);
        if(result.length > 0) {
            iduser = result[0].id;
            //connect.length > 0 && password === connect.password
            console.log('entro');
            done(null, {id: iduser, name: connect.nombreUsuario});
        }
        else
            done(null,false);
    })
}));

passport.serializeUser((user,done) => done(null, user.id));

passport.deserializeUser((id,done) => done(null, {id:1, name: 'web'}));

router.get('/',(req, res) => {
    let message = req.flash('error');
    res.render('index', {title: 'Agenda Inicio de Seccion'});
});


/* metodo 1
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.render( 'agendaPrincipal');
});
*/


//original
router.get('/agendaPrincipal', (req, res) => {
    res.render('agendaPrincipal', { title: 'agendaPrincipal' })
});


router.post('/login', passport.authenticate('local', {
    successRedirect: '/agendaPrincipal',
    failureRedirect: '/login',
    failureFlash: 'Usuario o Password Incorrecto'
}));

//copy pegado
router.post('/login', (req,res) => {
    req.session.user = {
        id: 1,
        username: 'Ivan'
    };
    req.flash('message', 'Usuario o Contraseña Incorrectos.')
    res.redirect('/agendaPrincipal');
})

router.get('/logout', (req, res) => {
    if(req.isAuthenticated())
        req.logout();
    res.render('/login');
});

module.exports = router;