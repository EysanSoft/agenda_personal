const express = require('express');
const router = express.Router();
const app = express();
const models = require('../models/userDAO');

app.use(express.json());

router.post('/agregarUsuarios', function(req, res, next) {
  const {nombre, paterno, username, password, password2} = req.body
  const nuevoUsuario = {nombre, paterno, username, password}
  if(password == password2) {
    models.insertUser(nuevoUsuario,(data) => {
      res.render('login', {title: 'login'});
    })
  }
  else {
    //req.flash('message', 'Es necesario iniciar session.')
    //let message = req.flash('message');
    //res.redirect('/login', {title: 'login', message} );
  }
});

module.exports = router;
