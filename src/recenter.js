// Uses CSS to position elements in the center of its parent
// separately can process .centerHorizontal and .centerVertical
window.recenter = function (recenterOnResize) {
    if (!$) {
        throw new Error('centering items requires jQuery');
    }
    recenterOnResize = !!recenterOnResize;

    function _center() {
        $('.centerHorizontal').css({
            'display' : 'inline',
            'position' : 'absolute',
            'left' : '50%',
            'paddingLeft': '0'
        });
        $('.centerHorizontal').css('marginLeft', - + $('.centerHorizontal').width() / 2);

        $('.centerVertical').css({
            'display' : 'inline',
            'position' : 'absolute',
            'top' : '50%',
            'paddingTop': '0'
        });
        $('.centerVertical').css('marginTop', - + $('.centerVertical').height() / 2);
    }

    _center();
    if (recenterOnResize) {
        $(window).on('resize', _center);
    }
};