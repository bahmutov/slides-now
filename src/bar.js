// Author: Gleb Bahmutov 2013
(function (window) {
    var bars = [];

    function totalHeight() {
        var sum = 0;
        bars.forEach(function (bar) {
            sum += bar.height;
        });
        return sum;
    }

    window.progressFullWidth = function (opts) {
        options = opts || {};
        options.id = options.id || 'bar';
        options.color = options.color || '#333333';
        options.height = options.height || 5;

        var element = document.createElement('div');
        element.setAttribute('id', options.id);
        var style = element.style;
        style.position = 'absolute';
        style.width = '0';
        style.height = options.height + 'px';
        style.left = '0';
        style.bottom = totalHeight() + 'px';
        style.backgroundColor = options.color;
        element.classList.add('progressFullWidth');
        document.body.appendChild(element);

        var bar = {
            _element: element,
            progress: function (percent) {
                if (percent < 0 || percent > 100) {
                    throw new Error('Invalid progress percent ' + percent);
                }
                var w = window.innerWidth;
                var barWidth = w * (percent / 100);
                element.style.width = barWidth + 'px';
            },
            height: options.height
        };
        bars.push(bar);

        return bar;
    };
}(this));