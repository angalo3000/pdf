const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require("mysql")
const port = 3001

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

app.use(cors());
app.use(express.json());

app.get('/test', function (req, res) {
    // const {email, password} = req.body;
    const sqlGet = "SELECT * FROM users";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(400).send({
                data: null,
                message: error.sqlMessage,
                statusCode: 400,
                isSuccess: false
            });
        }
        console.log('got it');
        return res.status(200).send({
            data: result,
            message: "Logged-in",
            statusCode: 200,
            isSuccess: true
        });
    })
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))