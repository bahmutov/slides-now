;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var getSlidesNowOptions, isSlideOptionLine, isSlideStart, removeOptionsLines, slidesNowOption;

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

slidesNowOption = /^\[slides-now-([\w-]+)\]\:\s*\"([\w\W]+)\"$/;

isSlideOptionLine = function(line) {
  return slidesNowOption.test(line);
};

getSlidesNowOptions = function(md) {
  var lines, options;
  options = {};
  lines = md.split('\n');
  lines.forEach(function(line) {
    var matches;
    line = line.trim();
    if (isSlideOptionLine(line)) {
      matches = slidesNowOption.exec(line);
      if (matches.length !== 3) {
        throw new Error('Could not match line ' + line);
      }
      return options[matches[1]] = matches[2];
    }
  });
  return options;
};

removeOptionsLines = function(md) {
  var filtered, lines;
  lines = md.split('\n');
  filtered = lines.filter(function(line) {
    line = line.trim();
    if (!isSlideOptionLine(line)) {
      return true;
    }
  });
  return filtered.join('\n');
};

window.mdToPresentation = function(md, filename) {
  var $article, htmlParts, lastSlashAt, mdParts, name, options;
  if (filename) {
    name = filename;
    lastSlashAt = filename.lastIndexOf('/');
    if (lastSlashAt !== -1) {
      name = filename.substr(lastSlashAt);
    }
    $('footer').text(name);
  }
  $('article').remove();
  $article = $('div#dropzone').append('<article>');
  options = getSlidesNowOptions(md);
  if (options.theme != null) {
    $('body').removeClass().addClass(options.theme);
  }
  if (options.footer != null) {
    $('footer').text(options.footer);
  }
  if (options['font-family'] != null) {
    $('body').css('font-family', options['font-family']);
  }
  if (options['font-size'] != null) {
    $('body').css('font-size', options['font-size']);
  }
  md = removeOptionsLines(md);
  mdParts = md.split('\n\r\n\r\n\r');
  htmlParts = mdParts.map(function(mdPart) {
    var trimmed;
    trimmed = mdPart.trim();
    return markdown.toHTML(trimmed);
  });
  htmlParts.forEach(function(html) {
    var currentSlide, lines;
    currentSlide = null;
    lines = html.split('\n');
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
      return $('article').append('<section>\n' + currentSlide + '\n</section>\n');
    }
  });
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


},{}],2:[function(require,module,exports){
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
        $('div.markdown-dropzone').remove();
        return mdToPresentation(md, filename);
      };
    }
  };
});


},{}]},{},[1,2])
;