/**
 * Created by maggie on 2017/2/28.
 */
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");

//在线用户列表 session会话
var userList=[];

var app = express();

//设置模板
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));

//设置静态资源
app.use(express.static(path.join(__dirname,"public")));
//解析请求参数
app.use(bodyParser.urlencoded({extended:true}));
//设置cookie;
app.use(cookieParser());

app.get("/",function(request,response){

    //用户访问首页时,必须要登陆,如果没登录就直接转到login.html,如果已登陆,就显示首页,并显示欢迎XXX
    //1 首先获得cookie中所保存的用户名和密码
      if(request.cookies.uname && request.cookies.pwd)
      {
          var user = {username:request.cookies.uname,pwd:request.cookies.pwd};
          //去到在线用户列表中查看用户存不存在
          var result =userList.filter(function (u) {
              if(u.username = user.username && u.pwd==user.pwd)
              {
                  return u;
              }
          })
          //如果result中有数据,那么用户就已经登陆,如果没数据,用户就没有登陆
         if(!result[0])
         {
             //不存在  就代表还没登陆
             //需要去数据库检查cookie中的用户名是否正确,如果正确即登陆,否则,不登录, 登陆后要加入到在线列表中  模拟自动登陆
             // 模拟查数据库正确
             userList.push();
         }


          response.render("index.ejs",{user:user});

      }else{

          response.redirect("/login.html");
      }
});


app.post("/login",function(request,response){

    var user = new Object();
    user.username=request.body.username;
    user.pwd = request.body.pwd;
    user.auto= request.body.auto;

    //到数据库检查用户名密码是否正确,
    //这里假设都正确

    userList.push(user);
    //判断用户是否选择了自动登陆
    if(user.auto === "1")
    {
        //为了下一次能够自动登陆,需要在用户端设置cookie记录下用户的用户名和密码
        response.cookie('uname',user.username,{maxAge:7*24*60*60*1000});
        response.cookie('pwd',user.pwd,{maxAge:7*24*60*60*1000});

    }

    response.redirect("/");
});

app.listen(3005,"127.0.0.1");