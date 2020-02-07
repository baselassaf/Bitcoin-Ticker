//jshint esversion: 6

//for express framwork
const express = require ("express");
//bodyParser to talking with forn
const bodyParser = require("body-parser");
// to make http requests
const request = require("request");

//indicator to express
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

//route to call the index.html file
app.get("/" , function(req,res){
  res.sendFile(__dirname + "/index.html");
});

//route to make http request
app.post("/", function(req ,res){

// holds form valuser form fiat and crypto lists
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount =req.body.amount;

// var baseURL ="https://apiv2.bitcoinaverage.com/indices/global/ticker/";
// var finalURL =baseURL+crypto+fiat ;


var options ={
url : "https://apiv2.bitcoinaverage.com/convert/global" ,
method : "GET" ,
qs : {
  from :crypto,
  to : fiat ,
  amount:amount
}

};


request(options,function(error,response,body){

var data = JSON.parse(body);
var price = data.price ;
console.log(price);

var currentDate= data.time;

res.write("<p> the current date is " + currentDate + "</p>");

res.write("<h1>the current price of "+ amount +crypto +" is : " + price + fiat +"</h1>");

res.send();


});

});


//to set server port to 3000
app.listen(3000 , function(){
  console.log("server is running in port 3000");

});
