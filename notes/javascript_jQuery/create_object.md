js各种模式的自定义对象
========
js中用的最多的肯定就是对象(Object)了，通过将某些属性和某些方法放到某个对象内进行封装，可以避免之后的各种繁琐工作  

# 工厂模式
在某函数内创建一个对象，并在函数中赋予这个对象属性和方法，最后将此对象返回  

```
function createObject(name, type){
    var obj = new Object();
    obj.name = name;
    obj.type = type;
    obj.alertName = function(){
        alert(this.name);
    }
    return obj;
}

var myObj = createObject('Cmd', 'human');
```

* \+ 创建多个相似对象  
* \- 无法识别对象类型(生成的对象都是`Object`类型)  

# 构造函数模式

```
function Human(name, age){
    this.name = name;
    this.age = age;
    this.info = function(){
        alert("名字：" + this.name + "年龄：" + this.age);
    }
}

var me = new Human('Cmd', 21); // 可以看到这里是新建一个'Human'对象
```

* \! 并不是显示创建对象  
* \! 不需要`return`  
* \! 通过`new`关键字创建对象  
* \+ 能够识别对象  
* \- 创建了多个对象的方法，理论上每个对象的属性不同，但是方法是可以相同的  

> 也许会想到，我们可以将`this.info`这个方法移到构造函数之外，变成一个全局函数，但是在全局中去定义某个对象专有的方法，这明显破坏了对象的封装性  

# 原型模式
每个对象都有原型(prototype)属性，这个属性指向一个对象（并不是这个对象的某个实例），这个对象包含所有实例 **共享** 的属性和方法，这就是原型的好处  

```
function Human(){}

Human.prototype.name = 'Cmd';
Human.prototype.age = 21;
Human.prototype.info = function(){
    alert("名字：" + this.name + "年龄：" + this.age);
}

var me = new Human(), anotherMe = new Human();
me.age = 12;
anotherMe.info(); // 输出 - 名字：Cmd年龄：12
```

* \+ 解决了实例共享的属性和方法问题  
* \- 默认情况下所有实例都有相同的属性和方法，没有了构造函数模式中每个实例的差异性  
* \- 因为所有实例都共享一个原型里面的所有属性和方法，那么某个实例修改了它的属性和方法，必然也会牵扯到其他实例  

# 混合模式(构造+原型)
正如上面纯原型模式所列举的缺点，通常不会单独使用原型模式，而是构造函数+原型这种 **混合模式**  

```
// 构造函数
function Human(name, age){
    this.name = name;
    this.age = age;
}
// 原型模式
Human.prototype.info = function(){    
    alert("名字：" + this.name + "年龄：" + this.age);
}

var me = new Human("Cmd", 21), you = new Human("dmC", 12);
me.info(); // 输出 - 名字：Cmd年龄：21
you.info(); // 输出 - 名字：dmC年龄：12
```

* \+ 每个实例有着自己的属性和自己的方法，也有着这个对象共享的属性和方法，最大限度节省了内存  

> 这是使用最广泛，认同度最高的定义对象方法  

# 动态原型模式
将所有信息封装在构造函数(包括原型)，但仅第一个对象实例化时才会初始化原型  

```
function Human(name, age){
    this.name = name;
    this.age = age;
    if (typeof this.info != funciton){ // 判断是否有定义过原型，达到只执行一次的效果
        Human,prototype.info = funciton(){
            alert("名字：" + this.name + "年龄：" + this.age);
        }
    }
}
```

* \! 更为直观的封装对象(全部在一个构造函数内)，但是也增大了代码量使得阅读复杂  

> [JS面向对象基础讲解(工厂模式、构造函数模式、原型模式、混合模式、动态原型模式)](http://www.jb51.net/article/53823.htm)  
