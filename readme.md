## package.json文件的作用
package.json文件是用来记录NodeJS项目所需要用到的依赖模块,在这个文件中有一个dependencies属性,这里记录了我们的项目中所需要用到的所有的第三方模块及其版本号。这一非常方便的管理第三方模块的依赖关系及版本的更新。
  1. 在项目文件夹下使用 npm init 创建package.json文件
  2. 当需要使用某个第三方模块时,可以用下面的命令安装模块,并将这个模块的依赖关系自动记录到package.json中
  ```javascript
  npm install 模块名 --save
  ```

  3. 在部署项目是可以不用复制项目下的node_modules文件夹
    而是使用下面的命令安装,它会自动根据package.json文件的依赖列表去下载合适的模块并安装好
    ```bash
    npm install
    ```


## Express的特点
### 提供了路由功能
#### Restful前后端通讯接口设计原则
  1. 这种设计围绕针对数据的操作 增删改查 CRUD
  2. web的访问路径 应该类似于 http://域名/student
  3. http请求类型做了扩充 原来常用的只有post get。扩充后则增加了delete put update
#### Express在设计时充分考虑到了 Restful的设计原则,提供了get,post,delete,put等方法,专门处理对应的请求类型
  4.  这些方法的请求路径可以一致
  5. all方法匹配对某一路径的所有请求类型

#### 路由的匹配原则
   遵循从上往下的匹配原则,先遇上的先匹配,后面的匹配原则不会再处理.在匹配路径时,?号之后的字符串会被忽略。路径中不区分大小写。
   匹配路径中可以使用正则表达式来设定匹配规则
#### 获取路径参数的2种方式
  1. 使用正则表达式  如下
  ```javascript
    app.get(/^\/student\/([\d]{8})$/,function (req,resp) {
    var stuId = req.params[0];
    resp.send("根据学号"+stuId+"查学生信息");
    });
  ```
  2. 使用冒号的形式
  ```javascript
    app.get("/student/:id",function (req,resp) {
    var stuId = req.params["id"];
    resp.send("冒号方式:根据学号"+stuId+"查学生信息");

   })
  ```

### 提供了静态资源文件的自动引用
  设置静态资源的访问路径如下:
  ```javascript
   app.use("/html",express.static("./public"));
  ```
  可以将所有的静态资源(html,css,前端的js,图片等)统一放到一个文件夹下
  这些静态资源的访问路径就是 http://127.0.0.1:3000/html/login.html

### 提供了中间件的概念


### 提供了模板引擎
   1. 使用如下代码注册模板引擎为ejs,再设置模板的存放路径
   ```javascript
     app.set("view engine","ejs");
     app.set("views","./view");//前一个参数固定  后一参数是模板存放的路径
   ```

   2. 在view中新建.ejs后缀的模板文件,语法和html一致

   3. 需要在动态填充数据的地方使用 <%=变量名%> 这样的占位符填充数据

   4. 在服务端代码中,使用app.render()函数渲染模板(即往模板中填充数据)
      这个函数第一个参数是模板的名字,第2个参数是要填充的数据。这些数据被封装成一个对象,这个对象的每一个属性就是一个填充的值。

##### 模板的缺点
   1. 破坏了mvc的设计原则
   2. 不利于复杂页面的编写
   3. 不利于前后端的完全分离