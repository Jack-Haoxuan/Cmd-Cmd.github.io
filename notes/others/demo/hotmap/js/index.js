$(function() {
  // svgFitWidth();
  tipDrop();
});

function svgFitWidth() {
  function fitWidth() {
    $('#hotmap').css('width', $('#mainContent').width() + 'px');
  };
  fitWidth();
  $(window).resize(function() {
    fitWidth();
  });
}

function tipDrop() {
  $('#mainContent').on('click', '.hotarea', function(e) {
      $('.hotarea').attr('class', 'hotarea');
      $(this).attr('class', 'hotarea active');
      var x = e.clientX + $('body').scrollLeft() - $('#mainContent').offset().left;
      var y = e.clientY + $('body').scrollTop() - $('#mainContent').offset().top;
      $('#ops').find('.dropdown-header').html($(this).attr('id'));
      $('#ops').css({
          'top': y + 'px',
          'left': x + 'px',
          'display': 'block'
        });
      return false;
    });
  $('body').click(function() {
      $('.hotarea').attr('class', 'hotarea');
      $('#ops').css('display', 'none');
    });
}
