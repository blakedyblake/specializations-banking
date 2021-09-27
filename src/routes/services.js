const express = require('express')
const router = express.Router();

const {accounts, writeJSON} = require('../data')

router.get('/transfer',(req,res)=>{
    res.render('transfer')
})
router.get('/payment',(req,res)=>{
    res.render('payment',{account: accounts.credit})
})
router.post('payment',(req,res)=>{
    accounts.credit.balance = accounts.credit.balance - parseInt(req.body.amount);
    accounts.credit.available = accounts.credit.available + parseInt(req.body.amount);

    writeJSON();
    res.render('payment',{message: "Payment Successful", account: accounts.credit})

})
router.post('/transfer',(req,res)=>{
    const {from,to,amount} = req.body
    accounts[from].balance = accounts[from].balance - parseInt(amount);
    accounts[to].balance = accounts[to].balance + parseInt(amount);

    writeJSON();
    res.render('transfer',{message: "Transfer Completed"})

})

module.exports = router;