var id = -1;
$(function() {
  $('article.detailview').click(function() {
    location.reload();
  });
  // 寻找id参数
  var arg = location.href.split(/[?&]/);
  for (var i = 0; i < arg.length; i++) {
    var eq = arg[i].search('=');
    if (eq != -1 && arg[i].slice(0,eq) == 'id') {
      id = arg[i].slice(eq + 1, arg[i].length);
      break;
    }
  }
  if (id == -1) {
    location.href = '../index.html';
  }
  // 获取数据
  $.post(
    'http://c-m-d.ren/getMD.php',{
      'id': id
    },
    function(data) {
      if (data != '0') {
        data = JSON.parse(data);
        var atc = $('article.detailview');
        atc.unbind('click');
        // 导航
        var lis = $('li[data-cate=' + data.category + ']').parents('li').andSelf();
        lis.addClass('active');
        // 标题
        $('title').html('Cmd小站 - ' + data.title);
        atc.find('.detailTitle span').html(data.title);
        atc.find('.detailTitle time').html(data.time);
        // 正文
        var md = window.markdownit();
        var result = md.render(data.content);
        atc.find('.detailBody').html(result);
        // 页脚
        for (var i in data.label) {
          var lb = $('<label>');
          lb.addClass('label').addClass('label-' + data.label[i]);
          lb.append(i);
          atc.find('.detailFooter').append(lb);
        }
        atc.find('.detailFooter').append('<time class="text-info pull-right">' + data.time + '</time>');
        atc.animateCss('bounceInDown');
      } else {
        location.href = '../index.html';
      }
    }
    );
});
