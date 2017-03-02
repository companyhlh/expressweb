/**
 * Created by maggie on 2017/2/28.
 */

var http = require('http');
var cookieParser = require('cookie-parser');

http.createServer(function (request,response) {

    if(request.url == "/")
    {
        //网站首页 请求到来时,可以给它发vip卡,也就是设置cookie
        var time = new Date(new Date().getTime()+24 * 60 * 60 * 1000);
        response.setHeader("Set-Cookie","uid=101;Expires=2017-03-30");
      //  response.setHeader("Set-Cookie","level=4");
      //  response.setHeader("Set-Cookie","sex=女");

        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.end("欢迎来到我的网站")


    }else if(request.url ="/buy")
    {
        //读取cookie是从request对象读取
        console.log(request.headers.cookie);
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.end("欢迎 尽情购物吧");


    }


}).listen(3003);
