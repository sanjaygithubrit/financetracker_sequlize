

//transaction
var express = require("express");
var app = express();
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json({limit: "50mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}))


const db = require("../models/index");

var transaction = db.transaction;

const alltransactiondata = async (req,res)=>{
    const data = await transaction.findAll({});
    res.json(data);
}

const adtransactiondata = async (req,res)=>{
     await transaction.create(req.body);
    
}

const deletetransactiondata = async (req,res)=>{

const d_id = req.query.id;
    await transaction.destroy({
        where: {
           id: d_id 
        }
     })
}
const getedittransactiondata = 
async (req,res)=>{
    const id = req.query.id;
    const data = await transaction.findAll({
        where: {
            id: id
          }
    });
    res.json(data);
}


const edittransactiondata = 
async (req,res)=>{
    const id = req.query.id;
    const data = await transaction.update(req.body, { where: { id: id } })
    res.json(data);
}

module.exports = {
    alltransactiondata,
    deletetransactiondata,
    adtransactiondata,
    getedittransactiondata,
    edittransactiondata,
}