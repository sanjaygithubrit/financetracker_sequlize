

//transaction
var express = require("express");
var app = express();
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json({limit: "50mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}))
// var cors = require('cors');

// app.use(cors());

const db = require("../models/index");

var transaction = db.transaction;

const alltransactiondata = async (req,res)=>{
    const data = await transaction.findAll({});
    res.json(data);
}

const adtransactiondata = async (req,res)=>{

    console.log(req.body,"req.body");

    const jane = await transaction.create(req.body);
    console.log(jane,"jane");
}

const deletetransactiondata = async (req,res)=>{

const d_id = req.query.id;
console.log(d_id,"delete");
    await transaction.destroy({
        where: {
           id: d_id //this will be your id that you want to delete
        }
     })
    // const data = await transaction.findAll();
    // res.json(data);
}

module.exports = {
    alltransactiondata,
    deletetransactiondata,
    adtransactiondata,
}