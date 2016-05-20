$(function() {
  // 去掉输入URL控件条
  setTimeout(scrollTo,0,0,0);

  // 视觉差动画
  $('#scene').parallax();

  // 搜索栏
  $('#search').focus(function() {
    $(this).next().find('i.fa-search').animateCss('flip');
  });
});

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
