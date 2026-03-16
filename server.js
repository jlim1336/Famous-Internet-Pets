const express = require('express');
const morgan = require('morgan');
const fs = require("fs");
const app = express();
app.use(morgan('dev'));

let hostname = 'localhost';
let port = 4000;

app.use(express.static('public_html'));

const server=app.listen(port,hostname,function(){
    console.log(`Server running in ${hostname}:${port}`);
});


//GET function for pets
app.get('/pets',function(req,res){
    fs.readFile("pets.json",function(err,content){
        if(err){
            res.status(500)
            return console.error(err);
        }
        else{
            console.log(content.toString());
            res.status(200);
            res.json(JSON.parse(content));
        }
    });
});


