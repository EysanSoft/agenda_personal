var express = require('express');
var router = express.Router();
const db = require('../config/database');

module.exports = {

    getUser: (username, callback) => {
        let sql = `SELECT * FROM user WHERE login=` + username;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    getAllUser: (callback) => {
        let sql = 'SELECT * FROM user';
        db.query(sql, (err, data) => {
            if (err) throw err;
            if(data.length > 0) return callback(data);
            return callback(null);
        });
    },

    insertUser: (user, callback) => {
        let nombre = '"' + user.nombre + '"';
        let paterno = '"' + user.paterno + '"';
        let username = '"' + user.username + '"';
        let password = '"' + user.password + '"';
        let sql = "insert into user (nombreUsuario,apellidoUsuario,login,password) values " +
            "(" + nombre + ',' + paterno + ',' + username + ',' + password + ")";
        console.log(sql);
        db.query(sql, user, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    updatePassword: (user, callback) => {
        let sql = 'UPDATE user SET password= ? WHERE id= ?';
        db.query(sql, [user.password, user.id], (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    deleteUser: (user, callback) => {
        let sql = 'DELETE FROM user WHERE id= ?';
        db.query(sql, user.id, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    }

    /*
    findUser: (username, callback) => { //read User
  let sql = 'SELECT * FROM user WHERE login= ?';
  db.query(sql, username, (err, data ) => {
    if (err) throw err;
    if (data.length > 0) return callback(data[0]);
    return callback(null);
  });
  }

getAllUser: (callback) => {
  let sql = 'SELECT * FROM user';
  db.query(sql, (err, data) => {
    if (err) throw err;
    return callback(data);
  });
}

insertUser: (user, callback) => {
  let sql = 'INSERT INTO user SET ?';
  db.query(sql, user, (err, data) => {
    if (err) throw err;
    return callback(data);
  });
}

updateUser: (user, callback) => {
  let sql = 'UPDATE user SET nombreUsuario= ?, apellidoUsuario= ? WHERE id= ?';
  db.query(sql,[user.nombreUsuario,user.apellidoUsuario,user.id], (err, data) => {
    if (err) throw err;
    return callback(data);
  });
}

updatePassword: (user, callback) => {
  let sql = 'UPDATE user SET password= ? WHERE id= ?';
  db.query(sql, [user.password, user.id], (err, data) => {
    if (err) throw err;
    return callback(data);
  });
}

deleteUser: (user, callback) => {
  let sql = 'DELETE FROM user WHERE id= ?';
  db.query(sql, user.id, (err, data) => {
    if (err) throw err;
    return callback(data);
  });
}
     */
}