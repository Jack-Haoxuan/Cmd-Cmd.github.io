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
  $('div.rect span').each(function() {
    var tar = this;
    setInterval(function() {
      var r = parseInt(Math.random() * 150) + 100;
      var g = parseInt(Math.random() * 150) + 100;
      var b = parseInt(Math.random() * 150) + 100;
      $(tar).css('border-color', 'rgb(' + r + ', ' + g + ', ' + b + ')');
    }, 1000);
  });
  var lastX;
  var lastY;
  $('div.rect').on('mousedown', function(e) {
    lastX = e.clientX;
    lastY = e.clientY;
    $('body').on('mousemove', rectMove);
  });
  $('body').on('mouseup', function() {
    $('body').off('mousemove');
  });
  function rectMove(e) {
    var nowX = e.clientX;
    var nowY = e.clientY;
    var orgL = parseInt($('div.rect').css('left').slice(0, -2));
    var orgB = parseInt($('div.rect').css('bottom').slice(0, -2));
    $('div.rect').css('left', (orgL + nowX - lastX) + 'px');
    $('div.rect').css('bottom', (orgB - nowY + lastY) + 'px');
    lastX = nowX;
    lastY = nowY;
  }
  setInterval(function() {
    var cOe = Math.random() < 0.3;
    var tempText = '';
    if (cOe) {
      tempText = (Math.round(Math.random() * 20901) + 19968).toString(16);
      tempText = eval('\'\\u' + tempText + '\'');
    } else {
      var mOe = Math.random() < 0.5;
      if (mOe) {
        tempText = Math.floor(Math.random() * 10);
      } else {
        var lOu = Math.random() < 0.5;
        var ser = Math.floor(Math.random() * 26);
        if (lOu) {
          tempText = String.fromCharCode(97 + ser);
        }else {
          tempText = String.fromCharCode(65 + ser);
        }
      }
    }
    var fontSize = 30 + Math.floor(Math.random() * 40);
    var randomColor = Math.random();
    if (randomColor < 0.33) {
      randomColor = '#6699ff';
    } else if (randomColor < 0.66) {
      randomColor = '#ff6699';
    } else {
      randomColor = '#99ff66';
    }
    var tempLeft = Math.random() * 100;
    var tempTime = Math.random() * 3 + 2;
    var tempSpan = $('<span>').html(tempText).css({
        'font-size': fontSize + 'px',
        'color': randomColor,
        'left': tempLeft + '%',
        'animation': 'textDown ' + tempTime + 's linear',
        '-webkit-animation': 'textDown ' + tempTime + 's linear'
      });
    setTimeout(function() {
      tempSpan.remove();
    }, tempTime * 1000 + 100);
    $('div.bg').append(tempSpan);
  }, 100);
});
