window.recenterImages = function (recenterOnResize) {
  if (!$) {
    throw new Error('centering images requires jQuery');
  }
  recenterOnResize = !!recenterOnResize;

  function centerImage() {
    $(this).css({
      'display' : 'inline',
      'position' : 'absolute',
      'left' : '50%',
      'top' : '50%',
      'paddingLeft': '0',
      'paddingTop': '0'
    });
    $(this).css('marginLeft', function () {
      return - (+$(this).width()) / 2;
    });
    $(this).css('marginTop', function () {
      return - (+$(this).height()) / 2;
    });
  }

  function _center() {
    $('img').on('load', centerImage);
  }

  _center();
  if (recenterOnResize) {
    $(window).on('resize', _center);
  }
};
