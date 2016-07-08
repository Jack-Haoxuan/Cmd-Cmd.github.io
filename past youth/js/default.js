$(function() {
  // 去掉输入URL控件条
  setTimeout(scrollTo,0,0,0);

  // 视觉差动画
  $('#scene').parallax();

  // 设置动画
  startAnimistion();
  setAnimate();

  // 标签搜索指引
  $('#main_content').on('click', 'label.label', function() {
    $('#search').val($(this).html()).focus();
    return false;
  });

  // 搜索
  $('#searchBtn').click(function() {
    $('#searchForm').submit();
  });

  // 进入管理页面
  $('#search').keydown(admin);
});

// 进入管理页面
adminState = 0;
function admin(e) {
  console.log();
  if (adminState < 2 && e.keyCode == 17) {
    adminState++;
  } else if ((adminState == 2 || adminState == 4) && e.keyCode == 37) {
    adminState++;
  } else if ((adminState == 3 || adminState == 5) && e.keyCode == 39) {
    adminState++;
  } else {
    adminState = 0;
  }
  if (adminState == 6) {
    console.log('触发秘密开关');
    if (location.pathname.indexOf('/pages/') != -1) {
      location.href = '../manager.html';
    }else {
      location.href = 'manager.html';
    }
    return false;
  }
}

// 设置动画
function setAnimate() {
  // 搜索栏
  $('#search').focus(function() {
    $(this).next().find('i.fa-search').animateCss('flip');
  });

  // 导航覆盖
  $('aside li').hover(function() {
    $(this).animateCss('pulse');
  }, function() {});
}

// Animate动画
$.fn.extend({
  animateCss: function(animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd' +
        ' MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
  }
});

// 添加文章预览
function addArticle(orgInfo) {
  var info = $.extend({
    'id': '-1',
    'title': '无标题',
    'description': '无描述',
    'labels': {},
    'time': '未知'
  }, orgInfo);
  var atc = $('<article>').addClass('preview').attr('data-id', orgInfo.id);

  // 标题 & 描述
  atc.append('<header><h3>' + info.title + '</h3></header>');
  atc.append('<p>' + info.description + '</p>');

  // 脚注
  var ftr = $('<footer>');
  for (var label in info.labels) {
    var lb = $('<label>');
    lb.addClass('label').addClass('label-' + info.labels[label]);
    lb.append(label);
    ftr.append(lb);
  }
  ftr.append('<time class="text-info pull-right">' + info.time + '</time>');
  ftr.prepend('<i class="fa fa-tags"></i> ');
  ftr.find('time').prepend('<i class="fa fa-clock-o"></i> ');

  // 加入正文
  atc.append(ftr);
  $('#main_content').append(atc);
  atc.animateCss('zoom-in');
  return atc;
}

function startAnimistion() {
  $('.animsition').animsition({
      //   inClass: 'zoom-in',
      //   outClass: 'zoom-out',
      inDuration: 500,
      outDuration: 500,
      linkElement: '.animsition-link',
      loading: true,
      loadingParentElement: 'body', //animsition wrapper element
      loadingClass: 'animsition-loading',
      loadingInner: '&nbsp;Cmd', // e.g '<img src="loading.svg" />'
      //   timeout: false,
      //   timeoutCountdown: 5000,
      // onLoadEvent: true,
      // browser: ['animation-duration', '-webkit-animation-duration'],
      // // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
      // // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
      // overlay: false,
      // overlayClass: 'animsition-overlay-slide',
      // overlayParentElement: 'body',
      // transition: function(url) { window.location.href = url; }
    });
}
