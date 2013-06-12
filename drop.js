(function() {
  window.mdToPresentation = function(md) {
    var $article, currentSlide, html, lines;
    $article = $('body').append('<article>');
    html = markdown.toHTML(md);
    lines = html.split('\n');
    currentSlide = null;
    lines.forEach(function(line) {
      if (/^<h2>/.test(line)) {
        if (currentSlide) {
          $('article').append('<section>\n' + currentSlide + '\n</section>\n');
          currentSlide = null;
        }
      }
      if (currentSlide) {
        return currentSlide += '\n' + line;
      } else {
        return currentSlide = line;
      }
    });
    if (currentSlide) {
      $('article').append('<section>\n' + currentSlide + '\n</section>\n');
    }
    return bespoke.horizontal.from('article');
  };

  window.tryItNow = function() {
    var md;
    md = $('#explanation')[0].innerHTML;
    $('#dropzone').remove();
    return mdToPresentation(md);
  };

  $('#tryItNow').on('click', tryItNow);

}).call(this);

(function() {
  var drop;

  drop = angular.module('markdown.drop', []);

  drop.directive('dropzone', function() {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attrs) {
        var createSlides, startDrag, stopDrag;
        startDrag = function(event) {
          element.addClass('dragging');
          if (event.preventDefault) {
            event.preventDefault();
          }
          event.dataTransfer.effectAllowed = 'copy';
          return false;
        };
        stopDrag = function(event) {
          element.removeClass('dragging');
          if (event.preventDefault) {
            event.preventDefault();
          }
          return false;
        };
        element.bind('dragenter', startDrag, false);
        element.bind('dragover', startDrag, false);
        element.bind('dragleave', stopDrag, false);
        element.bind('drop', function(event) {
          var file, reader;
          stopDrag(event);
          if (event.preventDefault) {
            event.preventDefault();
          }
          file = event.dataTransfer.files[0];
          if (/\.md$/.test(file.name)) {
            reader = new FileReader();
            reader.onload = function(evt) {
              return createSlides(evt.target.result);
            };
            reader.readAsText(file);
          } else {
            console.error('Only Markdown documents should be droppped');
          }
          return false;
        }, false);
        return createSlides = function(md) {
          element.remove();
          return mdToPresentation(md);
        };
      }
    };
  });

}).call(this);
