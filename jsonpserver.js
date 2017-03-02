/**
 * Created by maggie on 2017/2/27.
 */

var express = require("express");
var bodyParser = require("body-parser");


var app = express();

app.use(express.static("./public"));



app.get("/getTime",function(request,response){

     var now = new Date();

     var timeObj = new Object();
     timeObj.time = now.getTime();
     var jsonStr = JSON.stringify(timeObj);

    response.statusCode=200;
    response.setHeader("Content-Type","application/json;charset=utf-8");
    response.setHeader("Access-Control-Allow-Origin","*");

    response.end(jsonStr);
})

app.get("/jsonptime",function (request,response) {

    response.statusCode=200;
    response.setHeader("Content-Type","text/javascript;charset=utf-8");
    var fn = request.query.callback;
    //发回给客户端的并不是Json的数据,而是一段js代码

    var code=fn+"("+new Date().getTime()+")";
    console.log(code);
    response.end(code);

});

app.listen(3002,"127.0.0.1");