## react 学习笔记
###（一） react 生命周期
(1)getDefaultProps
作用于组件类，只调用一次，返回对象用于设置默认的props,对于引用值，会在实例中共享。

(2)getInitialState
作用于组件的实例，在实例创建时调用一次，用于初始化每一个实例的state，此时可以访问this.props.

(3)compenentWillMount
在完成首次渲染之前调用，此时仍可以修改组件的state

(4)render
必选的方法，创建虚拟DOM，该方法具有特殊的规则：
 1.只能通过this.props和this.state访问数据
 2.可以返回null、false或任何React组件
 3.只能出现一个顶级组件（不能返回数组）
 4.不能改变组件的状态
 5.不能修改DOM的输出
 
 （5）componentDidMount
 真实的DOM被渲染出来后调用，在该方法中可以通过this.getDOMNode()访问到真实的DOM元素。
 此时可以使用其他类库来操作这个DOM。
 在服务器中，该方法不会被调用
 
 （6）componentWillReceiveProps
 组件接收新的props时调用，并将其作为参数nextProps使用，此时可以更爱组件的props及state
 componentWillReceiveProps:function(nextProps){
      if(nextProps.bool){
      this.setState({
      bool:true
      })
      
     }
   }
 

