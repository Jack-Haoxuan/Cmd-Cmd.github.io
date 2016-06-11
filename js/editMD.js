var id = -1;
$(function() {
  // 寻找id参数
  var arg = location.href.split(/[?&]/);
  for (var i = 0; i < arg.length; i++) {
    var eq = arg[i].search('=');
    if (eq != -1 && arg[i].slice(0,eq) == 'id') {
      id = arg[i].slice(eq + 1, arg[i].length);
      break;
    }
  }
  if (id != -1) { // 修改页面 & 获取数据
    $('input, textarea').attr('disabled', 'disabled').val('获取中...');
    $('select').attr('disabled', 'disabled');
    $('#submit').addClass('disabled').html('正在获取数据...');
    $.post(
        'http://c-m-d.ren/getMD.php',{
          'id': id
        },
        function(data) {
          if (data != '0') {
            data = JSON.parse(data);
            $('input[name=title]').val(data.title);
            $('input[name=description]').val(data.description);
            $('textarea[name=content]').val(data.content);
            $('select[name=category]').val(data.category);
            for (var la in data.label) {
              var newLabel = $('<label>');
              newLabel.addClass('label label-' + data.label[la]).html(la);
              $('#labels').append(newLabel);
            }
          } else {
            id = -1;
          }
          $('input, textarea, select').removeAttr('disabled');
          $('#labelName, #search, input[type=password]').val('');
          $('#submit').removeClass('disabled').html('开始上传');
        }
    );
  }

  // 添加标签
  $('#addLabel').on('click', 'button.btn-block', function() {
    var name = $('#labelName').val().trim();
    $('#labelName').val('');
    if (name.length == 0) {
      $('#labelName').focus();
      return;
    }
    var cl = $(this).attr('class').split(' ')[2].split('-')[1];
    var newLabel = $('<label>').addClass('label label-' + cl).html(name);
    $('#labels').append(newLabel);
  });

  // 删除标签
  $('#labels').on('click', 'label.label', function() {
    this.remove();
    return false;
  });

  // 上传
  $('#submit').click(function() {
    var pw = '';
    // 验证密码
    $('#password').modal();
    // 关闭
    $('#password').on('hidden.bs.modal', function() {
      $('input[name=password]').val('');
      $('#verifyInfo').html('');
      $('#verifyOK').unbind('click');
    });
    // 确认
    $('#verifyOK').click(function() {
      pw = $('input[name=password]').val();
      if (md5(pw) != '2503704a87512e963097c25576bb24fe') {
        $('#verifyInfo').html('密码错误!');
      } else {
        $('#password').modal('hide');

        // 验证输入
        var inputs = $('#markdown input, #markdown textarea');
        for (var i = 0; i < inputs.length; i++) {
          if ($(inputs[i]).val().trim() == '') {
            $(inputs[i]).focus();
            return;
          }
        }
        // 标签
        var labels = {};
        var la = $('#labels label');
        for (var i = 0; i < la.length; i++) {
          labels[$(la[i]).html()] = $(la[i]).attr('class').split('-')[1];
        }
        // 数据
        var data = {
          'password': pw,
          'title': $('input[name=title]').val(),
          'description': $('input[name=description]').val(),
          'content': $('textarea[name=content]').val().replace(/\\/g, '\\\\').replace(/\'/g, '\\\''),
          'time': nowTime(),
          'label': labels,
          'category': $('select[name=category]').val()
        };
        // ajax上传
        $('#submit').addClass('disabled').html('正在上传...');
        if (id != -1) { // 修改
          data.id = id;
          $.post(
              'http://c-m-d.ren/modifyMD.php',
              data,
                function(data) {
                  if (isNaN(parseInt(data))) {
                    alert(data);
                  } else {
                    alert('修改成功');
                    location.href = '../manager.html';
                  }
                  $('#submit').removeClass('disabled').html('开始上传');
                }
          );
        } else { // 新建
          $.post(
              'http://c-m-d.ren/createMD.php',
              data,
                function(data) {
                  if (isNaN(parseInt(data))) {
                    alert(data);
                  } else {
                    alert('添加成功');
                    location.href = 'detail.html?id=' + parseInt(data);
                  }
                  $('#submit').removeClass('disabled').html('开始上传');
                }
            );
        }
      }
    });
  });
});

// 返回当前时间
function nowTime() {
  // 当前时间
  var d = new Date();
  var s = '';
  s += d.getFullYear();
  s += '-' + (d.getMonth() + 1);
  s += '-' + d.getDate();
  s += ' ' + d.getHours();
  s += ':' + d.getMinutes();
  s += ':' + d.getSeconds();
  return s;
}
