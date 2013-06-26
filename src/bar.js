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
            height: options.height,
            progress: function (percent) {
                if (percent < 0 || percent > 100) {
                    throw new Error('Invalid progress percent ' + percent);
                }
                var w = window.innerWidth;
                var barWidth = w * (percent / 100);
                element.style.width = barWidth + 'px';
            },
            remove: function () {
                document.body.removeChild(this._element);
                bars = bars.filter(function (item) {
                    return item !== this;
                }, this);
            },
            timer: function (durationSeconds) {
                if (durationSeconds < 10) {
                    throw new Error('Invalid duration ' + durationSeconds + ' should be seconds');
                }
                if (this.timer) {
                    clearInterval(this.timer);
                }
                var bar = this;
                bar.started = new Date();
                bar.duration = durationSeconds;
                bar.timer = setInterval(function (value) {
                    var elapsed = new Date() - bar.started;
                    var elapsedSeconds = elapsed / 1000;
                    var elapsedPercent = elapsedSeconds / bar.duration * 100;
                    if (elapsedPercent >= 100) {
                        clearInterval(bar.timer);
                        elapsedPercent = 100;
                    }
                    bar.progress(elapsedPercent);
                }, 1000);
            }
        };
        if (options.progress || options.value) {
            bar.progress(options.progress || options.value);
        }
        if (options.timer || options.duration) {
            bar.timer(options.timer || options.duration);
        }
        bars.push(bar);

        return bar;
    };

    function identity(item) { return item; }

    window.progressFullWidth.remove = function () {
        var items = bars.map(identity);
        items.forEach(function (bar) {
            bar.remove();
        });
    }
}(this));