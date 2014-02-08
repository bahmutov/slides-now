window.recenterCodeBlocks = function (recenterOnResize) {
  if (!$) {
    throw new Error('centering code blocks requires jQuery');
  }
  recenterOnResize = !!recenterOnResize;

  function center() {
    $(this).css({
      'display' : 'inline',
      'position' : 'absolute',
      'top' : '50%',
      'paddingTop': '0'
    });
    $(this).css('marginTop', function () {
      return - (+$(this).height()) / 2;
    });
  }

  function _center() {
    $('pre:only-child').each(center);
  }

  _center();
  if (recenterOnResize) {
    $(window).on('resize', _center);
  }
};
