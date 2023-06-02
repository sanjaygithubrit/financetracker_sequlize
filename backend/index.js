const mysql = require("mysql2");
var express = require("express");
const { Sequelize } = require("sequelize");
var cors = require('cors');


const db = require("./models/index");

var transaction = db.transaction;
var app = express();
var bodyParser = require('body-parser');
const { Route } = require("react-router-dom");
app.use(bodyParser.urlencoded({ limit:"50mb",extended: true }))
// parse application/json
app.use(bodyParser.json({limit:"50mb",extended: true}))
app.use(cors());

const sequelize = new Sequelize("sequle", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const router = require('./router/router.js')

// const transaction1 = require('./controler/transaction.js')
app.use('/',router)


// app.get("/user", async function (req, res) {
//   try {
//     const data = await transaction.findAll({
//     });
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(6000, function () {
  console.log("Node app is running on port 6000");
});
