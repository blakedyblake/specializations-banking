const fs = require('fs');
const path = require('path');
const express = require('express');


const app = express();
app.use(express.static(path.join(__dirname,'public')))

//app.use(path.join(__dirname, '/public/'))
app.set('views', path.join(__dirname,'./views')); //I don't understand this set function in the videos he never used the path.join with it
app.set('view engine', 'ejs')

const accountData = fs.readFileSync('src/json/accounts.json','utf8')
const accounts = JSON.parse(accountData)
app.get('/',(req,res)=>{
    res.render('index',{title: "Index"})
}) //Why can't I use the whole file path? Doesn't that make more sense?

app.listen(3000, ()=>{
    console.log('PS Project Running on port 3000!')
})