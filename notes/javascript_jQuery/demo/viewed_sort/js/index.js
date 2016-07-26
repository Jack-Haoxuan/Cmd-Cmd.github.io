var data; // 用于存放数据
var shot; // 用于存放每一步的快照
var timer; // 渲染定时器

$(function() {
  init();
});
// 初始化函数
function init() {
  data = [];
  shot = [];
  $('#btnFastSort').click(fastSort);
  $('#btnBubbleSort').click(bubbleSort);
  $('#btnSelectSort').click(selectSort);
  $('#btnLeftAdd').click(leftInsert);
  $('#btnLeftDel').click(leftDelete);
  $('#btnRightAdd').click(rightInsert);
  $('#btnRightDel').click(rightDelete);
  $('#btnRandomData').click(randomData);
  $('div.viewport').on('click', 'span', removeSelf);
}
// 移除自身
function removeSelf() {
  var index = $(this).attr('data-order');
  data.splice(index, 1);
  renderViewport();
  alertInfo('删除成功 - 当前数据个数为:' + data.length);
}
// 左侧插入数据
function leftInsert() {
  if (!checkLength(true)) {
    alertInfo('左侧添加失败 - 当前数据个数为:' + data.length);
    return;
  }
  data.unshift(getInput());
  renderViewport();
  alertInfo('左侧添加成功 - 当前数据个数为:' + data.length);
}
// 左侧删除数据
function leftDelete() {
  if (!checkLength(false)) {
    alertInfo('左侧删除失败 - 当前数据个数为:' + data.length);
    return;
  }
  data.shift(getInput());
  renderViewport();
  alertInfo('左侧删除成功 - 当前数据个数为:' + data.length);
}
// 右侧插入数据
function rightInsert() {
  if (!checkLength(true)) {
    alertInfo('右侧添加失败 - 当前数据个数为:' + data.length);
    return;
  }
  data.push(getInput());
  renderViewport();
  alertInfo('右侧添加成功 - 当前数据个数为:' + data.length);
}
// 右侧删除数据
function rightDelete() {
  if (!checkLength(false)) {
    alertInfo('右侧删除失败 - 当前数据个数为:' + data.length);
    return;
  }
  data.pop(getInput());
  renderViewport();
  alertInfo('右侧删除成功 - 当前数据个数为:' + data.length);
}
// 检测数据是否可以继续添加或者删除
function checkLength(isAdd) {
  if (isAdd && data.length >= 1000) {
    return false;
  } else if (!isAdd && data.length <= 0) {
    return false;
  }
  return true;
}
// 显示提示信息
function alertInfo(infoStr) {
  $('#alertWindow').html(infoStr);
}
// 获取输入框数据
function getInput() {
  var temp = parseInt($('#inNumber').val().trim());
  if (isNaN(temp) || temp < 1 || temp > 1000) {
    temp = parseInt(Math.random() * 1000 + 1);
  }
  $('#inNumber').val('');
  return temp;
}
// 按照快照渲染
function renderStep() {
  stopUser();
  timer = setInterval(function() {
    if (shot.length == 0) {
      clearInterval(timer);
      startUser();
      return;
    }
    var spana = $('div.viewport span').eq(shot.shift());
    var spanb = $('div.viewport span').eq(shot.shift());
    spana.after(spanb.clone());
    spanb.after(spana.clone());
    spana.remove();
    spanb.remove();
  }, 10);
}
// 渲染界面
function renderViewport() {
  $('div.viewport').html('');
  $(data).each(function(index) {
    var tempSpan = getSpan(this);
    tempSpan.attr('data-order', index);
    $('div.viewport').append(tempSpan);
  });
}
// 获取span元素
function getSpan(num, color) {
  var temp = $('<span>').attr('title', '点击删除数据: ' + num);
  var color = ['100%', '50%'];
  color.unshift(parseInt(360 / 1000 * num));
  color = 'hsl(' + color.join() + ')';
  temp.css({
    'height': (num / 2) + 'px',
    'background-color': color
  });
  return temp;
}
// 重置并随机生成数据
function randomData() {
  data = [];
  var number = getInput();
  for (var i = 0; i < number; i++) {
    data.push(parseInt(Math.random() * 1000 + 1));
  }
  renderViewport();
  alertInfo('重置并随机生成了' + data.length + '个数据');
}
// 禁止用户操作界面
function stopUser() {
  $('input, button').prop('disabled', true);
  var stopButton = $('<button>').addClass('btn btn-danger btn-xs pull-right');
  stopButton.click(function() {
    clearInterval(timer);
    startUser();
  }).html('跳过可视化渲染');
  $('#alertWindow').after(stopButton);
}
// 允许用户操作界面
function startUser() {
  renderViewport();
  $('input, button').prop('disabled', false);
  alertInfo('可视化渲染完成');
  $('#alertWindow').parent().find('button').remove();
}
// 快速排序
function fastSort() {
  shot = [];
  alertInfo('正在快速排序...');
  var startTime = Date.now();
  (function itFunc(start, end) {
    if (end <= start) {
      return;
    }
    var base = start;
    var left = start;
    var right = end;
    var rtl = true;
    while (left != right) {
      if (rtl) {
        if (data[right] < data[base]) {
          shot.push(base, right);
          var temp = data[base];
          data[base] = data[right];
          data[right] = temp;
          base = right;
          rtl = false;
        } else {
          right--;
        }
      } else {
        if (data[left] > data[base]) {
          shot.push(base, left);
          var temp = data[base];
          data[base] = data[left];
          data[left] = temp;
          base = left;
          rtl = true;
        } else {
          left++;
        }
      }
    }
    itFunc(start, base - 1);
    itFunc(base + 1, end);
  })(0 ,data.length);
  alertInfo('快速排序完成 用时: ' + (Date.now() - startTime) + 'ms 可视化渲染中');
  renderStep();
}
// 冒泡排序
function bubbleSort() {
  shot = [];
  alertInfo('正在冒泡排序...');
  var startTime = Date.now();
  for (var i = 0; i < data.length - 1; i++) {
    for (var j = 0; j < data.length - i - 1; j++) {
      if (data[j] > data[j + 1]) {
        shot.push(j, j + 1);
        var temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }
  alertInfo('冒泡排序完成 用时: ' + (Date.now() - startTime) + 'ms 可视化渲染中');
  renderStep();
}
// 选择排序
function selectSort() {
  shot = [];
  alertInfo('正在选择排序...');
  var startTime = Date.now();
  for (var i = 0; i < data.length - 1; i++) {
    for (var j = i + 1; j < data.length; j++) {
      if (data[i] > data[j]) {
        shot.push(i, j);
        var temp = data[i];
        data[i] = data[j];
        data[j] = temp;
      }
    }
  }
  alertInfo('选择排序完成 用时: ' + (Date.now() - startTime) + 'ms 可视化渲染中');
  renderStep();
}
