$(function() {
  var state = 0;
  $('div.rect span.bottom').css('opacity', '1');
  setInterval(function() {
    switch (state) {
    case 0: {
      $('div.rect span.bottom').eq(0).removeClass('bottom').addClass('left');
      break;
    }
    case 1: {
      $('div.rect span.left label').addClass('goCircle');
      $('div.rect span.bottom').eq(0).removeClass('bottom').addClass('right');
      break;
    }
    case 2: {
      $('div.rect span.left label').removeClass('goCircle');
      $('div.rect span.right label').addClass('goCircle');
      $('div.rect span.bottom').eq(0).removeClass('bottom').addClass('back');
      break;
    }
    case 3: {
      $('div.rect span.right label').removeClass('goCircle');
      $('div.rect span.back label').addClass('goCircle');
      $('div.rect span.bottom').eq(0).removeClass('bottom').addClass('front');
      break;
    }
    case 4: {
      $('div.rect span.back label').removeClass('goCircle');
      $('div.rect span.front label').addClass('goCircle');
      $('div.rect span.bottom').eq(0).removeClass('bottom').addClass('top');
      break;
    }
    case 5: {
      $('div.rect span.front label').removeClass('goCircle');
      $('div.rect span.top label').addClass('goCircle');
      $('div.rect span.bottom label').addClass('goCircle');
      $('div.rect span.front').removeClass('front').addClass('frontR');
      $('div.rect span.left').removeClass('left').addClass('leftR');
      $('div.rect span.right').removeClass('right').addClass('rightR');
      $('div.rect span.back').removeClass('back').addClass('backR');
      $('div.rect span.bottom').removeClass('bottom').addClass('bottomR');
      setTimeout(function() {
        $('div.rect').addClass('down');
      }, 300);
      break;
    }
    case 6: {
      $('div.rect').removeClass('down');
      $('div.rect span label').removeClass('goCircle');
      $('div.rect span').attr('class', 'bottom');
      break;
    }}
    if (state < 6) {
      state++;
    } else {
      state = 0;
    }
  }, 1050);
});
