const express = require('express');
const router = express.Router();
const app = express();
const models = require('../models/contactosDAO');

app.use(express.json());

router.post('/agregarContactos', function(req, res, next) {
    const {nombre, paterno, materno, telefono, celular, direccion, correo} = req.body
    const nuevoContacto = {nombre, paterno, materno, telefono, celular, direccion, correo}
    models.insertContacto(nuevoContacto,(data) => {
        res.render('agendaPrincipal', {title: 'agendaPrincipal'});
    })
});

module.exports = router;