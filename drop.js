(function() {
  var drop;

  drop = angular.module('markdown.drop', []);

  console.log('drop module');

  drop.directive('dropzone', function() {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attrs) {
        var createSlides, startDrag, stopDrag;
        console.log('linking dropzone');
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
            console.log('dropped file', file);
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
        return createSlides = function(markdown) {
          var $article;
          console.log('creating slides');
          element.remove();
          $article = $('body').append($('article'));
          return $article.append('<section>Slide</section');
        };
      }
    };
  });

}).call(this);
