


var express = require("express");
// const cors = require('cors');

// const app = express();

// // 👇️ configure CORS
// app.use(cors());


const transactioncontroller = require('../controler/transaction.js')

const router  =  express.Router();

router.get('/alltransactiondata',transactioncontroller.alltransactiondata)

router.delete('/deletetransactiondata',transactioncontroller.deletetransactiondata)

router.post('/adtransactiondata',transactioncontroller.adtransactiondata)

module.exports = router;

