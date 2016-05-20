$(function() {
  // 去掉输入URL控件条
  setTimeout(scrollTo,0,0,0);

  // 视觉差动画
  $('#scene').parallax();

  // 设置动画
  setAnimate();
});

// 设置动画
function setAnimate() {
  // 搜索栏
  $('#search').focus(function() {
    $(this).next().find('i.fa-search').animateCss('flip');
  });

  // 导航覆盖
  $('aside li').hover(function() {
    $(this).animateCss('pulse');
  });
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
