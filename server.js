//server.js
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

//DB connection
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'prb'
})
connection.connect()

app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.post('/login', function (req, res) {
    connection.query(`SELECT *
                      from users
                      where username = '${req.body.username}'
                        and password = '${req.body.password}'`, (err, rows, fields) => {
        if (err) throw err
        if (!rows) {
            res.send(null);
        } else {
            res.send(rows[0]);
        }
    })
})

var server = app.listen(8080, function () {
    console.log("Backend Application listening at http://localhost:8080")
})
