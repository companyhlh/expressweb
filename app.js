/**
 * Created by maggie on 2017/2/23.
 */
var express = require("express");

//创建应用
var app = express();

//处理网络请求的路由 所有访问网站的请求都会被后面的回调函数处理
app.get("/", function (req,resp) {

    //这里的request和response对象都是被express将原先
    //node中的request和response对象包装后产生的,功能上有很多增强
    resp.send("欢迎来到我的网站");
})

// http://127.0.0.1:3000/student?id=1234567
// http://127.0.0.1:3000/student
app.get("/STUDENT",function (req,resp) {

    resp.send("欢迎查询学生信息");
});

//路径参数
//http://127.0.0.1:3000/student/87654321
app.get(/^\/student\/([\d]{8})$/,function (req,resp) {
    var stuId = req.params[0];
    resp.send("根据学号"+stuId+"查学生信息");
});

app.get("/student/:id",function (req,resp) {
    var stuId = req.params["id"];
    resp.send("冒号方式:根据学号"+stuId+"查学生信息");

})
app.post("/student",function (req,resp) {
    resp.send("更新学生信息");
})
app.put("/student",function (req,resp) {
    resp.send("插入学生信息");
})

app.delete("/student",function (req,resp) {
    resp.send("删除学生信息");
});

app.all("/teacher",function (req,resp) {
    resp.send("处理teacher 的所有请求");
})

app.get("/teacher",function (req,resp) {

    resp.send("欢迎查询老师信息");
});

//启动应用
app.listen(3000,"localhost");