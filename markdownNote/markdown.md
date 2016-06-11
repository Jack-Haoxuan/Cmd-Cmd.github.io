# Markdown 标记
## 标题
标题用`#`插入行首表示，`#`越多表示标题的级数越高
```
【样例】
# 一级标题
## 二级标题
...
###### 六级标题
```

## 引用
在行首用`>`表示，同样`>`越多表示越内层的引用
```
> 引用
>> 引用内的引用
>>> 引用内的引用内的引用
> 退出引用需要多一个空行  
```

## 文本样式
* [这是本站首页](http://cmd-cmd.github.io/) -- 格式为`[]`+`()`，方括号里填写显示文字，圆括号里填写具体链接  
* 需要**加粗**的文字分别用两个`*`包围左右  
* 需要*斜体*的文字分别用一个`*`包围左右  
* 需要~~删除线~~的文字分别用两个`~`包围左右  
* 换行必须用`空格+空格+回车`这种蛋疼的形式  

* 不同段落之间空上一行  
* 用八个'-'表示分割线，如下   

--------

## 列表
### 无序列表用`*`开头
```
* 列表1
* 列表2
* 列表3
```

### 有序列表用`1.`开头
```
1. 列表1
2. 列表2
3. 列表3
```

## 图片链接
和链接的格式差不多，`!`+`[]`+`()`，例如下面是我的二维码名片
![我的二维码名片](../img/connect.png)

## 内嵌代码
内嵌代码段落用三个 `回勾号` 包围住，esc下面那个键
```
#include <iostream>
using namespace std;

int main(){
   cout << "Hello world!" << endl;
   return 0;
}
```

--------

## 资料整理
> [百度百科 - markdown](http://baike.baidu.com/subview/2311114/2311114.htm)  
> [markdown 11种基本语法](http://www.cnblogs.com/hnrainll/p/3514637.html)