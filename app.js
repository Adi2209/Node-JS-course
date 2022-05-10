const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs=require('express-handlebars')

const app = express();
//use allows us to add a middleware function ;


app.engine('hbs',expressHbs({layoutsDir:'views/layouts/',defaultLayout:'main-layout',extname:'hbs'}));
app.set('view engine','hbs');//telling express that we have to compile dynamic template(html) with pug engine 
app.set('views','views');//telling express to where to find the templates

const adminData=require('./routes/admin')
const shopRoutes=require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);

app.use(shopRoutes);

app.use((req,res,next)=>{
    res.status(404).render('404',{pageTitle:'Page Not Found'});

})

app.listen(3000);//node js will keep listening for incoming events

