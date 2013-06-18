(function() {
  var isSlideStart;

  bespoke.plugins.pageUpDown = function(deck) {
    return document.addEventListener('keydown', function(e) {
      var key;
      key = e.which;
      if (key === 33) {
        deck.prev();
      }
      if (key === 34) {
        return deck.next();
      }
    });
  };

  bespoke.plugins.slideCounter = function(deck) {
    return deck.on('activate', function(e) {
      var message;
      message = (e.index + 1) + ' / ' + deck.slides.length;
      return $('aside#counter').text(message);
    });
  };

  isSlideStart = function(line) {
    var isLevel1Header, isLevel2Header;
    isLevel1Header = /^<h1>/;
    isLevel2Header = /^<h2>/;
    return isLevel1Header.test(line) || isLevel2Header.test(line);
  };

  window.mdToPresentation = function(md, filename) {
    var $article, currentSlide, html, lastSlashAt, lines, name;
    if (filename) {
      name = filename;
      lastSlashAt = filename.lastIndexOf('/');
      if (lastSlashAt !== -1) {
        name = filename.substr(lastSlashAt);
      }
      $('footer').text(name);
    }
    $article = $('body').append('<article>');
    html = markdown.toHTML(md);
    lines = html.split('\n');
    currentSlide = null;
    lines.forEach(function(line) {
      if (isSlideStart(line)) {
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
    return bespoke.horizontal.from('article', {
      vertical: true,
      pageUpDown: true,
      slideCounter: true
    });
  };

  window.tryItNow = function() {
    var md;
    md = $('#explanation')[0].innerHTML;
    $('div.markdown-dropzone').remove();
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
      replace: false,
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
          var file, isMarkdownFilename, reader;
          stopDrag(event);
          if (event.preventDefault) {
            event.preventDefault();
          }
          file = event.dataTransfer.files[0];
          isMarkdownFilename = /\.md$/;
          if (isMarkdownFilename.test(file.name)) {
            reader = new FileReader();
            reader.onload = function(evt) {
              return createSlides(evt.target.result, file.name);
            };
            reader.readAsText(file);
          } else {
            console.error('Only Markdown documents should be droppped');
          }
          return false;
        }, false);
        return createSlides = function(md, filename) {
          element.remove('.markdown-dropzone');
          return mdToPresentation(md, filename);
        };
      }
    };
  });

}).call(this);
