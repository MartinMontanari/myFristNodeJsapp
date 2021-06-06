const mysql  = require('mysql');

const config = require('../config');


// DB SETUP
const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

// DB CONNECTION
let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err)=>{
        if(err){
            console.error('[DB error]', err);
            setTimeout(handleCon, 2000);
        }else{
            console.log('DB connected!');
        }
        
    });

    connection.on('error', err =>{
        console.error('[DB error]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleCon();
        }else{
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data)=>{
            if (error){
                return reject (err);
            } else{
                resolve(data);
            }
        });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data)=>{
            if (error){
                return reject (err);
            } else{
                resolve(data);
            }
        });
    });
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result)=>{
            if (error){
                return reject (err);
            } else{
                resolve(result);
            }
        });
    });
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result)=>{
            if (error){
                return reject (err);
            } else{
                resolve(result);
            }
        });
    });
}

function upsert(table, data){
    if (data && data.id){
        return update();
    }else{
        return insert(table, data);
    }
}

module.exports = {
    list,
    get,
    upsert
}