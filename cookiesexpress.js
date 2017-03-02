/**
 * Created by maggie on 2017/2/28.
 */
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());


app.get("/",function (request,response) {

    //response.cookie("uid","105");
    var time = 24*60*60*1000;
    response.cookie("uid","107",{"maxAge":time,"path":"/pay"});
    response.cookie("level","4");
    response.cookie("sex","女");
    response.setHeader("Content-Type","text/html;charset=utf-8");
    response.send("欢迎来到我的首页");
    
});

app.get("/buy",function (request,response) {


    console.log(request.cookies);
    response.setHeader("Content-Type","text/html;charset=utf-8");
    response.send("欢迎  尽情购物");

});

app.get("/pay",function (request,response) {


    console.log(request.cookies.uid);
    response.setHeader("Content-Type","text/html;charset=utf-8");
    response.send("请付款");

});


app.listen("3004","127.0.0.1");
