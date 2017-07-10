const express = require('express');
const path = require('path');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');
let db=mongoose.connection;

//check connection
db.once('open',function(){

   console.log('Connected to MongoDb'); 
})

//check for db errors
db.on('error',function(err){

console.log(err);

});

//initialize app
var app = express();


//bring in models 
let Article=require('./models/article');

//load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//home route
app.get('/',function(req,res){


    res.render('index',{
        title:"In Index"
    });


});


//add route 
app.get('/article/add',function(req,res){
  Article.find({},function(err,articles){

    if(err){

        console.log(err);
    }else{

         res.render('add_article',{
        title:"In Articles",
        articles:articles
    });
    }
  });
   


});




app.listen(3000,function(){

console.log('server started at port no. 3000...');
})