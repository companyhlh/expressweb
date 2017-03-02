## 什么是AJAX  Ansyc JavaScript And  XML(Extends Mark Language) 异步js

### 传统的web开发 之前的网站页面都是互相跳转。页面会有刷新。
    这种处理方式是同步的
### 异步的JavaScript 是指 浏览器的前端页面保持不变 在当前页面的后台直接与服务器端通讯。服务器端与js端之间的通讯都是使用的xml格式。所以这个技术合在一起简称AJAX

### 目前都是使用json替代xml


### ajax传送数据的方式
 1.  get方式发送 键值对的字符串 , 服务器端返回json数据
     客户端的发送代码如下
     ```javascript
          var xhr = new XMLHttpRequest();
          var str="username="+nameTxt.value+"&pwd="+pwdTxt.value+"&pwd2="+pwd2Txt.value;
          xhr.open("get","/reg1?"+str,true);
          xhr.send();     
     ```
     服务端接收数据,直接访问req.query属性,获得传过来的数据
     服务端发送响应时,因为要发送的是json格式,所以代码如下
     ```javascript
          var user = new Object();
          user.username=req.query.username;
          user.pwd = req.query.pwd;
          userList.push(user);
              //给客户端输出Json格式的响应
              resp.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
              var userListJSON= JSON.stringify(userList);
              resp.end(userListJSON);

     
     ```
 

 
 2.  post方式发送键值对的字符串,  服务端返回json数据
     客户端代码入下
     ```javascript
             var xhr = new XMLHttpRequest();
             var str="username="+nameTxt.value+"&pwd="+pwdTxt.value+"&pwd2="+pwd2Txt.value;
             xhr.open("post","/reg1",true);
             //在open之后 要设置x-www-form-urlencoded;
             xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
             ;
             xhr.send(str);
     ```
     服务端代码,需要解析post的数据,所以可以用第三方模块body-parser
     这个body-parser只能解析普通提交的数据,如果要解析mutilpart的数据(同时有文件上传的数据)则需要使用formidable.
     安装body-parser使用如下命令
     ```bash
       npm install body-parser --save
     ```
     然后在NodeJS当中 首先要reuqire进来,再用它强制解析request,代码如下
     ```javascript
      var bodyParser =require("body-parser");
       //使用bodyParser对提交的表单数据做转码
       app.use(bodyParser.urlencoded({ extended: false }));
     ```
     这样在后续代码中可以使用request.body.属性名的形式访问到请求数据
     
     
 3.  post方式发送json格式的数据, 服务端返回json数据
     在前端页面的ajax代码中,现将数据封装成对象,然后使用JSON.stringfy这个函数将这个对象转换成json的字符串。然后在xhr.open函数之后使用xhr.setRequestHeader("Content-type","application/json");设置请求头,然后发送数据xhr.send(jsonStr);
     
     服务端NodeJS代码中还是使用body-parser模块,最前方加入中间件 app.use(bodyParser.json());解析json数据。之后可以使用req.body.属性名获得具体的json数据
     
     这种方式一般在移动app与服务器端通讯时使用

                
                                          
 ## Ajax的跨域问题
 
 http://127.0.0.1:3000/reg2
 http://localhost:63342/myexpressweb/public/reguser3.html?_ijt=pme544af552hm5pv9i1ct8emgb

 ### JS代码访问要求同源的安全策略
    同源是指 在js代码中使用ajax访问服务器端的资源时,浏览器会默认要求访问的发起者的url地址与访问的资源的服务器端地址要同源(协议,IP或域名,以及端口号要完全一致)。
 ### 跨域问题
   请求端的url与服务按端的url地址在协议,ip或域名,以及端口号这三者有任意一处不相同,就说这个请求跨域了。
 ### 在移动端的app中与服务器端通讯时很常见。
 
 ## 解决跨域访问的几种方式
 ### 使用JSONP技术
   1. JSONP实际是利用了客户端页面中\<script\>标签的src属性是取某个地址下载js代码并执行的特性。
   2. 在使用时客户端,先将要执行的操作封装成一个函数,函数名随便取,例如叫做fn.其必须要有一个参数,参数名随便,这个参数表示的是需要服务端提供的数据。
   3. 在页面中添加一个script标签,src属性的值,是服务器端提供数据的地址。
   4. 这个地址后面要以?附加的形式加入一个名叫callback的参数,它的值,是你前面所定义的函数的名字
   5. 在服务器端接收到callback参数后,获取到函数名称,然后产生数据 再使用字符串拼接的方式 产生一个形如 fn(data)的js代码,最后发回给客户端
   6. 需要注意 jsonp方式必须是get请求
   7. 服务端必须设置响应头是 text/javascript
 
 ### 第2种方法  只要在服务器端设置 响应头 Access-Control-Allow-Origin的值为*即可解决跨域。当然只支持先进浏览器。 移动端完全支持
 
http://matchweb.sports.qq.com/kbs/list?callback=gameList&columnId=100000&startTime=2017-02-24&endTime=2017-03-02&_=1488198706583