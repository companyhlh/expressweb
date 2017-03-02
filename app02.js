 /**
 * Created by maggie on 2017/2/23.
 */
 var express = require("express");

 var bodyParser =require("body-parser");

 var formidable = require("formidable");

 var userList =[];

 var app = express();

 //指明静态文件的存放路径
 app.use("/html",express.static("./public"));
 //使用bodyParser对提交的表单数据做转码
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

 app.set("view engine","ejs");
 app.set("views","./view");


 app.get("/",function (req,resp) {
  console.log("aaaaaaaaaaaaaa");
         var now = new Date();
         resp.render("test",{
            "time":now,
              "a" :123,
            "name" : "tom",
            "stuList":[{"stuname":"tom","age":18,"score":78},
             {"stuname":"jack","age":17,"score":77},
             {"stuname":"lily","age":21,"score":98},
             {"stuname":"wayne","age":28,"score":84},
             {"stuname":"rose","age":19,"score":85}
            ]
         });
//       resp.redirect("/html/login.html");
 });


 app.get("/",function (req,resp) {
      console.log("bbbbbbbbbbbbb");
      resp.send("这是第2个get");
 });

 app.get("/login",function (req,resp) {
       resp.render("login");
 });
 
 app.post("/login",function (req,resp) {
      resp.send("登陆成功");
 })


 app.get("/reg",function (req,resp) {

          console.log("有人注册");
          console.log(req.params);
          resp.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
          resp.end("接收成功");
          // resp.send("接收成功");
          // resp.json();
 });

//使用formidable模块解析表单数据
 app.get("/reg1",function (req,resp) {
     console.log("有人注册reg1");
     console.log(req.query.username);
     console.log(req.query.pwd);
     console.log(req.query.pwd2);
     var user = new Object();
     user.username=req.query.username;
     user.pwd = req.query.pwd;
     userList.push(user);
         //给客户端输出Json格式的响应
         resp.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
         var userListJSON= JSON.stringify(userList);
         resp.end(userListJSON);

 });
 
 app.post("/reg1",function (req,resp) {
     console.log(req.body);
     var user = new Object();
     user.username=req.body.username;
     user.pwd = req.body.pwd;
     userList.push(user);
     //给客户端输出Json格式的响应
     resp.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
     var userListJSON= JSON.stringify(userList);
     resp.end(userListJSON);
 });

 app.post("/reg2",function (req,resp) {
     console.log(req.body);
     var user = new Object();
     user.username= req.body.username;
     user.pwd = req.body.pwd;
     user.pwd2 = req.body.pwd2;
     userList.push(user);
     //给客户端输出Json格式的响应
     resp.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
     var userListJSON= JSON.stringify(userList);
     resp.end(userListJSON);
 });

 app.get("/admin/:oper" ,function (req,resp,next) {
  var isLogin=true;
  if(isLogin)
  {
   console.log("已登录,可以访问");
   next();
  }else
  {
   resp.send("您没有权限访问");
  }

 })
 
 app.get("/admin/chongzhi",function (req,resp) {
    //检测
      resp.send("这是后台的充值界面");
 })

 app.get("/admin/fahuo",function (req,resp) {
  //检测
      resp.send("这是后台的发货界面")
 })
 app.get("/admin/:oper" ,function (req,resp,next) {

      resp.send("您访问的页面不存在");

 })

 app.listen(3000, "localhost");