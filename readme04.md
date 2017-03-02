## MongoDB数据库

### 数据库分类
    1. 关系型数据库  
    oracle mysql sqlserver
    2. 对象型数据库
    3. 文件型数据库
    
    
### MongoDB的特点
   1. 数据以文档的形式组织
   2. 所有的数据都以json格式存放
   3. 每条数据默认会添加_id字段
   4. 开源的
   5. 由于其数据是以json文档形式存放,所以它天生就适合大数据等技术的处理
 
### MongoDB的简单使用
#### 启动MongoDB服务器
   使用以下命令启动
   ```bash
     mongod --dbpath=yourpath
   ```
   注意: 你的路径要提前建好。
   注意: mongodb启动完毕后,不能关掉你的命令窗口,关掉即关闭了数据库
#### 使用命令行方式连接MongoDB数据库
  ```bash
    mongo --host=127.0.0.1
  ```
#### 创建数据库
  ```bash
    use dbname
  ```
  如果数据库存在,就切换到该数据库,如果不存先创建再切换
#### 查看数据库
   show dbs
#### 创建collection集合(表) 
  ```bash
    db.createCollection('userinfo')
  ```
#### 向集合(表)中插入数据
   ```bash
     db.userinfo.insert({username:'tom',pwd:'123'})
   ```
   注意:插入的数据是一个json对象,所以外面不要用引号
#### 查看集合中有多少数据
  ```
    db.userinfo.count()
  ```
  在一个数据集合中保存的数据document可以结构不同
  
  
  
