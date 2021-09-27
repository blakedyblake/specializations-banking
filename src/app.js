const fs = require('fs');
const path = require('path');
const express = require('express');


const app = express();
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))//What this do

//app.use(path.join(__dirname, '/public/'))
app.set('views', path.join(__dirname,'./views')); //I don't understand this set function in the videos he never used the path.join with it
app.set('view engine', 'ejs')

const accountData = fs.readFileSync('src/json/accounts.json','utf8')
const accounts = JSON.parse(accountData)

const userData = fs.readFileSync('src/json/users.json','utf8')
const users = JSON.parse(userData);

app.get('/',(req,res)=>{
    res.render('index',{title: "Account Summary", accounts: accounts})
}) //Why can't I use the whole file path? Doesn't that make more sense?
app.get('/savings',(req,res)=>{
    res.render('account',{account: accounts.savings})
})
app.get('/checking', (req,res)=>{
    res.render('account',{account: accounts.checking})
})
app.get('/credit', (req,res)=>{
    res.render('account',{account: accounts.credit})
})
app.get('/profile',(req,res)=>{
    res.render('profile',{user: users[0]})
})
app.get('/transfer',(req,res)=>{
    res.render('transfer')
})
app.get('/payment',(req,res)=>{
    res.render('payment',{account: accounts.credit})
})
app.post('payment',(req,res)=>{
    accounts.credit.balance = accounts.credit.balance - parseInt(req.body.amount);
    accounts.credit.available = accounts.credit.available + parseInt(req.body.amount);

    const accountsJSON = JSON.stringify(accounts)
    fs.writeFileSync(path.join(__dirname,'src/json/accounts.json'),accountsJSON,'utf8')
    res.render('payment',{message: "Payment Successful", account: accounts.credit})

})
app.post('/transfer',(req,res)=>{
    const {from,to,amount} = req.body
    accounts[from].balance = accounts[from].balance - parseInt(amount);
    accounts[to].balance = accounts[to].balance + parseInt(amount);

    const accountsJSON = JSON.stringify(accounts)
    fs.writeFileSync(path.join(__dirname,'src/json/accounts.json'),accountsJSON,'utf8')
    res.render('transfer',{message: "Transfer Completed"})

})
app.listen(3000, ()=>{
    console.log('PS Project Running on port 3000!')
})