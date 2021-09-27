const fs = require('fs');
const path = require('path');
const express = require('express');
const {accounts, users, writeJSON} = require('./data')

//Require routers
const accountRoutes = require('./routes/accounts')
const servicesRoutes = require('./routes/services')


const app = express();
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))//What this do

//use Routers
app.use('/account',accountRoutes);
app.use('/services', servicesRoutes);

//app.use(path.join(__dirname, '/public/'))
app.set('views', path.join(__dirname,'./views')); //I don't understand this set function in the videos he never used the path.join with it
app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    res.render('index',{title: "Account Summary", accounts: accounts})
}) //Why can't I use the whole file path? Doesn't that make more sense?

app.get('/profile',(req,res)=>{
    res.render('profile',{user: users[0]})
})

app.listen(3000, ()=>{
    console.log('PS Project Running on port 3000!')
})