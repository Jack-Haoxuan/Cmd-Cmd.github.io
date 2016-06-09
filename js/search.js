// 限制取出
var limitStart = 0;
var limitEnd = 10;
// 加载框
var loading = {
  'id': '-1',
  'title': '<i class="fa fa-spinner fa-spin"></i> 加载中 <i class="fa fa-spinner fa-spin"></i>',
  'description': '如果一直加载不出来大概是服务器抽风啦！刷新吧~',
  'labels': {},
  'time': ''
};
// 没有更多
var noMore = {
  'id': '-1',
  'title': '<i class="fa fa-meh-o"></i> 没有更多啦 <i class="fa fa-spinner fa-meh-o"></i>',
  'description': '',
  'labels': {},
  'time': ''
};
// 传入关键字
var keyword = '';
var category = '-1';
$(function() {
  // 寻找关键字参数
  var arg = location.href.split(/[?&]/);
  for (var i = 0; i < arg.length; i++) {
    var eq = arg[i].search('=');
    if (eq != -1 && arg[i].slice(0,eq) == 'keyword') {
      keyword = arg[i].slice(eq + 1, arg[i].length);
    } else if (eq != -1 && arg[i].slice(0, eq) == 'category') {
      category = arg[i].slice(eq + 1, arg[i].length);
    }
  }
  // 分类查找
  if (category != '-1') {
    var lis = $('li[data-cate=' + category + ']').parents('li').andSelf();
    if (lis.length > 0) {
      lis.addClass('active');
    } else {
      category = '-1';
    }
  }
  // 详细页面
  $('#main_content').on('click', 'article', function() {
    if ($(this).attr('data-id') != '-1') {
      location.href = 'detail.html?id=' + $(this).attr('data-id');
    }
  });
  // 初始数据
  getData();

  // 滚动监听
  // startScroll();
});

// 开始滚动监听
function startScroll() {
  $('#main_content').scroll(function() {
    var sh = $('#main_content')[0].scrollHeight;
    var st = $('#main_content').scrollTop();
    var he = $('#main_content').height();
    if (st + he >= sh - 50) {
      $('#main_content').unbind('scroll');
      getData();
    }
  });
}

// 获取数据
function getData() {
  var temp = addArticle(loading);
  temp.find('header').prepend('<h1>' + temp.find('h3').html() + '</h1>');
  temp.find('h3').remove();
  temp.click(function() {
    location.reload();
  });
  $.post('http://c-m-d.ren/searchMD.php',
    {
      'limitStart': limitStart,
      'limitEnd': limitEnd,
      'keyword': keyword,
      'category': category
    },
    function(data) {
      temp.remove();
      data = JSON.parse(data);
      var count = 0;
      for (var datum in data) {
        count++;
        addArticle(data[datum]);
      }
      if (count >= 10) {
        limitEnd += 10;
        limitStart += 10;
        startScroll();
      } else {
        temp = addArticle(noMore);
        temp.find('header').prepend('<h1>' + temp.find('h3').html() + '</h1>');
        temp.find('h3').remove();
      }
    });
}
