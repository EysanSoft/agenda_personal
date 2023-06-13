var express = require('express');
var router = express.Router();
const db = require('../config/database');

module.exports = {

    findContacto: (contacto, callback) => {
        let id = '"' + contacto.id + '"';
        let sql = 'SELECT * FROM contacto WHERE id= ' + contacto;
        db.query(sql, contacto, (err, data ) => {
            if (err) throw err;
            if (data.length > 0) return callback(data[0]);
            return callback(null);
        });
    },

    getAllContacto: (callback) => {
        let sql = 'SELECT * FROM contacto';
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    insertContacto: (contacto, callback) => {
        let nombre = '"' + contacto.nombre + '"';
        let paterno = '"' + contacto.paterno + '"';
        let materno = '"' + contacto.materno + '"';
        let telefono = '"' + contacto.telefono + '"';
        let personal = '"' + contacto.celular + '"';
        let direccion = '"' + contacto.direccion + '"';
        let correo = '"' + contacto.correo + '"';
        let sql = "insert into contacto (nombre,paterno,materno,telefono,personal,direccion,correo) values " +
            "(" + nombre + ',' + paterno + ',' + materno + ',' + telefono + ',' + personal + ',' + direccion + ',' + correo + ")";
        console.log(sql);
        db.query(sql, contacto, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    updateContacto: (contacto, callback) => {
        let id = '"' + contacto.id + '"';
        let nombre = '"' + contacto.nombre + '"';
        let paterno = '"' + contacto.paterno + '"';
        let materno = '"' + contacto.materno + '"';
        let telefono = '"' + contacto.telefono + '"';
        let personal = '"' + contacto.celular + '"';
        let direccion = '"' + contacto.direccion + '"';
        let correo = '"' + contacto.correo + '"';
        let sql = "UPDATE contacto SET nombre= " + nombre + ", paterno= " + paterno + ", materno= " + materno + ", telefono= " + telefono + ", personal= " + personal + ", direccion= " + direccion + " correo= " + correo + "WHERE id= " + id;
        db.query(sql, contacto, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },


    deleteContacto: (contacto, callback) => {
        let id = '"' + contacto.id + '"';
        let sql = 'DELETE FROM contacto WHERE id= ' + id;
        db.query(sql, contacto, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    }
}