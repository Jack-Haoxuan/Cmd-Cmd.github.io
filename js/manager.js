// 限制取出
var limitStart = 0;
var limitEnd = 10;
// 加载框
var loading = {
  'id': '-1',
  'title': '<i class="fa fa-spinner fa-spin"></i> 加载中 <i class="fa fa-spinner fa-spin"></i>',
  'description': '',
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

$(function() {
  // 初始数据
  getData();

  // 滚动监听
  // startScroll();

  // 修改
  $('#main_content').on('click', 'button[name=modify]', function() {
    var tempId = $(this).parents('article.preview').eq(0).attr('data-id');
    location.href = 'pages/editMD.html?id=' + tempId;
  });

  // 删除
  $('#main_content').on('click', 'button[name=delete]', function() {
    var tempArt = $(this).parents('article.preview').eq(0);
    $('#password').modal();
    // 关闭
    $('#password').on('hidden.bs.modal', function() {
      $('input[name=password]').val('');
      $('#verifyInfo').html('');
      $('#verifyOK').unbind('click');
    });
    // 确认
    $('#verifyOK').click(function() {
      var pw = $('input[name=password]').val();
      if (md5(pw) != '2503704a87512e963097c25576bb24fe') {
        $('#verifyInfo').html('密码错误!');
      } else {
        $('#password').modal('hide');
        $.post('http://c-m-d.ren/deleteMD.php',
          {
            'password': pw,
            'id': tempArt.attr('data-id')
          },
          function(data) {
            if (data == 0) {
              tempArt.remove();
              limitStart -= 1;
              limitEnd -= 1;
            } else {
              alert(data);
            }
          }
        );
      }
    });
  });
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
    location.href = 'index.html';
  });
  $.post('http://c-m-d.ren/index.php',
    {
      'limitStart': limitStart,
      'limitEnd': limitEnd
    },
    function(data) {
      temp.remove();
      data = JSON.parse(data);
      var count = 0;
      for (var datum in data) {
        count++;
        var atc = addArticle(data[datum]);
        atc.find('time').append(' <button class="btn btn-xs btn-success" name="modify">修改</button>');
        atc.find('time').append(' <button class="btn btn-xs btn-danger" name="delete">删除</button>');
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
