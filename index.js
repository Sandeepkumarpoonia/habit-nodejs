require('dotenv').config()
const express =require('express');
const path = require('path');
const app =express();
const bodyParser = require('body-parser')
const router =require('./routes/web')

app.set('view engine','ejs');


// *******************    Set Template Engine  ***********************************//

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'))



// ************************  Database Connection  **********************************//
const {connectMonggose} = require('./app/database/db')
connectMonggose();


// *************************    Assets    ****************************************//
const publicPath = path.join(__dirname,"public");
app.use(express.static(publicPath));
app.use(express.static(__dirname + '/public'));
app.use("/uploads",express.static("uploads"))
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



// ***************************  Routes  *************************************//
app.use(router);

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})
