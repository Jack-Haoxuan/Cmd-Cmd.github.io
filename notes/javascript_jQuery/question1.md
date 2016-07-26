记一个有趣的问题
========
题目的重点应该是原型与定时器，题目如下：

```
function MyObject(myInfo) {
  this.info = myInfo;
}
MyObject.prototype.sayInfo = function() {
  console.log(this.info);
};
MyObject.prototype.repeatSay = function() {
  setInterval(this.sayInfo, 1000);
};

var cmd = new MyObject('Cmd');
cmd.repeatSay();
```

**问怎样修改才能每秒输出一次'Cmd'**   
其实乍一看还以为这个程序没有错，但执行后发现每次输出都是`undefined`  
问题的关键就在于`setInterval`内调用的`this`还是`repeateSay`中的this(也就是`cmd`这个变量)吗？实际上已经被替换成其他东西了(可能是`window`或者什么其他的吧，总之绝不是`cmd`这个变量)  
知道了问题的根源就有解决方法了，当调用sayInfo的时候把调用对象换回来就好  
另外将一个对象赋值给一个变量，此时只是新建了一个指向此对象的指针，也就是C++里面的浅拷贝  

```
// 第一种方法
MyObject.prototype.repeatSay = function(){
    var temp = this; // 用一个临时变量复制此对象的指针
    setInterval(function(){
        temp.sayInfo();
    }, 1000)
}

// 第二种方法
MyObject.prototype.repeatSay = function() {
  setInterval(this.sayInfo.bind(this), 1000); // bind函数替换调用函数的对象
};
```
